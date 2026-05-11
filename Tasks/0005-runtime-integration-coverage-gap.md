# runtime 近似テストの追加

- 状態: closed
- 優先度: P1
- 種別: task
- 由来: local
- Phase: 05-validation
- Issue: [Issues/0005-runtime-integration-coverage-gap.md](../Issues/0005-runtime-integration-coverage-gap.md)
- QCDS: Quality

## 完了条件

- [x] 疑似 DOM と疑似 Chrome API で content script を実行する。
- [x] message contract と Side Panel 起動挙動を検証する。
- [x] 複数動画選択、A-B repeat、Shadow DOM 検出を検証する。
- [x] `tests/run-unit-tests.mjs` から実行する。

## 検証

- [x] `node tests/run-unit-tests.mjs`
