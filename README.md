# QR AR Character Book App

A simple mobile-first web app for an interactive book project.

## What it does

1. A reader scans your QR code.
2. The QR code opens this hosted webpage.
3. The webpage loads your GLB character.
4. Any animation clips inside the GLB appear in the Animation menu.
5. On supported phones, the reader can tap **View in your space** to launch AR.

This approach does not require the reader to install a custom app.

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

## 3. Where does the QR code go?

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
GLB character
      ↓
3D Viewer / AR
```

---

## 4. GitHub Pages deployment

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

## 5. Android AR

Android phones can usually use the GLB directly through:

```text
Scene Viewer
```

The app is already configured with:

```html
ar-modes="webxr scene-viewer quick-look"
```

---

## 6. iPhone / iPad AR

The normal interactive 3D GLB viewer works in the browser.

For the most reliable native iPhone AR experience, Apple Quick Look typically uses a `.usdz` file.

If you create one, place it here:

```text
assets/models/character.usdz
```

Then set:

```js
IOS_USDZ_PATH: "./assets/models/character.usdz",
```

inside `config.js`.

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

