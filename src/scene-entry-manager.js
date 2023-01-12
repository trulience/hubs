import qsTruthy from "./utils/qs_truthy";
import nextTick from "./utils/next-tick";
import { hackyMobileSafariTest } from "./utils/detect-touchscreen";
import { SignInMessages } from "./react-components/auth/SignInModal";
import {
  getCurrentHubId
} from "./utils/hub-utils";

const isBotMode = qsTruthy("bot");
const isMobile = AFRAME.utils.device.isMobile();
const forceEnableTouchscreen = hackyMobileSafariTest();
const isMobileVR = AFRAME.utils.device.isMobileVR();
const isDebug = qsTruthy("debug");
const qs = new URLSearchParams(location.search);

import { addMedia } from "./utils/media-utils";
import { getParameterByName, getParameterByNameFloat } from "./utils/media-url-utils";

import {
  isIn2DInterstitial,
  handleExitTo2DInterstitial,
  exit2DInterstitialAndEnterVR,
  forceExitFrom2DInterstitial
} from "./utils/vr-interstitial";
import { ObjectContentOrigins } from "./object-types";
import { getAvatarSrc, getAvatarType } from "./utils/avatar-utils";
import { SOUND_ENTER_SCENE } from "./systems/sound-effects-system";
import { MediaDevices, MediaDevicesEvents } from "./utils/media-devices-utils";

