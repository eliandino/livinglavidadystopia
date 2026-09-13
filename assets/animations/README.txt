Put extra animation-only .glb files here.

These are separate exports that contain ONLY animation clips (no character mesh needed,
though most exporters include one) — useful when you add new motions later without
re-exporting the whole character model.

Requirements:
- The animation file must use the SAME skeleton/bone names as the character GLB in
  assets/models/. This is normally true automatically if both were exported from the
  same rig (e.g. the same Mixamo character, or the same rigged .blend/.fbx file).
- If the bone names don't match, the animation will silently fail to move the model.

After adding a file here, list its path in config.js under ANIMATION_PATHS so the app
loads it and adds its clips to the Animation dropdown.
