# replay 失敗時の count 修正

- 状態: closed
- 優先度: P1
- 種別: task
- 由来: local
- Phase: 04-implementation
- Issue: [Issues/0004-replay-failure-counted-completed.md](../Issues/0004-replay-failure-counted-completed.md)
- QCDS: Quality, Satisfaction

## 完了条件

- [x] `video.play()` 成功後にだけ `loopsCompleted` を加算する。
- [x] reject 時は `lastError` を記録する。
- [x] Side Panel に最後の失敗理由を表示する。
- [x] reject 時に完了回数が増えないことをテストする。

## 検証

- [x] `node tests/run-unit-tests.mjs`
