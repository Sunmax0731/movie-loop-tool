# Runtime-like integration coverage for content script and Side Panel messaging

- Status: closed
- Priority: P2
- Type: test
- Source: GitHub Issue #5
- Draft source: codex-cli
- Phase: 05-test
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Cost
- GitHub Issue: [#5](https://github.com/Sunmax0731/movie-loop-tool/issues/5)

## Context

現在の自動テストは pure policy、代表シナリオ、manifest、runtime gate、docs ZIP、mojibake、QCDS を検証しているが、content script の DOM 動作、Chrome メッセージ処理、Side Panel 起動フローを実行時に近い形で検証できていない。Chrome API と video 要素を fake した integration-style test を追加し、主要判定ロジックは src/ に保ち、extension/ 側の Chrome 接続を過度に膨らませない。

## Acceptance Criteria

- [x] fake Chrome API と video 要素を使った integration-style test が追加されている
- [x] ended 処理、設定適用、reset、status、source change、Side Panel 初期化がテストされている
- [x] Side Panel reset と rejected play() の不具合に対して、修正前に失敗する regression test になっている
- [x] 追加テストが npm test の一部として実行される
- [x] 追加の broad permissions が導入されていない

## Notes

- `tests/runtime-messaging.test.mjs` で content script と Side Panel の runtime 近似テストを追加した。
- manifest permission は `activeTab`、`storage`、`sidePanel` のまま維持した。
- 検証: `npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
