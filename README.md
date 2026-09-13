# QR AR Character Book App

A simple mobile-first web app for an interactive book project.

## What it does

1. A reader scans your QR code.
2. The QR code opens this hosted webpage.
3. The page asks for camera permission and starts scanning for a printed marker image.
4. When the phone camera recognizes that marker image, your GLB character appears on top of it.
5. Any animation clips inside the GLB appear in the Animation menu.

This approach does not require the reader to install a custom app. Camera-based image
tracking is provided by [MindAR](https://hiukim.github.io/mind-ar-js-doc/) + three.js.

---

## 1. Add your GLB character

Copy your `.glb` file into:

```text
assets/models/
```

Example:

```text
assets/models/book-hero.glb
```

Then open `config.js` and change:

```js
MODEL_PATH: "./assets/models/character.glb",
```

to:

```js
MODEL_PATH: "./assets/models/book-hero.glb",
```

---

## 2. Animation clips

Animations should already be embedded inside the GLB.

Common animation names:

```text
Idle
Walk
Run
Wave
Talk
Static
```

The app automatically reads the animation names stored in the GLB and adds them to the dropdown menu.

You can optionally set your preferred names in `config.js`:

```js
PREFERRED_ANIMATIONS: {
  idle: "Idle",
  walk: "Walk"
}
```

Animation names must match the actual clip names inside the GLB.

---

## 3. Set up your AR marker image

The camera looks for one specific image to know where to place your character. That
image must be compiled into a `.mind` file before the app can recognize it.

1. Pick or create the marker image (a book page, cover, or logo works well — high
   contrast and lots of visual detail track better than a flat, symmetric icon).
2. Open the official [MindAR image target compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile/)
   in a browser.
3. Drag in your marker image and download the resulting `targets.mind` file.
4. Copy that file into:

   ```text
   assets/targets/targets.mind
   ```

5. Print the same marker image in the book, or make sure the reader has it on
   another screen, so the camera has something to scan.

If you change the marker image later, you must recompile and replace `targets.mind` —
the app matches against whatever is currently in that file, set via `TARGET_MIND_PATH`
in `config.js`.

---

## 4. Where does the QR code go?

The QR code does NOT need to live inside this project.

The QR code should point to the PUBLIC URL where this website is hosted.

Example GitHub Pages URL:

```text
https://YOUR-USERNAME.github.io/book-ar-character/
```

That URL is what you encode into the QR code printed in the book.

So the flow is:

```text
Printed QR Code
      ↓
Hosted webpage
      ↓
Camera permission + marker scan
      ↓
GLB character overlaid on the marker
```

---

## 5. GitHub Pages deployment

Create a GitHub repository.

Upload everything inside this project so `index.html` is in the repository root.

Your repository should look like this:

```text
book-ar-character/
├── index.html
├── styles.css
├── app.js
├── config.js
└── assets/
    ├── models/
    │   └── your-character.glb
    ├── targets/
    │   └── targets.mind
    └── images/
```

Then:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/root`.
6. Save.
7. GitHub gives you a public Pages URL.
8. Put that Pages URL into your QR code.

---

## 6. Android and iPhone AR

Both platforms use the same in-browser camera AR (no Scene Viewer, Quick Look, or
native app involved) as long as the page is served over HTTPS:

- **Android**: works in Chrome and other Chromium-based browsers.
- **iPhone / iPad**: works in Safari (iOS 13+) and other browsers that support
  `getUserMedia` camera access.

The reader just needs to allow the camera permission prompt and point the phone at
the marker image set up in [step 3](#3-set-up-your-ar-marker-image).

---

## 7. Recommended GLB settings

For phone performance:

- Keep textures around 1K or 2K when possible.
- Compress textures.
- Avoid enormous polygon counts.
- Keep the file under roughly 10–25 MB if possible.
- Use Draco or Meshopt compression if your export pipeline supports it.
- Bake materials and lighting-friendly textures.
- Put Idle, Walk, Wave, Talk, etc. into separate named animation clips.

---

## 8. Testing locally

Because browsers restrict some features when opening HTML directly from disk, use a local web server.

If you have Python installed:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

For phone testing on your Wi-Fi network, use your computer's local IP address.

AR itself should ultimately be tested from an HTTPS-hosted version such as GitHub Pages.

---

## Recommended next-stage book features

Once the basic version works, useful additions are:

- Different QR codes for different chapters.
- Character-specific scenes.
- Voice narration.
- Lip-sync animation.
- Floating text or subtitles.
- Tap hotspots on the character.
- Character facts / lore panel.
- Sound effects.
- Chapter-specific animation triggers.
- Analytics to count scans without storing reader identity.
- A loading poster image for slower connections.

