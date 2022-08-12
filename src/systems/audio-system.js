import { LogMessageType } from "../react-components/room/ChatSidebar";
import { GAIN_TIME_CONST, SourceType } from "../components/audio-params";

let delayedReconnectTimeout = null;
function performDelayedReconnect(context, gainNode) {
  if (delayedReconnectTimeout) {
    clearTimeout(delayedReconnectTimeout);
  }

  delayedReconnectTimeout = setTimeout(() => {
    delayedReconnectTimeout = null;
    console.warn(
      "enableChromeAEC: recreate RTCPeerConnection loopback because the local connection was disconnected for 10s"
    );
    // eslint-disable-next-line no-use-before-define
    enableChromeAEC(context, gainNode);
  }, 10000);
}

import * as sdpTransform from "sdp-transform";
import MediaDevicesManager from "../utils/media-devices-manager";

function isThreeAudio(node) {
  return node instanceof THREE.Audio || node instanceof THREE.PositionalAudio;
}

async function enableChromeAEC(context, gainNode) {
  /**
   *  workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=687574
   *  1. grab the GainNode from the scene's THREE.AudioListener
   *  2. disconnect the GainNode from the AudioDestinationNode (basically the audio out), this prevents hearing the audio twice.
   *  3. create a local webrtc connection between two RTCPeerConnections (see this example: https://webrtc.github.io/samples/src/content/peerconnection/pc1/)
   *  4. create a new MediaStreamDestination from the scene's THREE.AudioContext and connect the GainNode to it.
   *  5. add the MediaStreamDestination's track  to one of those RTCPeerConnections
   *  6. connect the other RTCPeerConnection's stream to a new audio element.
   *  All audio is now routed through Chrome's audio mixers, thus enabling AEC, while preserving all the audio processing that was performed via the WebAudio API.
   */

  const audioEl = new Audio();
  audioEl.setAttribute("autoplay", "autoplay");
  audioEl.setAttribute("playsinline", "playsinline");

  const loopbackDestination = context.createMediaStreamDestination();
  const outboundPeerConnection = new RTCPeerConnection();
  const inboundPeerConnection = new RTCPeerConnection();

  const onError = e => {
    console.error("enableChromeAEC: RTCPeerConnection loopback initialization error", e);
  };

  outboundPeerConnection.addEventListener("icecandidate", e => {
    inboundPeerConnection.addIceCandidate(e.candidate).catch(onError);
  });
  outboundPeerConnection.addEventListener("iceconnectionstatechange", () => {
    console.warn(
      "enableChromeAEC: outboundPeerConnection state changed to " + outboundPeerConnection.iceConnectionState
    );
    if (outboundPeerConnection.iceConnectionState === "disconnected") {
      performDelayedReconnect(context, gainNode);
    }
    if (outboundPeerConnection.iceConnectionState === "connected") {
      if (delayedReconnectTimeout) {
        // The RTCPeerConnection reconnected by itself, cancel recreating the
        // local connection.
        clearTimeout(delayedReconnectTimeout);
      }
    }
  });

  inboundPeerConnection.addEventListener("icecandidate", e => {
    outboundPeerConnection.addIceCandidate(e.candidate).catch(onError);
  });
  inboundPeerConnection.addEventListener("iceconnectionstatechange", () => {
    console.warn("enableChromeAEC: inboundPeerConnection state changed to " + inboundPeerConnection.iceConnectionState);
    if (inboundPeerConnection.iceConnectionState === "disconnected") {
      performDelayedReconnect(context, gainNode);
    }
    if (inboundPeerConnection.iceConnectionState === "connected") {
      if (delayedReconnectTimeout) {
        // The RTCPeerConnection reconnected by itself, cancel recreating the
        // local connection.
        clearTimeout(delayedReconnectTimeout);
      }
    }
  });

  inboundPeerConnection.addEventListener("track", e => {
    audioEl.srcObject = e.streams[0];
  });

  try {
    //The following should never fail, but just in case, we won't disconnect/reconnect the gainNode unless all of this succeeds
    loopbackDestination.stream.getTracks().forEach(track => {
      outboundPeerConnection.addTrack(track, loopbackDestination.stream);
    });

    const offer = await outboundPeerConnection.createOffer();
    outboundPeerConnection.setLocalDescription(offer);
    await inboundPeerConnection.setRemoteDescription(offer);

    const answer = await inboundPeerConnection.createAnswer();

    // Rewrite SDP to be stereo and (variable) max bitrate
    const parsedSdp = sdpTransform.parse(answer.sdp);
    for (let i = 0; i < parsedSdp.media.length; i++) {
      for (let j = 0; j < parsedSdp.media[i].fmtp.length; j++) {
        parsedSdp.media[i].fmtp[j].config += `;stereo=1;cbr=0;maxaveragebitrate=510000;`;
      }
    }
    answer.sdp = sdpTransform.write(parsedSdp);

    inboundPeerConnection.setLocalDescription(answer);
    outboundPeerConnection.setRemoteDescription(answer);

    gainNode.disconnect();
    gainNode.connect(loopbackDestination);
  } catch (e) {
    onError(e);
  }
}

