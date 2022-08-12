import { useRef, useCallback } from "react";

export function useSound({ scene, sound }) {
  const sfxSystem = scene.systems["hubs-systems"].soundEffectsSystem;
  const analyserRef = useRef(scene.systems["hubs-systems"].audioSystem.mixerAnalyser);

  const playSound = useCallback(
    () => {
      const listenerPosition = new THREE.Vector3();
      scene.audioListener.getWorldPosition(listenerPosition);
      sfxSystem.playPositionalSoundAt(sound, listenerPosition).getOutput().connect(analyserRef.current);
    },
    [scene, sound, sfxSystem]
  );

  return { playSound };
}