export default class SceneEntryManager {
  constructor(hubChannel, authChannel, history) {
    this.hubChannel = hubChannel;
    this.authChannel = authChannel;
    this.store = window.APP.store;
    this.mediaSearchStore = window.APP.mediaSearchStore;
    this.scene = document.querySelector("a-scene");
    this.rightCursorController = document.getElementById("right-cursor-controller");
    this.leftCursorController = document.getElementById("left-cursor-controller");
    this.avatarRig = document.getElementById("avatar-rig");
    this._entered = false;
    this._musicAvailable = false;
    this._dancerAvailable = false;
    this.performConditionalSignIn = () => { };
    this.history = history;

    this.userPosY = getParameterByNameFloat("userPosY", 1.4);
    this.userScale = getParameterByNameFloat("user_scale", 1.4);

    this.userSeats = new Map([
      ['vdSQjr4', [{ x: 3.5, y: 1.7, z: 7 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7 }]],
      ['N4pPrF4', [{ x: 3.5, y: 1.7, z: 7 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7.6 }]],
      ['ZWf3YyE', [{ x: 3.5, y: 1.7, z: 7 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7 }]],
      ['sSV9Nxx', [{ x: 3.5, y: 1.7, z: 7 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7 }]],
      ['ysG4DS7', [{ x: 4, y: 1.5, z: 1 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7 }]],
      ['4kRy3gG', [{ x: -2.144, y: 1.2, z: -8.2 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7 }]],
      ['blank', [{ x: 3.5, y: 1.7, z: 7 }, { x: 3.5, y: 1.7, z: 7.2 }, { x: 3.5, y: 1.7, z: 7.4 }, { x: 3.5, y: 1.7, z: 7 }]],
      ['default', [{ x: -10, y: this.userPosY, z: 1.7 }, { x: -10, y: this.userPosY, z: 3.0 }, { x: -10, y: this.userPosY, z: 4.3 }, { x: -10, y: this.userPosY, z: 5.6 }]]
    ]);

    this.userRotations = new Map([
      ['vdSQjr4', "lookAt"],
      ['sSV9Nxx', "lookAt"],
      ['ysG4DS7', "lookAt"],
      ['N4pPrF4', "lookAt"],
      ['4kRy3gG', { x: 0, y: 180, z: 0 }],
      ['ZWf3YyE', "lookAt"],
      ['blank', "lookAt"],
      ['default', { x: 0, y: 90, z: 0 }]
    ]);

    this.userScales = new Map([
      ['vdSQjr4', { x: 3, y: 3, z: 3 }],
      ['sSV9Nxx', { x: 3, y: 3, z: 3 }],
      ['ysG4DS7', { x: 4, y: 4, z: 4 }],
      ['4kRy3gG', { x: 2, y: 2, z: 2 }],
      ['N4pPrF4', { x: 3, y: 3, z: 3 }],
      ['ZWf3YyE', { x: 3, y: 3, z: 3 }],
      ['blank', { x: 3, y: 3, z: 3 }],
      ['default', { x: this.userScale, y: this.userScale, z: this.userScale }]
    ]);

    // avatar DH
    this.avatarPositions = new Map([
      ['vdSQjr4', { x: -0.4, y: 6, z: 57.6 }],
      ['N4pPrF4', { x: 12, y: 2.8, z: -2.3 }],
      ['ZWf3YyE', { x: -10, y: 1.4, z: 0.4 }],
      ['blank', { x: -10, y: 1.4, z: 0.4 }],
      ['4kRy3gG', { x: -5.063, y: -3.34, z: -28.623 }],
      ['default', { x: -10, y: 1.4, z: 0.4 }]
    ]);


    this.avatarRotations = new Map([
      ['vdSQjr4', { x: 0, y: 180, z: 0 }],
      ['N4pPrF4', "lookAt"],
      ['4kRy3gG', { x: 0, y: 180, z: 0 }],
      ['blank', "lookAt"],
      ['default', { x: 0, y: 90, z: 0 }]
    ]);

    this.avatarChromakey = new Map([
      ['4kRy3gG', "none"],
      ['default', "red"]
    ]);

    this.avatarScales = new Map([
      ['vdSQjr4', { x: 7.5, y: 7.5, z: 7.5 }],
      ['N4pPrF4', { x: 1.5, y: 1.5, z: 1.5 }],
      ['ZWf3YyE', { x: 3, y: 3, z: 3 }],
      ['4kRy3gG', { x: 6, y: 6, z: 6 }],
      ['blank', { x: 3, y: 3, z: 3 }],
      ['default', { x: 1.4, y: 1.4, z: 1.4 }]
    ]);

    // drummer 
    /*

// drummer
    AFRAME.scenes[0].querySelectorAll("[networked]")[43].setAttribute('position',   {x: 9.9, y: 2.25, z: 0 });
    AFRAME.scenes[0].querySelectorAll("[networked]")[43].setAttribute('scale', {x: 6, y: 6, z: 6 });
    AFRAME.scenes[0].querySelectorAll("[networked]")[43].setAttribute('rotation', {x: 0, y: 260, z: 0});

// GUITAr
    AFRAME.scenes[0].querySelectorAll("[networked]")[44].setAttribute('position', {x: 6.5, y: 2.15, z: 7 });
    AFRAME.scenes[0].querySelectorAll("[networked]")[44].setAttribute('scale', {x: 5, y: 5, z: 5 });
    AFRAME.scenes[0].querySelectorAll("[networked]")[44].setAttribute('rotation',  {x: 0, y: 240, z: 0 });
     */
    // AFRAME.scenes[0].querySelectorAll("[chromakey]")[0].setAttribute("position", {x: 3.5, y: 1.8, z: 7 })

    //  AFRAME.scenes[0].querySelectorAll("[networked]")[44].setAttribute("position", {x: 2, y: 2, z: -1 });
    // AFRAME.scenes[0].querySelectorAll("[networked]")[43].setAttribute("position", {x: 1, y: 1, z: 10 });

    // music screen
    this.musicScale = getParameterByNameFloat("music_scale", 14);
    this.musicPosition = { x: 11, y: 4.7, z: 5 };
    this.musicRotation = { x: 0, y: 60, z: 0 };

    // dancer
    this.dancerScale = getParameterByNameFloat("dancer_scale", 4);
    this.dancerPosition = { x: 5.5, y: 2.15, z: 3 };
    this.dancerRotation = "lookAt"; //x: 0, y: 60, z: 0}; //"lookAt";
  }

