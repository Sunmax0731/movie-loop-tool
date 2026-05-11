# SKILL

Use this repository skill for `D:\AI\ChromeExtension\movie-loop-tool`.

## Start Order

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read `SKILL.md`.
4. Review `TODO.md` and `docs/`.
5. Inspect `extension/manifest.json` before implementation changes.

## Implementation Notes

- Store only `enabled` and `loopCount`.
- Treat `loopCount` as additional replays after the first natural playback.
- Keep loop policy in `src/` and Chrome/DOM wiring in `extension/`.
- On Windows, Chrome can keep the temporary runtime-gate profile locked briefly after exit. Treat cleanup failure as deferred evidence, not as a product validation failure.
- If GitHub publication is blocked by auth or network, record it in TODO/QCDS/final report.

## Validation

```powershell
npm test
```
