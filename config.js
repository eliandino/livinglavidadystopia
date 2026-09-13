/*
  ==========================================================
  EDIT THIS FILE FIRST
  ==========================================================

  Drop your GLB file into:
      /assets/models/

  Example:
      /assets/models/my-book-character.glb

  Then change MODEL_PATH below to match.

  This app uses image-tracking AR: it opens the phone camera and
  overlays the GLB on top of the marker image referenced by
  TARGET_MIND_PATH. That .mind file is a compiled version of your
  marker image — see README.md for how to (re)generate it.

  IMPORTANT:
  The QR code does NOT need to be stored in this project.
  The QR code should contain the PUBLIC URL of this web page
  after you host it, for example:

      https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
*/

window.BOOK_AR_CONFIG = {
  CHARACTER_NAME: "Book Character",

  MODEL_PATH: "./assets/models/Enrique-figure-3d-model-fbx.fbx.glb",

  // Compiled image target for AR marker scanning.
  TARGET_MIND_PATH: "./assets/targets/targets.mind",

  // Optional extra animation-only .glb files (see assets/animations/README.txt).
  // Their clips are merged into the Animation dropdown alongside any animations
  // already embedded in MODEL_PATH. They must share the same skeleton/bone names
  // as the character in MODEL_PATH.
  ANIMATION_PATHS: [
    // "./assets/animations/wave.glb",
  ],

  // Optional preferred animation names.
  // These must exactly match clip names embedded in your GLB.
  PREFERRED_ANIMATIONS: {
    idle: "Idle",
    walk: "Walk"
  },

  DEFAULT_MODE: "idle"
};