  init = () => {
    this.whenSceneLoaded(() => {
      console.log("Scene is loaded so setting up controllers");
      this.rightCursorController.components["cursor-controller"].enabled = false;
      this.leftCursorController.components["cursor-controller"].enabled = false;
      this.mediaDevicesManager = APP.mediaDevicesManager;
      this._setupBlocking();
    });
  };

  getSeatPositions = () => {
    if (this.userSeats.get(getCurrentHubId())) {
      return this.userSeats.get(getCurrentHubId());
    } else {
      return this.userSeats.get("default");
    }
  };

  getScale = () => {
    if (this.userScales.get(getCurrentHubId())) {
      return this.userScales.get(getCurrentHubId());
    } else {
      return this.userScales.get("default");
    }
  }
  getRotation = () => {
    if (this.userRotations.get(getCurrentHubId())) {
      return this.userRotations.get(getCurrentHubId());
    } else {
      return this.userRotations.get("default");
    }
  };


  getAvatarPosition = () => {
    if (this.avatarPositions.get(getCurrentHubId())) {
      return this.avatarPositions.get(getCurrentHubId());
    } else {
      return this.avatarPositions.get("default");
    }
  };

  getAvatarChromakey = () => {
    if (this.avatarChromakey.get(getCurrentHubId())) {
      return this.avatarChromakey.get(getCurrentHubId());
    } else {
      return this.avatarChromakey.get("default");
    }
  };



  getAvatarScale = () => {
    if (this.avatarScales.get(getCurrentHubId())) {
      return this.avatarScales.get(getCurrentHubId());
    } else {
      return this.avatarScales.get("default");
    }
  }
  getAvatarRotation = () => {
    if (this.avatarRotations.get(getCurrentHubId())) {
      return this.avatarRotations.get(getCurrentHubId());
    } else {
      return this.avatarRotations.get("default");
    }
  };


  hasEntered = () => {
    return this._entered;
  };

  enterScene = async (enterInVR, muteOnEntry) => {
    console.log("Entering scene...");


    // if avatarid in url
    if (getParameterByName("tru_avatar_id") !== null) {
      window.APP.loadTruAvatar();
    }



    document.getElementById("viewing-camera").removeAttribute("scene-preview-camera");

    if (isDebug && NAF.connection.adapter.session) {
      NAF.connection.adapter.session.options.verbose = true;
    }

    if (enterInVR) {
      // This specific scene state var is used to check if the user went through the
      // entry flow and chose VR entry, and is used to preempt VR mode on refreshes.
      this.scene.addState("vr-entered");

      // HACK - A-Frame calls getVRDisplays at module load, we want to do it here to
      // force gamepads to become live.
      "getVRDisplays" in navigator && navigator.getVRDisplays();

      await exit2DInterstitialAndEnterVR(true);
    }

    const waypointSystem = this.scene.systems["hubs-systems"].waypointSystem;
    waypointSystem.moveToSpawnPoint();

    if (isMobile || forceEnableTouchscreen || qsTruthy("force_enable_touchscreen")) {
      this.avatarRig.setAttribute("virtual-gamepad-controls", {});
    }

    this._setupPlayerRig();
    this._setupKicking();
    this._setupMedia();
    this._setupCamera();

    if (qsTruthy("offline")) return;

    this._spawnAvatar();

    this.scene.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(SOUND_ENTER_SCENE);

    if (isBotMode) {
      this._runBot();
      this.scene.addState("entered");
      this.hubChannel.sendEnteredEvent();
      return;
    }

    this.scene.classList.remove("hand-cursor");
    this.scene.classList.add("no-cursor");

    this.rightCursorController.components["cursor-controller"].enabled = true;
    this.leftCursorController.components["cursor-controller"].enabled = true;
    this._entered = true;


    // Delay sending entry event telemetry until VR display is presenting.
    (async () => {
      while (enterInVR && !this.scene.renderer.xr.isPresenting) {
        await nextTick();
      }

      this.hubChannel.sendEnteredEvent().then(() => {
        this.store.update({ activity: { lastEnteredAt: new Date().toISOString() } });
      });
    })();

    // Bump stored entry count after 30s
    setTimeout(() => this.store.bumpEntryCount(), 30000);

    this.scene.addState("entered");

    APP.mediaDevicesManager.micEnabled = !muteOnEntry;


    if (this._musicAvailable || APP.dialog._load_music) {
      window.APP.entryManager.scene.emit("load_music");
    }

    if (this._dancerAvailable || APP.dialog._load_dancer) {
      window.APP.entryManager.scene.emit("load_dancer");
    }

  };

