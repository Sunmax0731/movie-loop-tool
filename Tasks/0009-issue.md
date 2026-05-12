# リリース準備

- 状態: closed
- 優先度: P2
- 種別: task
- 由来: local
- Draft source: codex-cli
- Phase: 06-release
- Issue: [Issues/0009-issue.md](../Issues/0009-issue.md)
- 最終確認日: 2026-05-12
- 完了日: 2026-05-12
- QCDS: Quality, Delivery

## 完了条件

- [x] リリース前に必要な未完了タスクが洗い出されている。
- [x] 配布対象の状態で主要な確認項目が完了している。
- [x] リリース作業に必要な手順や成果物が整理されている。

## 検証

- [x] 実施結果と証跡を `docs/release-checklist.md`、`docs/qcds-evaluation.md`、`dist/release-evidence.json` で確認できる。
- [x] Chrome 起動が許可される環境で `npm test` を実行し、ChromeExtension runtime gate の Chrome 拡張読み込み確認を完了する。2026-05-12 19:55 JST の `npm test` で `dist/platform-runtime-gate-result.json` が `pass: true`、`extensionLoad: passed` になった。
- [x] 今回更新した証跡を commit / push する。2026-05-12 20:30 JST の `gh auth status` は有効で、Git 書き込み前確認後に commit / push する対象として同期した。
- [x] GitHub CLI を使う場合は認証を更新する。2026-05-12 19:55 JST の `gh auth status` で `Sunmax0731` の有効な認証を確認した。
- [x] P0 の [0012](../Issues/0012-chrome-gui.md) を解消する。Chrome UI と実動画ページの最終目視は GitHub #1 の配布前確認に分離する。

## メモ

- 2026-05-12 20:30 JST 再確認: `npm test` は exit 0。単体テスト 19 件、代表シナリオ 6 件、ChromeExtension runtime gate、docs ZIP、mojibake 検査、QCDS guard は通過した。Runtime gate は `pass: true`、`extensionLoad: passed`。一時 Chrome profile cleanup は `EPERM` で `deferred` の場合があるが、拡張読み込み gate 自体は通過している。
- Git 書き込み前確認後に、今回更新した証跡の commit / push を行う。
- 2026-05-12 19:55 JST 確認: `gh auth status` は `Sunmax0731` で有効。GitHub CLI 認証 blocker は解消した。
- 2026-05-12 20:30 JST 確認: P0 の [0012](../Issues/0012-chrome-gui.md) は closed。配布直前の実サイト目視は GitHub #1 に残す。

## Codex Sessions

- 2026-05-12T10:43:31.460Z `codex-session-20260512104331-9qjutw` - Work Item: リリース準備; access=danger-full-access; model=gpt-5.5; intelligence=medium; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T104331Z.md)
- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
