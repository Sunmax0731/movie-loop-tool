# Side Panel 起動時 reset の分離

- 状態: closed
- 優先度: P1
- 種別: task
- 由来: local
- Phase: 04-implementation
- Issue: [Issues/0003-sidepanel-open-resets-replay-counts.md](../Issues/0003-sidepanel-open-resets-replay-counts.md)
- QCDS: Quality, Satisfaction

## 完了条件

- [x] Side Panel 起動処理を `refresh()` に変更し、`saveAndApply()` を呼ばない。
- [x] 設定変更時だけ `MOVIE_LOOP_APPLY_SETTINGS` を送信する。
- [x] 起動時に完了済み回数が維持されることをテストする。

## 検証

- [x] `node tests/run-unit-tests.mjs`