  whenSceneLoaded = callback => {
    if (this.scene.hasLoaded) {
      console.log("Scene already loaded so callback invoked directly");
      callback();
    } else {
      console.log("Scene not yet loaded so callback is deferred");
      this.scene.addEventListener("loaded", callback);
    }
  };

  enterSceneWhenLoaded = (enterInVR, muteOnEntry) => {
    this.whenSceneLoaded(() => this.enterScene(enterInVR, muteOnEntry));
  };

  exitScene = () => {
    this.scene.exitVR();
    if (APP.dialog && APP.dialog.localMediaStream) {
      APP.dialog.localMediaStream.getTracks().forEach(t => t.stop());
    }
    if (this.hubChannel) {
      this.hubChannel.disconnect();
    }
    if (this.scene.renderer) {
      this.scene.renderer.setAnimationLoop(null); // Stop animation loop, TODO A-Frame should do this
    }
    this.scene.parentNode.removeChild(this.scene);
  };

  _setupPlayerRig = () => {
    this._setPlayerInfoFromProfile();

    // Explict user action changed avatar or updated existing avatar.
    this.scene.addEventListener("avatar_updated", () => this._setPlayerInfoFromProfile(true));

    // Store updates can occur to avatar id in cases like error, auth reset, etc.
    this.store.addEventListener("statechanged", () => this._setPlayerInfoFromProfile());

    const avatarScale = parseInt(qs.get("avatar_scale"), 10);
    if (avatarScale) {
      this.avatarRig.setAttribute("scale", { x: avatarScale, y: avatarScale, z: avatarScale });
    }
  };

  _setPlayerInfoFromProfile = async (force = false) => {
    const avatarId = this.store.state.profile.avatarId;
    if (!force && this._lastFetchedAvatarId === avatarId) return; // Avoid continually refetching based upon state changing

    this._lastFetchedAvatarId = avatarId;
    const avatarSrc = await getAvatarSrc(avatarId);

    this.avatarRig.setAttribute("player-info", { avatarSrc, avatarType: getAvatarType(avatarId) });
  };

  _setupKicking = () => {
    // This event is only received by the kicker
    document.body.addEventListener("kicked", ({ detail }) => {
      const { clientId: kickedClientId } = detail;
      const { entities } = NAF.connection.entities;
      for (const id in entities) {
        const entity = entities[id];
        if (NAF.utils.getCreator(entity) !== kickedClientId) continue;

        if (entity.components.networked.data.persistent) {
          NAF.utils.takeOwnership(entity);
          window.APP.pinningHelper.unpinElement(entity);
          entity.parentNode.removeChild(entity);
        } else {
          NAF.entities.removeEntity(id);
        }
      }
    });
  };

  _setupBlocking = () => {
    document.body.addEventListener("blocked", ev => {
      NAF.connection.entities.removeEntitiesOfClient(ev.detail.clientId);
    });

    document.body.addEventListener("unblocked", ev => {
      NAF.connection.entities.completeSync(ev.detail.clientId, true);
    });
  };

