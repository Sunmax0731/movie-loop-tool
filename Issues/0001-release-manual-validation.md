# リリース前の Chrome UI 手動検証が未完了

- 状態: closed
- 優先度: P0
- 種別: release
- 由来: ローカル調査
- Phase: 05-test
- 作成日: 2026-05-11
- 完了日: 2026-05-11
- QCDS: Satisfaction, Delivery
- GitHub Issue: #1
- タスク: [Tasks/0001-release-manual-validation.md](../Tasks/0001-release-manual-validation.md)

## 背景

`npm test` と ChromeExtension runtime gate は自動で実行できますが、Chrome UI の `Load unpacked` と実動画ページの最終目視確認は、人手で実施する手順を残す必要があります。

## 完了条件

- [x] Chrome UI の `Load unpacked` 手順を `docs/manual-test.md` に記載する。
- [x] 実動画ページで確認する操作手順を `docs/manual-test.md` に記載する。
- [x] `docs/release-checklist.md` と QCDS 証跡へ自動 gate と人手確認の境界を反映する。
- [x] 証跡再生成後に `npm test` が成功する。

## メモ

- Codex では目視操作自体は代替せず、Chrome の `--load-extension` gate と手動手順の整備をリリース証跡として残す。
