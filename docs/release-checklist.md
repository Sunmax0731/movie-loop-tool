# Release Checklist

## Automated Validation

- [x] Unit tests are included in `npm test`.
- [x] Representative scenarios are included in `npm test`.
- [x] ChromeExtension platform runtime gate is included in `npm test`.
- [x] Docs ZIP generation is included in `npm test`.
- [x] Mojibake check is included in `npm test`.
- [x] QCDS guard is included in `npm test`.

## Documentation

- [x] `README.md` explains install, operation, validation, privacy boundary, and docs.
- [x] `AGENTS.md` and `SKILL.md` describe the repo workflow.
- [x] `TODO.md` records discovered work before completion.
- [x] Requirements, specification, architecture, design, manual test, QCDS, and release checklist are present.

## Runtime And Manual Checks

- [x] MV3 manifest is checked by `tools/platform-runtime-gate.mjs`.
- [ ] Chrome extension load is complete outside the Codex sandbox.
- [ ] Chrome UI `Load unpacked` manual check is complete.
- [ ] Real video-page manual check is complete.

## Publication

- [x] GitHub publication attempt is recorded.
- [x] Local git commit attempt is recorded.
- [ ] Local commit is created.
- [ ] GitHub public repository exists.
- [ ] `origin` remote is set.
- [ ] Local branch is pushed.
- [ ] `git status --short --branch` is clean.
