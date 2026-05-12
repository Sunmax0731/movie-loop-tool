# [Feature] Select and lock the target video on pages with multiple videos

- Status: closed
- Priority: P1
- Type: feature
- Source: GitHub Issue #6
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction
- GitHub Issue: [#6](https://github.com/Sunmax0731/movie-loop-tool/issues/6)

## Context

広告、プレビュー、背景動画、複数プレイヤーがあるページで、すべての `<video>` に同じループ方針を適用せず、ユーザーが対象動画を選択して固定できるようにする。Side Panel には index、duration、current time、再生/停止状態などのプライバシーを保つラベルだけを表示し、ページ URL、動画 URL、タイトル、再生履歴、コンテンツメタデータは保存しない。Tasks は legacy compatibility として明示設定時だけ作成する。

## Acceptance Criteria

- [x] 複数動画ページで、選択した 1 つの動画だけをループ対象にできる。
- [x] ユーザーが全検出動画を対象にする選択肢を利用できる。
- [x] 対象動画の source が消えた場合、選択がリセットまたは再解決される。
- [x] 選択対象は機微なページ/メディア識別子を保存せずに理解できる。
- [x] `npm test` で target-selection policy が検証される。

## Notes

- `targetVideoId` は runtime 設定として扱い、永続保存しない。
- Side Panel の対象動画ラベルは title / URL / ファイル名を使わず、`Video N (current / duration)` 形式にした。
- 検証: `tests/runtime-messaging.test.mjs`、`npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
