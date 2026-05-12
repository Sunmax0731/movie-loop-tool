# Replay失敗時の完了カウントとエラー表示を修正する

- Status: closed
- Priority: P1
- Type: bug
- Source: GitHub Issue #4
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction
- GitHub Issue: [#4](https://github.com/Sunmax0731/movie-loop-tool/issues/4)

## Context

GitHub Issue #4。`extension/content/video-loop-controller.js` で `video.play()` 成功前に `loopsCompleted` が増えるため、再生再開に失敗しても完了扱いになる。`lastError` は保存されるが Side Panel に表示されず、ユーザーが失敗理由を把握できない。

## Acceptance Criteria

- [x] `video.play()` が reject した再実行は要求されたリプレイ回数を消費しない。
- [x] 再試行または停止の挙動を保ちつつ、無限失敗ループを発生させない。
- [x] Side Panel のステータス領域に `lastError` 由来の簡潔な失敗理由が表示される。
- [x] reject された `play()` の挙動を検証するテストが追加される。
- [x] `npm test` が成功する。

## Notes

- `replayPending` と `play()` 成功後の加算により、reject 時は完了数を消費しない。
- 検証: `failed video.play does not count as a completed replay and reports the reason`、`npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
