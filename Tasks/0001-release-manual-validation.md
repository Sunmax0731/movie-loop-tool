# Chrome UI 手動検証手順の整備

- 状態: closed
- 優先度: P0
- 種別: task
- 由来: local
- Phase: 05-validation
- Issue: [Issues/0001-release-manual-validation.md](../Issues/0001-release-manual-validation.md)
- QCDS: Satisfaction, Delivery

## 完了条件

- [x] `docs/manual-test.md` に `Load unpacked` の手順を記載する。
- [x] 実動画ページでの確認手順を記載する。
- [x] `docs/release-checklist.md` に自動 gate と人手確認の境界を反映する。

## 検証

- [x] `npm test` で docs ZIP、mojibake check、QCDS guard が通る。
