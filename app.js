import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const CONFIG = window.BOOK_AR_CONFIG || {};

const animationSelect = document.querySelector("#animationSelect");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const statusText = document.querySelector("#statusText");
const characterTitle = document.querySelector("#characterTitle");
const infoBtn = document.querySelector("#infoBtn");
const instructions = document.querySelector("#instructions");
const scanHint = document.querySelector("#scanHint");
const scanHintText = document.querySelector("#scanHintText");
const arContainer = document.querySelector("#arContainer");

characterTitle.textContent = CONFIG.CHARACTER_NAME || "3D Character";

function setStatus(message) {
  statusText.textContent = message;
}

let mixer = null;
let clips = [];
let currentAction = null;
const clock = new THREE.Clock();

function playClip(name) {
  if (!mixer) return;
  const clip = clips.find(c => c.name === name);
  if (!clip) return;

  if (currentAction) currentAction.stop();
  currentAction = mixer.clipAction(clip);
  currentAction.reset().play();
}

function populateAnimationOptions() {
  [...animationSelect.options]
    .filter(option => !["__AUTO__", "__STATIC__"].includes(option.value))
    .forEach(option => option.remove());

  clips.forEach(clip => {
    const option = document.createElement("option");
    option.value = clip.name;
    option.textContent = clip.name;
    animationSelect.appendChild(option);
  });
}

function chooseDefaultAnimation() {
  if (!clips.length) {
    animationSelect.value = "__STATIC__";
    setStatus("Character loaded. No animation clips were found in this GLB.");
    return;
  }

  const preferred =
    CONFIG.PREFERRED_ANIMATIONS?.[CONFIG.DEFAULT_MODE] ||
    CONFIG.PREFERRED_ANIMATIONS?.idle;

  const preferredMatch = clips.find(
    c => c.name.toLowerCase() === String(preferred || "").toLowerCase()
  );

  const selected = preferredMatch ? preferredMatch.name : clips[0].name;

  animationSelect.value = selected;
  playClip(selected);
  setStatus(
    `Loaded ${clips.length} animation clip${clips.length === 1 ? "" : "s"}. Playing: ${selected}`
  );
}

animationSelect.addEventListener("change", () => {
  const value = animationSelect.value;

  if (value === "__STATIC__") {
    if (currentAction) currentAction.stop();
    setStatus("Static pose mode.");
    return;
  }

  if (value === "__AUTO__") {
    if (clips.length) {
      playClip(clips[0].name);
      setStatus(`Playing first animation: ${clips[0].name}`);
    } else {
      setStatus("No animations found. Showing static character.");
    }
    return;
  }

  playClip(value);
  setStatus(`Playing: ${value}`);
});

playBtn.addEventListener("click", () => {
  if (!clips.length) {
    setStatus("This GLB does not contain animation clips.");
    return;
  }

  let target = animationSelect.value;
  if (target === "__STATIC__" || target === "__AUTO__") {
    target = clips[0].name;
    animationSelect.value = target;
  }

  playClip(target);
  setStatus(`Playing: ${target}`);
});

pauseBtn.addEventListener("click", () => {
  if (currentAction) currentAction.paused = true;
  setStatus("Animation paused.");
});

infoBtn.addEventListener("click", () => {
  instructions.classList.toggle("hidden");
});

async function start() {
  if (!CONFIG.MODEL_PATH) {
    setStatus("MODEL_PATH is not set in config.js.");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus("This browser does not support the camera access needed for AR.");
    scanHintText.textContent = "Camera access is not supported on this browser.";
    return;
  }

  const mindarThree = new MindARThree({
    container: arContainer,
    imageTargetSrc: CONFIG.TARGET_MIND_PATH || "./assets/targets/targets.mind",
  });

  const { renderer, scene, camera } = mindarThree;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.2));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(0.5, 1, 0.3);
  scene.add(dirLight);

  const anchor = mindarThree.addAnchor(0);

  anchor.onTargetFound = () => {
    scanHint.classList.add("hidden");
    setStatus(currentAction ? `Playing: ${currentAction.getClip().name}` : "Marker found.");
  };

  anchor.onTargetLost = () => {
    scanHint.classList.remove("hidden");
    scanHintText.textContent = "Marker lost. Point your camera at it again.";
  };

  const loader = new GLTFLoader();
  loader.load(
    CONFIG.MODEL_PATH,
    gltf => {
      anchor.group.add(gltf.scene);
      clips = gltf.animations || [];

      if (clips.length) {
        mixer = new THREE.AnimationMixer(gltf.scene);
      }

      populateAnimationOptions();
      chooseDefaultAnimation();
    },
    undefined,
    error => {
      console.error("GLTF load error:", error);
      setStatus("Could not load the GLB. Check MODEL_PATH in config.js and confirm the file exists.");
    }
  );

  try {
    await mindarThree.start();
  } catch (err) {
    console.error("MindAR start error:", err);
    setStatus("Camera permission was denied or unavailable. Allow camera access and reload.");
    scanHintText.textContent = "Camera access is needed to scan the AR marker.";
    return;
  }

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
  });
}

start();
