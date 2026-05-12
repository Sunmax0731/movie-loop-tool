# [Feature] Add loop modes for infinite loop and stop-after-current

- Status: closed
- Priority: P1
- Type: feature
- Source: GitHub Issue #8
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Delivery, Satisfaction
- GitHub Issue: [#8](https://github.com/Sunmax0731/movie-loop-tool/issues/8)

## Context

GitHub Issue #8 のローカル TODO / Issue 用下書き。現状は `1..99` 回の追加再生のみ対応しているため、固定回数、無限ループ、現在の再生完了後に停止するモードを明示的に扱えるようにする。固定回数モードでは既存の `loopCount` の意味を維持し、永続保存はプライバシー境界を守って慎重に更新する。legacy Task は明示設定時だけ同内容で作成する。

## Acceptance Criteria

- [x] 既存ユーザーの `enabled` と `loopCount` だけの設定が安全に移行される。
- [x] 固定回数モードでは既存の `loopCount` セマンティクスが変わらない。
- [x] 無限ループ中でも Side Panel から停止でき、操作不能にならない。
- [x] `stop after current` モードで現在の再生完了後に停止できる。
- [x] `npm test` でモード遷移、代表シナリオ、関連ドキュメント/QCDS 証跡の更新が確認できる。

## Notes

- `src/loop-policy.mjs`、content script、Side Panel、代表シナリオで `count` / `infinite` / `stop-current` を確認した。
- 検証: `npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
