# Movie Loop Tool

`movie-loop-tool` is a Chrome Manifest V3 extension that automatically replays videos on the current page. The side panel lets the user turn looping on or off and choose how many additional replays should run after the first natural playback.

## Features

- ON/OFF control from the Chrome side panel.
- Replay count from `1` to `99`.
- Tracks existing `<video>` elements and videos added later to the current page.
- Stores only `enabled` and `loopCount` in `chrome.storage.sync`.
- Does not store page URLs, video URLs, titles, playback history, or viewed content.

## Install For Local Testing

1. Run `npm test`.
2. Open `chrome://extensions` in Chrome.
3. Enable Developer mode.
4. Select `Load unpacked`.
5. Choose `D:\AI\ChromeExtension\movie-loop-tool\extension`.
6. Open a normal `http://` or `https://` page with a video and open the extension side panel from the toolbar icon.

## Operation

1. Turn `Auto loop` on.
2. Set `Additional replays` to the number of extra plays you want after the first playback.
3. Let the video reach its natural `ended` event.
4. The content script resets the video to the beginning and calls `play()` until the configured replay count is reached.

The extension is intentionally inactive on Chrome internal pages such as `chrome://extensions` because content scripts cannot run there.

## Validation

```powershell
npm test
```

`npm test` runs unit tests, representative scenarios, the Chrome extension runtime gate, docs ZIP generation, mojibake detection, and the QCDS guard.

## Documentation

- `docs/requirements.md`
- `docs/specification.md`
- `docs/architecture.md`
- `docs/design.md`
- `docs/manual-test.md`
- `docs/qcds-evaluation.md`
- `docs/release-checklist.md`
