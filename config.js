/*
  ==========================================================
  EDIT THIS FILE FIRST
  ==========================================================

  Drop your GLB file into:
      /assets/models/

  Example:
      /assets/models/my-book-character.glb

  Then change MODEL_PATH below to match.

  IMPORTANT:
  The QR code does NOT need to be stored in this project.
  The QR code should contain the PUBLIC URL of this web page
  after you host it, for example:

      https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/

  Optional:
  If you also have a USDZ file for iPhone Quick Look AR,
  place it in /assets/models/ and set IOS_USDZ_PATH.
*/

window.BOOK_AR_CONFIG = {
  CHARACTER_NAME: "Book Character",

  MODEL_PATH: "./assets/models/character.glb",

  // Optional iPhone/iPad AR file. Leave blank if you do not have one.
  IOS_USDZ_PATH: "",

  // Optional preferred animation names.
  // These must exactly match clip names embedded in your GLB.
  PREFERRED_ANIMATIONS: {
    idle: "Idle",
    walk: "Walk"
  },

  DEFAULT_MODE: "idle"
};
