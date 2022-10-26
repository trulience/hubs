import Store from "./storage/store";
import MediaSearchStore from "./storage/media-search-store";
import qsTruthy from "./utils/qs_truthy";
import chloeMP4 from "./assets/video/chloe_battle.mp4";
import chloeMP42 from "./assets/video/chloe_battle_v2.mp4";
import chloeSYK from "./assets/video/chloe_battle_syk.mp4";
import { getParameterByName } from "./utils/media-url-utils";

import * as ddd from "./MantisRYSK.min.js";

export class App {
  constructor() {
    this.scene = null;
    this.store = new Store();
    this.mediaSearchStore = new MediaSearchStore();
    this.hubChannel = null;
    this.mediaDevicesManager = null;

    // TODO: Remove comments
    // TODO: Rename or reconfigure these as needed
    this.audios = new Map(); //                           el -> (THREE.Audio || THREE.PositionalAudio)
    this.sourceType = new Map(); //                       el -> SourceType
    this.audioOverrides = new Map(); //                   el -> AudioSettings
    this.zoneOverrides = new Map(); //                    el -> AudioSettings
    this.audioDebugPanelOverrides = new Map(); // SourceType -> AudioSettings
    this.sceneAudioDefaults = new Map(); //       SourceType -> AudioSettings
    this.gainMultipliers = new Map(); //                  el -> Number
    this.supplementaryAttenuation = new Map(); //         el -> Number
    this.clippingState = new Set();
    this.mutedState = new Set();
    this.isAudioPaused = new Set();
  }

  // This gets called by a-scene to setup the renderer, camera, and audio listener
  // TODO ideally the contorl flow here would be inverted, and we would setup this stuff,
  // initialize aframe, and then run our own RAF loop
  setupRenderer(sceneEl) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("a-canvas");
    canvas.dataset.aframeCanvas = true;

    // TODO this comes from aframe and prevents zoom on ipad.
    // This should alreeady be handleed by disable-ios-zoom but it does not appear to work
    canvas.addEventListener("touchmove", function (event) {
      event.preventDefault();
    });

    const renderer = new THREE.WebGLRenderer({
      // TODO we should not be using alpha: false https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices#avoid_alphafalse_which_can_be_expensive
      alpha: false,
      antialias: true,
      depth: true,
      stencil: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      logarithmicDepthBuffer: false,
      // TODO we probably want high-performance
      powerPreference: "default",
      canvas
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.debug.checkShaderErrors = qsTruthy("checkShaderErrors");

    // These get overridden by environment-system but setting to the highly expected defaults to avoid any extra work
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;

    sceneEl.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.05, 10000);

    const audioListener = new THREE.AudioListener();
    camera.add(audioListener);

    const renderClock = new THREE.Clock();

    // TODO NAF currently depends on this, it should not
    sceneEl.clock = renderClock;

    let ryskObj = null;

    if (getParameterByName("vvol") !== null) {      
      ryskObj = new Rysk.RYSKUrl(chloeMP4, chloeSYK);
      ryskObj.run().then(mesh => { //add mesh to the scene
        mesh.visible = true;
        mesh.material.toneMapped = false;
        window.ryskmesh = mesh;
        let el = document.createElement("a-entity");
        el.setAttribute("vvol", "true");
        el.object3D = mesh;
        sceneEl.appendChild(el);
        //el.setAttribute('position',  {x: 5, y: 0.85  , z: 2.7 });
        //el.setAttribute('rotation',  {x: 0, y: 60, z: 0});
      });
      ryskObj.play();
      window.ryskObj = ryskObj;
    } else   if (getParameterByName("vvol2") !== null) {      
      ryskObj = new Rysk.RYSKUrl(chloeMP42, chloeSYK);
      ryskObj.run().then(mesh => { //add mesh to the scene
        mesh.visible = true;
        mesh.material.toneMapped = false;
        window.ryskmesh = mesh;
        let el = document.createElement("a-entity");
        el.setAttribute("vvol", "true");
        el.object3D = mesh;
        sceneEl.appendChild(el);
        //el.setAttribute('position',  {x: 5, y: 0.85  , z: 2.7 });
        //el.setAttribute('rotation',  {x: 0, y: 60, z: 0});
      });
      ryskObj.play();
      window.ryskObj = ryskObj;
    }

    // Main RAF loop
    function mainTick(_rafTime, xrFrame) {
      // TODO we should probably be using time from the raf loop itself
      const delta = renderClock.getDelta() * 1000;
      const time = renderClock.elapsedTime * 1000;

      // TODO pass this into systems that care about it (like input) once they are moved into this loop
      sceneEl.frame = xrFrame;

      // Tick AFrame systems and components
      if (sceneEl.isPlaying) {
        sceneEl.tick(time, delta);
      }

      if (ryskObj !== null) {
        ryskObj.update();
      }
      renderer.render(sceneEl.object3D, camera);
    }

    // This gets called after all system and component init functions
    sceneEl.addEventListener("loaded", () => {
      renderer.setAnimationLoop(mainTick);
      sceneEl.renderStarted = true;
    });

    return {
      renderer,
      camera,
      audioListener
    };
  }
}
