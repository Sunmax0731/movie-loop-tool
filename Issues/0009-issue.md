# リリース準備

- 状態: closed
- 優先度: P2
- 種別: release
- 由来: local
- Draft source: codex-cli
- Phase: 06-release
- 作成日: 2026-05-11
- 中断日: 2026-05-11
- 完了日: 2026-05-12
- 最終確認日: 2026-05-12
- QCDS: Quality, Delivery
- タスク: [Tasks/0009-issue.md](../Tasks/0009-issue.md)

## 背景

リリースに向けて、配布前に必要な準備作業と品質確認を整理して完了させる。既存の作業ブランチとリポジトリ運用ルールに沿って進める。

## 完了条件

- [x] リリース前に必要な未完了タスクが洗い出されている。
- [x] 配布対象の状態で主要な確認項目が完了している。
- [x] リリース作業に必要な手順や成果物が整理されている。

## 棚卸し結果

- 既存ローカル課題 `0001` から `0007` は closed。
- リリース準備開始時点で open のローカル課題は `0008` QCDS 評価と `0009` リリース準備。
- `0008` は `docs/qcds-evaluation.md`、`docs/qcds-strict-metrics.json`、`tools/closed-alpha-guard.mjs` の証跡で完了条件を満たすため closed に更新した。
- `0009` は release checklist、manual test、docs ZIP、公開状態の確認手順を整理済み。2026-05-12 20:30 JST の `npm test` 再確認で runtime gate の Chrome 拡張読み込み確認は `pass: true`、`extensionLoad: passed` になった。
- 今回更新した証跡は Git 書き込み前確認後に commit / push する対象として同期した。P0 の [`0012`](0012-chrome-gui.md) は closed。配布直前の Chrome UI 最終目視は GitHub #1 の release manual validation として分離して追跡する。
- 2026-05-12 19:55 JST の `gh auth status` で `Sunmax0731` の有効な認証を確認した。GitHub CLI 認証 blocker は解消済み。

## 証跡

- 自動検証: `npm test`
- Runtime gate: `dist/platform-runtime-gate-result.json`
- リリース証跡: `dist/release-evidence.json`
- QCDS 証跡: `docs/qcds-evaluation.md`、`docs/qcds-strict-metrics.json`
- 手動確認手順: `docs/manual-test.md`
- リリース手順: `docs/release-checklist.md`

## 最新確認 (2026-05-12 19:55 JST)

- `npm test` は 2026-05-12 20:30 JST に exit 0。単体テスト 19 件、代表シナリオ 6 件、ChromeExtension runtime gate、docs ZIP、mojibake 検査、QCDS guard は通過した。
- `dist/platform-runtime-gate-result.json` は `pass: true`、`method: mv3-manifest-and-chrome-load-extension`、`extensionLoad: passed`、`staticChecks.pass: true`。一時 Chrome profile cleanup は `EPERM` で `deferred` だが、拡張読み込み gate 自体は通過している。
- Git 書き込み前確認後に、今回更新した TODO、docs、dist、Issues、Tasks、extension、tests の commit / push を行う。
- `gh auth status` は `Sunmax0731` の有効な認証を返した。GitHub CLI 認証 blocker は解消済み。
- P0 の [`0012`](0012-chrome-gui.md) は closed。配布直前の実サイト目視は GitHub #1 に残す。

## 残作業

- Chrome UI の `Load unpacked` と実動画ページの最終目視確認は、配布直前に `docs/manual-test.md` の手順で人手実施する。これは GitHub #1 で追跡し、ローカル 0009 の完了条件からは分離する。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
