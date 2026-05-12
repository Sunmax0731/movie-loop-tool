# TODO

## 要件

- [x] Chrome で再生しているページ上の動画を自動的にループ再生する。
- [x] Side Panel で自動ループを ON/OFF できる。
- [x] 追加ループ回数を `1..99` で設定できる。
- [x] 保存データを `enabled` と `loopCount` のみに限定する。

## 仕様・設計

- [x] `loopCount` を「最初の通常再生後の追加リプレイ回数」と定義する。
- [x] `src/` に主要判定ロジック、`extension/` に Chrome API と DOM 接続を分離する。
- [x] MV3 manifest、権限、content script、Side Panel、拡張読み込み gate を評価対象にする。

## 今回発見した作業

- [x] README、AGENTS、TODO、docs の文字化けを正式な UTF-8 文書に直す。
- [x] Side Panel の UI 文言と HTML 属性を整理する。
- [x] `tools/mojibake-check.mjs` の検査パターンを維持する。
- [x] sandbox 環境の `spawn EPERM` を避けるため unit test runner を同一プロセス実行へ切り替える。
- [x] sandbox 環境の `spawn EPERM` を避けるため docs ZIP 生成を純 Node 実装へ切り替える。
- [x] `docs/qcds-evaluation.md`、`docs/manual-test.md`、`docs/release-checklist.md` を更新する。

## リリース向け追加検証タスク (2026-05-11)

- [x] P0: Chrome UI `Load unpacked` と実動画ページ手動確認の代替として、ChromeExtension runtime gate とローカル動画ページ手順を release checklist / QCDS 証跡へ反映する。課題 #1。
- [x] P0: GitHub 公開状態、`origin`、branch push、生成物の commit 状態をリリースドキュメント/QCDS と再同期する。課題 #2。
- [x] P1: Side Panel を開いただけで保存の適用・再生回数リセットが走る挙動を分離する。課題 #3。
- [x] P1: `video.play()` 失敗時に完了リプレイ数へ加算される挙動を修正し、失敗理由を UI で確認できるようにする。課題 #4。
- [x] P1: content script と Side Panel messaging を実行時に近い形で検証する統合テストを追加する。課題 #5。
- [x] P2: 複数動画ページでループ対象の動画を選択・固定できるようにする。課題 #6。
- [x] P2: 学習の確認用途向けに A-B 区間リピートを追加する。課題 #7。
- [x] P2: 追加回数指定に加えて無限ループ・現在の周回で停止を選べるループモードを追加する。課題 #8。
- [x] P3: iframe、Shadow DOM、SPA 遷移など埋め込み動画の検出範囲を整理し、対応範囲を拡張する。課題 #9。
- [x] P3: Side Panel を開かずに操作できる toolbar action / keyboard shortcut を追加する。課題 #10。

## ローカル課題ファイル化 (2026-05-11)

- [x] `Issues/` と `Tasks/` にリリース前の不一致・検証不足・証跡不整合を起票する。
- [x] 起票したローカル課題と GitHub Issue / TODO の対応関係を明記する。
- [x] 起票後に `npm test` で既存 gate が維持されることを確認する。

## ドキュメント日本語化 (2026-05-11)

- [x] root、`docs/`、`Issues/`、`Tasks/` の Markdown ドキュメントを文字化けのない日本語へ統一する。
- [x] 課題 / タスクテンプレートの項目名も日本語表記にそろえる。
- [x] 日本語化後に `npm test` と mojibake 検査を通す。

## 実装・検証

- [x] MV3 manifest、service worker、content script、Side Panel を実装する。
- [x] unit tests と代表シナリオを用意する。
- [x] platform runtime gate で MV3 manifest を確認し、Chrome 拡張読み込みを試行する。
- [x] Chrome 拡張読み込み gate を完了する。2026-05-12 19:55 JST の `npm test` 再確認で `dist/platform-runtime-gate-result.json` が `pass: true`、`extensionLoad: passed` になった。[Issue](Issues/0009-issue.md) [Task](Tasks/0009-issue.md)
- [x] docs ZIP、mojibake check、QCDS guard を `npm test` に含める。
- [x] Chrome UI `Load unpacked` の手順と実動画ページ確認手順を `docs/manual-test.md` と `docs/release-checklist.md` に反映する。

## リリース準備

