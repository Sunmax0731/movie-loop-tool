# 自動テストが content script と Side Panel 連携をカバーしていない

- 状態: closed
- 優先度: P1
- 種別: test
- 由来: ローカル調査
- Phase: 05-test
- 作成日: 2026-05-11
- 完了日: 2026-05-11
- QCDS: Quality
- GitHub Issue: #5
- タスク: [Tasks/0005-runtime-integration-coverage-gap.md](../Tasks/0005-runtime-integration-coverage-gap.md)

## 背景

従来の検証はループポリシー、代表シナリオ、manifest、runtime gate、docs ZIP、mojibake、QCDS を確認していました。一方で、content script の DOM 接続、Chrome message 処理、Side Panel 起動挙動を runtime に近い形では検証していませんでした。

## 完了条件

- [x] Runtime に近いテストハーネスで Chrome API と video element 挙動を stub する。
- [x] `MOVIE_LOOP_APPLY_SETTINGS`、`MOVIE_LOOP_GET_STATUS`、`MOVIE_LOOP_RESET_COUNTS` をテストする。
- [x] Side Panel 起動時に意図しない storage 書き込みや回数 reset が起きないことをテストする。
- [x] reject された `video.play()` の挙動をテストする。
- [x] 統合テストが `npm test` で実行される。

## メモ

- Browser wiring は `extension/` に置き、主要判定ロジックだけを `src/` に置く。