export const AUDIO_CONTEXT_DEFAULTS = {
  "high": {
    sampleRate: 44100,
    latencyHint: "interactive"
  },
  "medium": {
    sampleRate: 22050,
    latencyHint: "balanced"
  },
  "low": {
    sampleRate: 14000,
    latencyHint: "playback"
  }
};

export const AudioType = Object.freeze({
  MEDIA: 0,
  SFX: 1
});

export class AudioSystem {
  constructor(sceneEl) {
    this._sceneEl = sceneEl;

    this.audioContexts = {
      [AudioType.MEDIA]: THREE.AudioContext.getContext(),
      [AudioType.SFX]: new ( window.AudioContext || window.webkitAudioContext )()
    };
    this.analysers = {
      [AudioType.MEDIA]: this.audioContexts[AudioType.MEDIA].createAnalyser(),
      [AudioType.SFX]: this.audioContexts[AudioType.SFX].createAnalyser()
    };
    this.analysers[AudioType.MEDIA].fftSize = 32;
    this.analysers[AudioType.SFX].fftSize = 32;
    this.gains = {
      [AudioType.MEDIA]: this.audioContexts[AudioType.MEDIA].createGain(),
      [AudioType.SFX]: this.audioContexts[AudioType.SFX].createGain()
    };
    this.destinations = {
      [AudioType.MEDIA]: this.audioContexts[AudioType.MEDIA].createMediaStreamDestination(),
      [AudioType.SFX]: this.audioContexts[AudioType.SFX].createMediaStreamDestination()
    }
    this.audioDestinations = {
      [AudioType.MEDIA]: this._sceneEl.audioListener.getInput(),
      [AudioType.SFX]: this.audioContexts[AudioType.SFX].destination
    };
    this.mixers = {
      [SourceType.AVATAR_AUDIO_SOURCE]: this.audioContexts[AudioType.MEDIA].createGain(),
      [SourceType.MEDIA_VIDEO]: this.audioContexts[AudioType.MEDIA].createGain(),
      [SourceType.SFX]: this.audioContexts[AudioType.SFX].createGain()
    };
    this.mixers[SourceType.AVATAR_AUDIO_SOURCE].connect(this.audioDestinations[AudioType.MEDIA]);
    this.mixers[SourceType.MEDIA_VIDEO].connect(this.audioDestinations[AudioType.MEDIA]);
    this.mixers[SourceType.SFX].connect(this.audioDestinations[AudioType.SFX]);
    this.outputMediaAudios = {
      [AudioType.MEDIA]: null,
      [AudioType.SFX]: null
    };
    this.destinations = {
      [AudioType.MEDIA]: this.audioContexts[AudioType.MEDIA].createMediaStreamDestination(),
      [AudioType.SFX]: this.audioContexts[AudioType.SFX].createMediaStreamDestination()
    };

    this.audioNodes = new Map();
    this.mediaStreamDestinationNode = this.audioContexts[AudioType.MEDIA].createMediaStreamDestination(); // Voice, camera, screenshare
    this.outboundStream = this.mediaStreamDestinationNode.stream;
    this.analyserLevels = new Uint8Array(this.analysers[AudioType.MEDIA].fftSize);
    this.gains[AudioType.MEDIA].connect(this.analysers[AudioType.MEDIA]);
    this.analysers[AudioType.MEDIA].connect(this.mediaStreamDestinationNode);

    this.audioContextNeedsToBeResumed = false;

    // Analyser to show the output audio level
    this.mixerAnalyser = this.audioContexts[AudioType.MEDIA].createAnalyser();
    this.mixerAnalyser.fftSize = 32;
    this.mixers[SourceType.AVATAR_AUDIO_SOURCE].connect(this.mixerAnalyser);
    this.mixers[SourceType.MEDIA_VIDEO].connect(this.mixerAnalyser);

    // Webkit Mobile fix
    this._safariMobileAudioInterruptionFix();

    document.body.addEventListener("touchend", this._resumeAudioContext, false);
    document.body.addEventListener("mouseup", this._resumeAudioContext, false);

    this.onPrefsUpdated = this.updatePrefs.bind(this);
    window.APP.store.addEventListener("statechanged", this.onPrefsUpdated);
  }