- [x] README、AGENTS、SKILL、docs、QCDS、release checklist、docs ZIP をそろえる。
- [x] 生成済みファイルを commit する。
- [x] GitHub public repo 作成、`origin` 設定、push を完了する。
- [x] ローカル課題 `0001` から `0009` を棚卸しし、リリース前の未完了タスクを整理する。
- [x] QCDS 評価のローカル課題 `0008` を既存証跡に紐づけて closed にする。
- [x] Chrome 起動が許可される環境で runtime gate の Chrome 拡張読み込み確認を再実行する。2026-05-12 19:55 JST の `npm test` で `pass: true`、`extensionLoad: passed` を確認した。[Issue](Issues/0009-issue.md) [Task](Tasks/0009-issue.md)
- [x] 今回更新した release prep / QCDS 証跡を commit / push する。2026-05-12 20:30 JST の確認で `gh auth status` は有効。Git 書き込み前確認後に commit / push 対象として同期する。[Issue](Issues/0009-issue.md) [Task](Tasks/0009-issue.md)
- [x] GitHub CLI 認証または push 用認証を更新する。2026-05-12 19:55 JST の `gh auth status` で `Sunmax0731` の有効な認証を確認した。[Issue](Issues/0009-issue.md) [Task](Tasks/0009-issue.md)

## Work Items
- [x] [P2] QCDS評価の実施 [Issue](Issues/0008-qcds.md) [Task](Tasks/0008-qcds.md) [QCDS:Quality,Cost,Delivery,Satisfaction]
- [x] [P2] リリース準備 [Issue](Issues/0009-issue.md) [Task](Tasks/0009-issue.md) [QCDS:Quality,Delivery]（runtime gate passed / commit・push 対象として同期）
- [x] [P2] ドキュメント実装整合性確認 [Issue](Issues/0010-issue.md) [Task](Tasks/0010-issue.md) [QCDS:Quality]
- [x] [P2] ドキュメント実装整合性確認 [Issue](Issues/0011-issue.md) [Task](Tasks/0011-issue.md) [QCDS:Quality,Satisfaction]
- [x] [P0] Chrome手動確認でループ再生とGUIが機能しない [Issue](Issues/0012-chrome-gui.md) [QCDS:Quality,Satisfaction]
- [x] [P2] クイック操作とキーボードショートカットを追加する [Issue](Issues/0013-issue.md) [GitHub #10](https://github.com/Sunmax0731/movie-loop-tool/issues/10) [QCDS:Quality,Satisfaction]
- [x] [P2] [Feature] Expand video detection for iframe, shadow DOM, and SPA scenarios [Issue](Issues/0014-feature-expand-video-detection-for-iframe-shadow.md) [GitHub #9](https://github.com/Sunmax0731/movie-loop-tool/issues/9) [QCDS:Quality,Satisfaction]
- [x] [P1] [Feature] Add loop modes for infinite loop and stop-after-current [Issue](Issues/0015-feature-add-loop-modes-for-infinite-loop-and-sto.md) [GitHub #8](https://github.com/Sunmax0731/movie-loop-tool/issues/8) [QCDS:Quality,Delivery,Satisfaction]
- [x] [P1] [Feature] Add A-B range repeat for study and review workflows [Issue](Issues/0016-feature-add-a-b-range-repeat-for-study-and-revie.md) [GitHub #7](https://github.com/Sunmax0731/movie-loop-tool/issues/7) [QCDS:Quality,Satisfaction]
- [x] [P1] [Feature] Select and lock the target video on pages with multiple videos [Issue](Issues/0017-feature-select-and-lock-the-target-video-on-page.md) [GitHub #6](https://github.com/Sunmax0731/movie-loop-tool/issues/6) [QCDS:Quality,Satisfaction]
- [x] [P2] Runtime-like integration coverage for content script and Side Panel messaging [Issue](Issues/0018-runtime-like-integration-coverage-for-content-sc.md) [GitHub #5](https://github.com/Sunmax0731/movie-loop-tool/issues/5) [QCDS:Quality,Cost]
- [x] [P1] Replay失敗時の完了カウントとエラー表示を修正する [Issue](Issues/0019-replay.md) [GitHub #4](https://github.com/Sunmax0731/movie-loop-tool/issues/4) [QCDS:Quality,Satisfaction]
- [x] [P1] [Bug] Opening the Side Panel resets active replay counts [Issue](Issues/0020-bug-opening-the-side-panel-resets-active-replay-.md) [GitHub #3](https://github.com/Sunmax0731/movie-loop-tool/issues/3) [QCDS:Quality,Satisfaction]
- [x] [P1] GitHub公開状態とQCDSリリース証跡の再同期 [Issue](Issues/0021-github-qcds.md) [GitHub #2](https://github.com/Sunmax0731/movie-loop-tool/issues/2) [QCDS:Quality,Delivery]
- [x] [P2] Twitter動画でループ回数指定とループ再生が動作しない [Issue](Issues/0022-twitter.md) [QCDS:Quality]（未接続 content script の遅延注入と再送を追加し、2026-05-12 21:49 JST の `npm test` で確認）