  _setupMedia = () => {
    const offset = { x: 0, y: 0, z: -1.5 };

    const spawnMediaInfrontOfPlayer = (src, contentOrigin, isCam) => {
      if (!this.hubChannel.can("spawn_and_move_media")) return;
      const { entity, orientation } = addMedia(
        src,
        getParameterByName("seat") !== null && isCam ? "#non-interactable-chromakey-media" : "#interactable-media",
        contentOrigin,
        null,
        !(src instanceof MediaStream),
        true
      );

      // BEBUG
      //  entity.setAttribute("lookat",true);
      if (getParameterByName("seat") === null || !isCam) {
        orientation.then(or => {
          entity.setAttribute("offset-relative-to", {
            target: "#avatar-pov-node",
            offset,
            orientation: or
          });
        });
      }
      return entity;
    };

    this.scene.addEventListener("add_media", e => {
      const contentOrigin = e.detail instanceof File ? ObjectContentOrigins.FILE : ObjectContentOrigins.URL;
      spawnMediaInfrontOfPlayer(e.detail, contentOrigin);
    });

    this.scene.addEventListener("object_spawned", e => {
      this.hubChannel.sendObjectSpawnedEvent(e.detail.objectType);
    });

    this.scene.addEventListener("action_spawn", () => {
      handleExitTo2DInterstitial(false, () => window.APP.mediaSearchStore.pushExitMediaBrowserHistory());
      window.APP.mediaSearchStore.sourceNavigateToDefaultSource();
    });

    this.scene.addEventListener("action_kick_client", ({ detail: { clientId } }) => {
      this.performConditionalSignIn(
        () => this.hubChannel.can("kick_users"),
        async () => await window.APP.hubChannel.kick(clientId),
        SignInMessages.kickUser
      );
    });

    this.scene.addEventListener("action_mute_client", ({ detail: { clientId } }) => {
      this.performConditionalSignIn(
        () => this.hubChannel.can("mute_users"),
        () => window.APP.hubChannel.mute(clientId),
        SignInMessages.muteUser
      );
    });

    this.scene.addEventListener("action_vr_notice_closed", () => forceExitFrom2DInterstitial());

    document.addEventListener("paste", e => {
      if (
        (e.target.matches("input, textarea") || e.target.contentEditable === "true") &&
        document.activeElement === e.target
      )
        return;

      // Never paste into scene if dialog is open
      const uiRoot = document.querySelector(".ui-root");
      if (uiRoot && uiRoot.classList.contains("in-modal-or-overlay")) return;

      const url = e.clipboardData.getData("text");
      const files = e.clipboardData.files && e.clipboardData.files;
      if (url) {
        spawnMediaInfrontOfPlayer(url, ObjectContentOrigins.URL);
      } else {
        for (const file of files) {
          spawnMediaInfrontOfPlayer(file, ObjectContentOrigins.CLIPBOARD);
        }
      }
    });

    document.addEventListener("dragover", e => e.preventDefault());

    let lastDebugScene;
    document.addEventListener("drop", e => {
      e.preventDefault();

      if (qsTruthy("debugLocalScene")) {
        URL.revokeObjectURL(lastDebugScene);
        const url = URL.createObjectURL(e.dataTransfer.files[0]);
        this.hubChannel.updateScene(url);
        lastDebugScene = url;
        return;
      }

      let url = e.dataTransfer.getData("url");

      if (!url) {
        // Sometimes dataTransfer text contains a valid URL, so try for that.
        try {
          url = new URL(e.dataTransfer.getData("text")).href;
        } catch (e) {
          // Nope, not this time.
        }
      }

      const files = e.dataTransfer.files;

      if (url) {
        spawnMediaInfrontOfPlayer(url, ObjectContentOrigins.URL);
      } else {
        for (const file of files) {
          spawnMediaInfrontOfPlayer(file, ObjectContentOrigins.FILE);
        }
      }
    });

    let currentVideoShareEntity;
    let isHandlingVideoShare = false;

    const shareSuccess = (isDisplayMedia, isVideoTrackAdded, target) => {
      isHandlingVideoShare = false;

      if (isVideoTrackAdded) {
        if (target === "avatar") {
          this.avatarRig.setAttribute("player-info", { isSharingAvatarCamera: true });
        } else {
          currentVideoShareEntity = spawnMediaInfrontOfPlayer(this.mediaDevicesManager.mediaStream, undefined, !isDisplayMedia);
          // Wire up custom removal event which will stop the stream.
          currentVideoShareEntity.setAttribute(
            "emit-scene-event-on-remove",
            `event:${MediaDevicesEvents.VIDEO_SHARE_ENDED}`
          );
          // BEBUG
          // if param for seat then move to that position
          // set chromakey

          //alert(getCurrentHubId());
          if (!isDisplayMedia) {
            if (getParameterByName("seat") !== null) {
              let seat = parseInt(getParameterByName("seat"));
              currentVideoShareEntity.setAttribute("position", this.getSeatPositions()[seat - 1]);
              if (this.getRotation() !== 'lookAt') {
                currentVideoShareEntity.setAttribute("rotation", this.getRotation());
              }
              currentVideoShareEntity.setAttribute("scale", this.getScale());
            }
          }

        }

        this.scene.emit("share_video_enabled", { source: isDisplayMedia ? MediaDevices.SCREEN : MediaDevices.CAMERA });
        this.scene.addState("sharing_video");
      }
    };

    const shareError = error => {
      console.error(error);
      isHandlingVideoShare = false;
      this.scene.emit("share_video_failed");
    };


    let volvt = true;

    this.scene.addEventListener("toggle_volv", e => {
      setInterval(
        function togg() {
          if (volvt) {
            volvt = false;
            AFRAME.scenes[0].querySelectorAll("[vvol]")[0].setAttribute('position', { x: 5.5, y: 0.45, z: 0.7 });
            AFRAME.scenes[0].querySelectorAll("[vvol]")[0].setAttribute('rotation', { x: 0, y: 60, z: 0 });
          } else {
            volvt = true;
            AFRAME.scenes[0].querySelectorAll("[vvol]")[0].setAttribute('position', { x: 3, y: 0, z: -1 });
            AFRAME.scenes[0].querySelectorAll("[vvol]")[0].setAttribute('rotation', { x: 0, y: 60, z: 0 });
          }
        }
        , 10000);
    });



    this.scene.addEventListener("load_avatar", e => {
      if (!this.hubChannel.can("spawn_and_move_media")) return;
      const { entity, orientation } = addMedia(
        "load_avatar",
        "#static-media4",
        null,
        null,
        false,
        true
      );

      if (this.getAvatarChromakey() !== 'none') {
        entity.setAttribute("chromakey", this.getAvatarChromakey());
      }

      entity.setAttribute("position", this.getAvatarPosition());
      if (this.getAvatarRotation() !== 'lookAt') {
        entity.setAttribute("rotation", this.getAvatarRotation());
      }
      entity.setAttribute("scale", this.getAvatarScale());
    });

    this.scene.addEventListener("load_music_start", e => {
      if (this._entered) {
        window.APP.entryManager.scene.emit("load_music");
      } else {
        this._musicAvailable = true;
      }
    });

    this.scene.addEventListener("load_music_stop", e => {
      this._musicAvailable = false;
      if (AFRAME.scenes[0].querySelectorAll("[liveMusic]").length > 0) {
        AFRAME.scenes[0].querySelectorAll("[liveMusic]")[0].remove();
      }
    });

    this.scene.addEventListener("load_music", e => {
      if (AFRAME.scenes[0].querySelectorAll("[liveMusic]").length > 0) {
        AFRAME.scenes[0].querySelectorAll("[liveMusic]")[0].remove();
      }
      if (!this.hubChannel.can("spawn_and_move_media")) return;
      const { entity, orientation } = addMedia(
        "load_music",
        "#static-media5",
        null,
        null,
        false,
        true
      );

      entity.setAttribute("position", this.musicPosition);
      entity.setAttribute("rotation", this.musicRotation);
      entity.setAttribute("scale", { x: this.musicScale, y: this.musicScale, z: this.musicScale });
    });

    this.scene.addEventListener("load_dancer_start", e => {
      if (this._entered) {
        window.APP.entryManager.scene.emit("load_dancer");
      } else {
        this._dancerAvailable = true;
      }
    });

    this.scene.addEventListener("load_dancer_stop", e => {
      this._dancerAvailable = false;
      if (AFRAME.scenes[0].querySelectorAll("[liveDancer]").length > 0) {
        AFRAME.scenes[0].querySelectorAll("[liveDancer]")[0].remove();
      }
    });

    this.scene.addEventListener("load_dancer", e => {
      if (AFRAME.scenes[0].querySelectorAll("[liveDancer]").length > 0) {
        AFRAME.scenes[0].querySelectorAll("[liveDancer]")[0].remove();
      }
      if (!this.hubChannel.can("spawn_and_move_media")) return;
      const { entity, orientation } = addMedia(
        "load_dancer",
        "#static-media6",
        null,
        null,
        false,
        true
      );
      entity.setAttribute("chromakey", "green");
      entity.setAttribute("position", this.dancerPosition);
      if (this.dancerRotation !== 'lookAt') {
        entity.setAttribute("rotation", this.dancerRotation);
      }
      entity.setAttribute("scale", { x: this.dancerScale, y: this.dancerScale, z: this.dancerScale });
    });


    this.scene.addEventListener("action_share_camera", event => {
      if (isHandlingVideoShare) return;
      isHandlingVideoShare = true;
      this.mediaDevicesManager.startVideoShare({
        isDisplayMedia: false,
        target: event.detail?.target,
        success: shareSuccess,
        error: shareError
      });

    });

    this.scene.addEventListener("action_share_screen", () => {
      if (isHandlingVideoShare) return;
      isHandlingVideoShare = true;
      this.mediaDevicesManager.startVideoShare({
        isDisplayMedia: true,
        target: null,
        success: shareSuccess,
        error: shareError
      });
    });

    this.scene.addEventListener(MediaDevicesEvents.VIDEO_SHARE_ENDED, async () => {
      if (isHandlingVideoShare) return;
      isHandlingVideoShare = true;

      if (currentVideoShareEntity && currentVideoShareEntity.parentNode) {
        NAF.utils.takeOwnership(currentVideoShareEntity);
        currentVideoShareEntity.parentNode.removeChild(currentVideoShareEntity);
      }

      await this.mediaDevicesManager.stopVideoShare();
      currentVideoShareEntity = null;

      this.avatarRig.setAttribute("player-info", { isSharingAvatarCamera: false });
      this.scene.emit("share_video_disabled");
      this.scene.removeState("sharing_video");
      isHandlingVideoShare = false;
    });

    this.scene.addEventListener(MediaDevicesEvents.MIC_SHARE_ENDED, async () => {
      await this.mediaDevicesManager.stopMicShare();
    });

    this.scene.addEventListener("action_selected_media_result_entry", async e => {
      // TODO spawn in space when no rights
      const { entry, selectAction } = e.detail;
      if (selectAction !== "spawn") return;

      const delaySpawn = isIn2DInterstitial() && !isMobileVR;
      await exit2DInterstitialAndEnterVR();

      // If user has HMD lifted up or gone through interstitial, delay spawning for now. eventually show a modal
      if (delaySpawn) {
        setTimeout(() => {
          spawnMediaInfrontOfPlayer(entry.url, ObjectContentOrigins.URL);
        }, 3000);
      } else {
        spawnMediaInfrontOfPlayer(entry.url, ObjectContentOrigins.URL);
      }
    });

    this.mediaSearchStore.addEventListener("media-exit", () => {
      exit2DInterstitialAndEnterVR();
    });
  };

