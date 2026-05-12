# [Bug] Opening the Side Panel resets active replay counts

- Status: closed
- Priority: P1
- Type: bug
- Source: GitHub Issue #3
- Draft source: codex-cli
- Phase: 05-test
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction
- GitHub Issue: [#3](https://github.com/Sunmax0731/movie-loop-tool/issues/3)

## Context

GitHub Issue #3 のローカル TODO / Issue 化。Side Panel 初期化時に `extension/sidepanel/sidepanel.js` が保存済み設定を読み込んだ後で `saveAndApply()` を実行し、content script 側の apply 処理が追跡中のカウントをリセットするため、Side Panel を開くだけで進行中の replay 状態が失われる。Tasks は legacy compatibility として明示設定時だけ作成する。

## Acceptance Criteria

- [x] Side Panel を開いても active page の `loopsCompleted` がリセットされない。
- [x] ON/OFF や replay count を変更した場合は従来どおり即時に適用される。
- [x] 設定が未変更の Side Panel 起動では storage 書き込みや apply によるカウントリセットが発生しない。
- [x] Side Panel 起動時の regression test が追加され、`npm test` が成功する。

## Notes

- Side Panel 起動時は `refresh()` のみ実行し、`saveAndApply()` はユーザー変更時だけ呼ぶ。
- 検証: `side panel startup refreshes status without applying settings`、`npm test`。