  addStreamToOutboundAudio(id, mediaStream) {
    if (this.audioNodes.has(id)) {
      this.removeStreamFromOutboundAudio(id);
    }

    const sourceNode = this.audioContexts[AudioType.MEDIA].createMediaStreamSource(mediaStream);
    const gainNode = this.audioContexts[AudioType.MEDIA].createGain();
    sourceNode.connect(gainNode);
    gainNode.connect(this.gains[AudioType.MEDIA]);
    this.audioNodes.set(id, { sourceNode, gainNode });
  }

  removeStreamFromOutboundAudio(id) {
    if (this.audioNodes.has(id)) {
      const nodes = this.audioNodes.get(id);
      nodes.sourceNode.disconnect();
      nodes.gainNode.disconnect();
      this.audioNodes.delete(id);
    }
  }

  addAudio({ sourceType, node }) {
    let outputNode = node;
    if (isThreeAudio(node)) {
      node.gain.disconnect();
      outputNode = node.gain;
    }
    outputNode.connect(this.mixers[sourceType]);
  }

  removeAudio({ node }) {
    if (isThreeAudio(node)) {
      node.gain.disconnect();
    }
    try {
      node.disconnect();
    // eslint-disable-next-line no-empty
    } catch(e) {}
  }

  changeOutput = (audioType, sinkId, isDefault) => {
    if ((!this.outputMediaAudios[audioType] && isDefault) || sinkId === this.outputMediaAudios[audioType]?.sinkId) return;
      const sink = isDefault ? this.audioDestinations[audioType] : this.destinations[audioType];
      if (audioType == AudioType.MEDIA) {
        this.mixers[SourceType.AVATAR_AUDIO_SOURCE].disconnect();
        this.mixers[SourceType.AVATAR_AUDIO_SOURCE].connect(sink);
        this.mixers[SourceType.AVATAR_AUDIO_SOURCE].connect(this.analysers[audioType]);
        this.mixers[SourceType.MEDIA_VIDEO].disconnect();
        this.mixers[SourceType.MEDIA_VIDEO].connect(sink);
        this.mixers[SourceType.MEDIA_VIDEO].connect(this.analysers[audioType]);
      } else {
        this.mixers[SourceType.SFX].disconnect();
        this.mixers[SourceType.SFX].connect(sink);
        this.mixers[SourceType.SFX].connect(this.analysers[audioType]);
      }
      if (isDefault) {
        if (this.outputMediaAudios[audioType]) {
          this.outputMediaAudios[audioType].pause();
          this.outputMediaAudios[audioType].srcObject = null;
          this.outputMediaAudios[audioType] = null;
        }
      } else {
        // Swithing the audio sync is only supported in Chrome at the time of writing this.
        // It also seems to have some limitations and it only works on audio elements. We are piping all our media through the Audio Context
        // and that doesn't seem to work.
        // To workaround that we need to use a MediaStreamAudioDestinationNode that is set as the source of the audio element where we switch the sink.
        // This is very hacky but there don't seem to have any better alternatives at the time of writing this.
        // https://stackoverflow.com/a/67043782
        if (!this.outputMediaAudios[audioType]) {
          this.outputMediaAudios[audioType] = new Audio();
          this.outputMediaAudios[audioType].srcObject = this.destinations[audioType].stream;
        }
        if (this.outputMediaAudios[audioType].sinkId !== sinkId) {
          this.outputMediaAudios[audioType].setSinkId(sinkId).then(() => {
            this.outputMediaAudios[audioType].play();
          });
        }
      }
  }

