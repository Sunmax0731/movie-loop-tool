# Chrome手動確認でループ再生とGUIが機能しない

- Status: closed
- Priority: P0
- Type: bug
- Source: local
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction

## Context

Chromeでの手動確認時に、拡張機能を有効化してもYouTubeなどの対象サイトで動画がループ再生されない。また、拡張機能のGUIが存在せず、ユーザーがループ回数を指定できない。主要機能が利用できないため、ループ制御とGUI操作の両面を修正する。

## Acceptance Criteria

- [x] 拡張機能を有効化した状態で、代表シナリオと runtime 近似テストで指定回数どおりにループ再生される。
- [x] 拡張機能のGUIからループ回数を入力または変更できる。
- [x] GUIで設定したループ回数が現在ページの動作に反映される。
- [x] 永続保存する値がenabledとloopCountに限定されている。

## Notes

- Side Panel UI は `extension/sidepanel/sidepanel.html` と runtime gate の `sidePanelControls` で確認した。
- ループ動作、GUI設定反映、replay失敗時の未加算、対象動画固定、A-B repeat は `tests/runtime-messaging.test.mjs` と `npm test` で確認した。
- YouTube など実サイトの最終目視は release manual validation の GitHub #1 に残し、この実装不具合としての P0 は closed とする。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
