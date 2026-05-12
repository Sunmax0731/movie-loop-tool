# [Feature] Add A-B range repeat for study and review workflows

- Status: closed
- Priority: P1
- Type: feature
- Source: GitHub Issue #7
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction
- GitHub Issue: [#7](https://github.com/Sunmax0731/movie-loop-tool/issues/7)

## Context

GitHub Issue #7 の内容をローカル TODO / Issue 用に整形する。学習、QA レビュー、音楽練習、クリップ確認で動画の短い区間だけを繰り返せるように、アクティブな対象動画へ任意の A-B 範囲リピートを追加する。範囲状態はプライバシーレビューで明示承認されるまでセッションスコープに留め、ソース、duration、対象動画が変わった場合の挙動も定義する。Tasks は legacy compatibility として明示設定時だけ作成する。

## Acceptance Criteria

- [x] 現在の再生位置から開始点と終了点を設定できる。
- [x] 選択した A-B 区間が対象動画だけでループし、無関係な動画に影響しない。
- [x] 不正な範囲は防止または正規化され、UI 上で分かるフィードバックが出る。
- [x] ソース、duration、対象動画が変わった場合の runtime 設定の扱いが実装または仕様化されている。
- [x] npm test で範囲正規化と終了境界での再再生動作が検証される。

## Notes

- `normalizeSegment` と `timeupdate` 境界処理で A-B repeat を実装した。
- 検証: `tests/loop-policy.test.mjs`、`tests/runtime-messaging.test.mjs`、`npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
