# Twitter動画でループ回数指定とループ再生が動作しない

- Status: closed
- Priority: P2
- Type: bug
- Source: local
- Draft source: codex-cli
- Phase: 05-test
- Created: 2026-05-12
- QCDS: Quality

## Context

指定の video.twimg.com の mp4 ページで動作確認中に、ループ回数を指定できず、期待したループ再生も行われない。Chrome MV3 拡張として動画ページ上の runtime 設定とループ制御が正しく連携しているか確認する。

## Acceptance Criteria

- [x] 指定URLの動画ページで拡張を有効化したときにループ回数を指定できる
- [x] 指定したループ回数どおりに動画が自動ループ再生される
- [x] ループ回数指定不可またはループ未実行の原因が特定され、再発防止の確認観点が記録されている

## Notes

- 原因: 既に開いていた `https://video.twimg.com/...mp4` 形式の通常 Web ページでは、固定 content script が未接続のまま Side Panel / toolbar から message を送ると受信側がなく、設定反映とループ開始に到達できない場合があった。
- 対応: `scripting` 権限を追加し、Side Panel と toolbar action / keyboard command の message 送信で受信側がない場合に `content/video-loop-controller.js` を遅延注入してから同じ message を再送する。
- 再発防止: `tests/runtime-messaging.test.mjs` で Side Panel と service worker の遅延注入経路を固定し、`tools/platform-runtime-gate.mjs` で `scripting` 権限を必須 gate に追加した。
- 検証: 2026-05-12 21:49 JST の `npm test` で単体テスト 21 件、代表シナリオ 6 件、ChromeExtension runtime gate、docs ZIP、mojibake 検査、QCDS guard が通過した。

## Codex Sessions

- 2026-05-12T12:30:41.896Z `codex-session-20260512123041-8fgomp` - All Work Items (VS Code Codex handoff); access=danger-full-access; model=gpt-5.5; intelligence=high; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T123041Z.md)
