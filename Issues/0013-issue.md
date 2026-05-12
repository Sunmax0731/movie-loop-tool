# クイック操作とキーボードショートカットを追加する

- Status: closed
- Priority: P2
- Type: feature
- Source: GitHub Issue #10
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction
- GitHub Issue: [#10](https://github.com/Sunmax0731/movie-loop-tool/issues/10)

## Context

GitHub Issue #10 の内容をローカルの TODO / Issue 用に整形する。ユーザーが Side Panel を毎回開かずに、Chrome UI またはキーボードからループの有効化や現在のループモード調整を素早く行えるようにする。toolbar action、context menu、Chrome commands shortcuts を評価し、Side Panel は詳細設定画面として維持する。Tasks は legacy compatibility として明示設定時だけ作成する。

## Acceptance Criteria

- [x] Chrome UI またはキーボードからループ状態を素早く切り替えられる。
- [x] クイック操作による変更後も Side Panel の表示と状態が一致する。
- [x] 選定した command model に合わせて README などのドキュメントとテストが更新されている。
- [x] manifest の permission 変更がある場合は理由が説明されている。
- [x] npm test が成功する。

## Notes

- Toolbar action と `Alt+Shift+L` は `enabled` を切り替える。
- 開いている Side Panel は `chrome.storage.onChanged` で quick-toggle 結果を反映する。
- 追加権限は導入していない。検証: `npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