  _setupCamera = () => {
    this.scene.addEventListener("action_toggle_camera", () => {
      if (!this.hubChannel.can("spawn_camera")) return;
      const myCamera = this.scene.systems["camera-tools"].getMyCamera();

      if (myCamera) {
        myCamera.parentNode.removeChild(myCamera);
      } else {
        const entity = document.createElement("a-entity");
        entity.setAttribute("networked", { template: "#interactable-camera" });
        entity.setAttribute("offset-relative-to", {
          target: "#avatar-pov-node",
          offset: { x: 0, y: 0, z: -1.5 }
        });
        this.scene.appendChild(entity);
      }
    });

    this.scene.addEventListener("photo_taken", e => this.hubChannel.sendMessage({ src: e.detail }, "photo"));
    this.scene.addEventListener("video_taken", e => this.hubChannel.sendMessage({ src: e.detail }, "video"));
  };

  _spawnAvatar = () => {
    this.avatarRig.setAttribute("networked", "template: #remote-avatar; attachTemplateToLocal: false;");
    this.avatarRig.setAttribute("networked-avatar", "");
    this.avatarRig.emit("entered");
  };

  _runBot = async () => {
    const audioEl = document.createElement("audio");
    let audioInput;
    let dataInput;

    // Wait for startup to render form
    do {
      audioInput = document.querySelector("#bot-audio-input");
      dataInput = document.querySelector("#bot-data-input");
      await nextTick();
    } while (!audioInput || !dataInput);

    const getAudio = () => {
      audioEl.loop = true;
      audioEl.muted = false;
      audioEl.crossorigin = "anonymous";
      audioEl.src = URL.createObjectURL(audioInput.files[0]);
      document.body.appendChild(audioEl);
    };

    if (audioInput.files && audioInput.files.length > 0) {
      getAudio();
    } else {
      audioInput.onchange = getAudio;
    }

    const camera = document.querySelector("#avatar-pov-node");
    const leftController = document.querySelector("#player-left-controller");
    const rightController = document.querySelector("#player-right-controller");
    const getRecording = () => {
      fetch(URL.createObjectURL(dataInput.files[0]))
        .then(resp => resp.json())
        .then(recording => {
          camera.setAttribute("replay", "");
          camera.components["replay"].poses = recording.camera.poses;

          leftController.setAttribute("replay", "");
          leftController.components["replay"].poses = recording.left.poses;
          leftController.removeAttribute("visibility-by-path");
          leftController.removeAttribute("track-pose");
          leftController.setAttribute("visible", true);

          rightController.setAttribute("replay", "");
          rightController.components["replay"].poses = recording.right.poses;
          rightController.removeAttribute("visibility-by-path");
          rightController.removeAttribute("track-pose");
          rightController.setAttribute("visible", true);
        });
    };

    if (dataInput.files && dataInput.files.length > 0) {
      getRecording();
    } else {
      dataInput.onchange = getRecording;
    }

    await new Promise(resolve => audioEl.addEventListener("canplay", resolve));

    const audioStream = audioEl.captureStream
      ? audioEl.captureStream()
      : audioEl.mozCaptureStream
        ? audioEl.mozCaptureStream()
        : null;

    if (audioStream) {
      let audioVolume = Number(qs.get("audio_volume") || "1.0");
      if (isNaN(audioVolume)) {
        audioVolume = 1.0;
      }
      const audioContext = THREE.AudioContext.getContext();
      const audioSource = audioContext.createMediaStreamSource(audioStream);
      const audioDestination = audioContext.createMediaStreamDestination();
      const gainNode = audioContext.createGain();
      audioSource.connect(gainNode);
      gainNode.connect(audioDestination);
      gainNode.gain.value = audioVolume;
      this.mediaDevicesManager.mediaStream.addTrack(audioDestination.stream.getAudioTracks()[0]);
    }

    const connect = async () => {
      await APP.dialog.setLocalMediaStream(this.mediaDevicesManager.mediaStream);
      audioEl.play();
    };
    if (APP.dialog._sendTransport) {
      connect();
    } else {
      this.scene.addEventListener("didConnectToDialog", connect);
    }
  };
}