  updatePrefs() {
    const { globalVoiceVolume, globalMediaVolume, globalSFXVolume } = window.APP.store.state.preferences;
    let newGain = globalMediaVolume / 100;
    this.mixers[SourceType.MEDIA_VIDEO].gain.setTargetAtTime(newGain, this.audioContexts[AudioType.MEDIA].currentTime, GAIN_TIME_CONST);

    newGain = globalSFXVolume / 100;
    this.mixers[SourceType.SFX].gain.setTargetAtTime(newGain, this.audioContexts[AudioType.SFX].currentTime, GAIN_TIME_CONST);

    newGain = globalVoiceVolume / 100;
    this.mixers[SourceType.AVATAR_AUDIO_SOURCE].gain.setTargetAtTime(
      newGain,
      this.audioContexts[AudioType.MEDIA].currentTime,
      GAIN_TIME_CONST
    );

    if (MediaDevicesManager.isAudioOutputSelectEnabled && APP.mediaDevicesManager) {
      const sinkId = APP.mediaDevicesManager.selectedSpeakersDeviceId;
      const isDefault = sinkId === APP.mediaDevicesManager.defaultOutputDeviceId;
      this.changeOutput(AudioType.MEDIA, sinkId, isDefault);
      this.changeOutput(AudioType.SFX, sinkId, isDefault);
    }
  }

  /**
   * Chrome and Safari will start Audio contexts in a "suspended" state.
   * A user interaction (touch/mouse event) is needed in order to resume the AudioContext.
   */
  _resumeAudioContext = () => {
    this.audioContexts[AudioType.MEDIA].resume();

    setTimeout(() => {
      if (this.audioContexts[AudioType.MEDIA].state === "running") {
        const disableAEC = window.APP.store.state.preferences.disableEchoCancellation;
        if (!AFRAME.utils.device.isMobile() && /chrome/i.test(navigator.userAgent) && !disableAEC) {
          enableChromeAEC(this.audioContexts[AudioType.MEDIA], this._sceneEl.audioListener.gain);
        }

        document.body.removeEventListener("touchend", this._resumeAudioContext, false);
        document.body.removeEventListener("mouseup", this._resumeAudioContext, false);
      }
    }, 0);
  };

  // Webkit mobile fix
  // https://stackoverflow.com/questions/10232908/is-there-a-way-to-detect-a-mobile-safari-audio-interruption-headphones-unplugg
  _safariMobileAudioInterruptionFix() {
    this.audioContexts[AudioType.MEDIA].onstatechange = () => {
      console.log(`AudioContext state changed to ${this.audioContexts[AudioType.MEDIA].state}`);
      if (this.audioContexts[AudioType.MEDIA_VIDEO].state === "suspended") {
        // When you unplug the headphone or when the bluetooth headset disconnects on
        // iOS Safari or Chrome, the state changes to suspended.
        // Chrome Android doesn't go in suspended state for this case.
        document.getElementById("avatar-rig").messageDispatch.log(LogMessageType.audioSuspended);
        document.body.addEventListener("touchend", this._resumeAudioContext, false);
        document.body.addEventListener("mouseup", this._resumeAudioContext, false);
        this.audioContextNeedsToBeResumed = true;
      } else if (this.audioContexts[AudioType.MEDIA].state === "running" && this.audioContextNeedsToBeResumed) {
        this.audioContextNeedsToBeResumed = false;
        document.getElementById("avatar-rig").messageDispatch.log(LogMessageType.audioResumed);
      }
    };
    this.audioContexts[AudioType.SFX].onstatechange = () => {
      console.log(`AudioContext state changed to ${this.audioContexts[AudioType.SFX].state}`);
      if (this.audioContexts[AudioType.SFX].state === "suspended") {
        // When you unplug the headphone or when the bluetooth headset disconnects on
        // iOS Safari or Chrome, the state changes to suspended.
        // Chrome Android doesn't go in suspended state for this case.
        document.getElementById("avatar-rig").messageDispatch.log(LogMessageType.audioSuspended);
        document.body.addEventListener("touchend", this._resumeAudioContext, false);
        document.body.addEventListener("mouseup", this._resumeAudioContext, false);
        this.audioContextNeedsToBeResumed = true;
      } else if (this.audioContexts[AudioType.SFX].state === "running" && this.audioContextNeedsToBeResumed) {
        this.audioContextNeedsToBeResumed = false;
        document.getElementById("avatar-rig").messageDispatch.log(LogMessageType.audioResumed);
      }
    };
  }
}
