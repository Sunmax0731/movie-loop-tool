# リリースチェックリスト

## 自動検証

- [x] 単体テストを `npm test` に含めている。
- [x] 代表シナリオを `npm test` に含めている。
- [x] content script と Side Panel messaging の runtime 近似テストを `npm test` に含めている。
- [x] ChromeExtension platform runtime gate を `npm test` に含めている。
- [x] Docs ZIP 生成を `npm test` に含めている。
- [x] Mojibake 検査を `npm test` に含めている。
- [x] QCDS guard を `npm test` に含めている。

## ドキュメント

- [x] `README.md` にインストール、操作、検証、プライバシー境界、ドキュメント一覧を記載している。
- [x] `AGENTS.md` と `SKILL.md` にリポジトリの作業フローを記載している。
- [x] `TODO.md` に発見した作業を完了前に記録している。
- [x] 要件、仕様、アーキテクチャ、設計、手動テスト、QCDS、リリースチェックリストを用意している。
- [x] 2026-05-11 23:06 JST に README、AGENTS、SKILL、manual-test と実装を照合し、0010 の範囲で修正が必要な矛盾がないことを確認している。
- [x] 2026-05-11 23:37 JST に README、AGENTS、SKILL、manual-test と実装を再照合し、0011 の Quality / Satisfaction 範囲で修正が必要な矛盾がないことを確認している。

## Runtime と手動確認

- [x] MV3 manifest を `tools/platform-runtime-gate.mjs` で確認している。
- [x] Chrome / Edge の `--load-extension` で拡張読み込みを確認している。2026-05-12 19:55 JST の `npm test` で ChromeExtension runtime gate が `pass: true`、`extensionLoad: passed` になった。
- [x] Chrome UI `Load unpacked` の人手確認手順を `docs/manual-test.md` に記載している。
- [x] 実動画ページ確認手順を `docs/manual-test.md` に記載している。
- [x] Toolbar action / keyboard shortcut の確認手順を記載している。

## 公開

- [x] GitHub 公開状態の確認手順を記録している。
- [x] `origin` remote を設定している。
- [x] 現在ブランチが `origin/codex/movie-loop-tool-mvp` を追跡している。
- [x] 今回の変更を commit する対象として同期している。Git 書き込み前確認後に `git add`、`git commit`、`git push` を実行する。
- [x] GitHub CLI 認証または push 用認証が有効である。2026-05-12 19:55 JST の `gh auth status` で `Sunmax0731` の有効な認証を確認した。
- [x] 今回の変更を push する対象として同期している。commit 後に同じブランチへ push する。
- [x] `git status --short --branch` の確認を Git 書き込み前 gate に含めている。

## リリース準備棚卸し

- [x] ローカル課題 `0001` から `0007` は closed である。
- [x] `0008` QCDS 評価は `docs/qcds-evaluation.md` と `docs/qcds-strict-metrics.json` の証跡に紐づけて closed である。
- [x] `0009` リリース準備は未完了タスク、主要確認項目、手順・成果物の棚卸しを完了して closed である。配布直前目視は GitHub #1 に分離し、P0 の [`0012`](../Issues/0012-chrome-gui.md) は closed。
- [x] 配布対象の主要成果物は `extension/`、`docs/`、`dist/movie-loop-tool-docs.zip`、`dist/release-evidence.json` で確認できる。

## リリース判定

現在のリリース準備判定は ready after commit / push です。2026-05-12 20:30 JST の `npm test` は exit 0 で単体テスト 19 件、代表シナリオ 6 件、ChromeExtension runtime gate、docs ZIP、mojibake 検査、QCDS guard を通過し、Chrome 拡張読み込み確認は `extensionLoad: passed` になりました。`gh auth status` も `Sunmax0731` の有効な認証を返しています。配布直前の visible Chrome UI と実動画ページの最終目視は GitHub #1 と `docs/manual-test.md` の手順で人手実施します。
