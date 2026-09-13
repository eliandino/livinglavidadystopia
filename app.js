const viewer = document.querySelector("#viewer");
const animationSelect = document.querySelector("#animationSelect");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const rotateToggle = document.querySelector("#rotateToggle");
const statusText = document.querySelector("#statusText");
const characterTitle = document.querySelector("#characterTitle");
const infoBtn = document.querySelector("#infoBtn");
const instructions = document.querySelector("#instructions");

const CONFIG = window.BOOK_AR_CONFIG || {};

function setStatus(message) {
  statusText.textContent = message;
}

function applyConfig() {
  characterTitle.textContent = CONFIG.CHARACTER_NAME || "3D Character";

  if (CONFIG.MODEL_PATH) {
    viewer.src = CONFIG.MODEL_PATH;
  }

  if (CONFIG.IOS_USDZ_PATH) {
    viewer.setAttribute("ios-src", CONFIG.IOS_USDZ_PATH);
  }
}

function addAnimationOption(name) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  animationSelect.appendChild(option);
}

function chooseDefaultAnimation(availableAnimations) {
  if (!availableAnimations.length) {
    animationSelect.value = "__STATIC__";
    viewer.pause();
    setStatus("Character loaded. No animation clips were found in this GLB.");
    return;
  }

  const preferred =
    CONFIG.PREFERRED_ANIMATIONS?.[CONFIG.DEFAULT_MODE] ||
    CONFIG.PREFERRED_ANIMATIONS?.idle;

  const preferredMatch = availableAnimations.find(
    name => name.toLowerCase() === String(preferred || "").toLowerCase()
  );

  const selected = preferredMatch || availableAnimations[0];

  animationSelect.value = selected;
  viewer.animationName = selected;
  viewer.play();

  setStatus(
    `Loaded ${availableAnimations.length} animation clip${availableAnimations.length === 1 ? "" : "s"}. Playing: ${selected}`
  );
}

viewer.addEventListener("load", () => {
  // Remove old generated options while preserving Auto and Static.
  [...animationSelect.options]
    .filter(option => !["__AUTO__", "__STATIC__"].includes(option.value))
    .forEach(option => option.remove());

  const animations = viewer.availableAnimations || [];
  animations.forEach(addAnimationOption);
  chooseDefaultAnimation(animations);
});

viewer.addEventListener("error", event => {
  console.error("Model Viewer Error:", event);
  setStatus(
    "Could not load the GLB. Check MODEL_PATH in config.js and confirm the file exists."
  );
});

animationSelect.addEventListener("change", () => {
  const value = animationSelect.value;
  const animations = viewer.availableAnimations || [];

  if (value === "__STATIC__") {
    viewer.pause();
    setStatus("Static pose mode.");
    return;
  }

  if (value === "__AUTO__") {
    if (animations.length) {
      viewer.animationName = animations[0];
      viewer.play();
      setStatus(`Playing first animation: ${animations[0]}`);
    } else {
      viewer.pause();
      setStatus("No animations found. Showing static character.");
    }
    return;
  }

  viewer.animationName = value;
  viewer.play();
  setStatus(`Playing: ${value}`);
});

playBtn.addEventListener("click", () => {
  if ((viewer.availableAnimations || []).length === 0) {
    setStatus("This GLB does not contain animation clips.");
    return;
  }

  if (animationSelect.value === "__STATIC__") {
    animationSelect.value = viewer.availableAnimations[0];
    viewer.animationName = viewer.availableAnimations[0];
  }

  viewer.play();
  setStatus(`Playing: ${viewer.animationName || "animation"}`);
});

pauseBtn.addEventListener("click", () => {
  viewer.pause();
  setStatus("Animation paused.");
});

resetBtn.addEventListener("click", () => {
  viewer.cameraOrbit = "0deg 75deg 2.7m";
  viewer.cameraTarget = "auto auto auto";
  viewer.fieldOfView = "auto";
  setStatus("Camera view reset.");
});

rotateToggle.addEventListener("change", () => {
  viewer.autoRotate = rotateToggle.checked;
});

infoBtn.addEventListener("click", () => {
  instructions.classList.toggle("hidden");
});

viewer.addEventListener("ar-status", event => {
  if (event.detail.status === "failed") {
    setStatus(
      "AR could not start on this device. The normal 3D viewer will still work."
    );
  }
});

applyConfig();
