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

## Runtime と手動確認

- [x] MV3 manifest を `tools/platform-runtime-gate.mjs` で確認している。
- [x] Chrome / Edge の `--load-extension` で拡張読み込みを確認している。
- [x] Chrome UI `Load unpacked` の人手確認手順を `docs/manual-test.md` に記載している。
- [x] 実動画ページ確認手順を `docs/manual-test.md` に記載している。
- [x] Toolbar action / keyboard shortcut の確認手順を記載している。

## 公開

- [x] GitHub 公開状態の確認手順を記録している。
- [x] `origin` remote を設定している。
- [x] 現在ブランチが `origin/codex/movie-loop-tool-mvp` を追跡している。
- [x] 今回の変更を commit している。
- [x] 今回の変更を push している。
- [x] `git status --short --branch` が clean 状態である。

## リリース判定

今回の実装変更は、commit / push 後にリリース可能な状態です。Chrome UI の最終目視確認は `docs/manual-test.md` の手順で実施します。
