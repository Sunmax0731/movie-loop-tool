# 公開状態とリリース証跡の同期

- 状態: closed
- 優先度: P0
- 種別: task
- 由来: local
- Phase: 06-release
- Issue: [Issues/0002-publication-evidence-drift.md](../Issues/0002-publication-evidence-drift.md)
- QCDS: Delivery

## 完了条件

- [x] `origin` remote と upstream branch の状態を確認する。
- [x] QCDS docs と metrics を現在状態へ更新する。
- [x] `dist/validation-result.json` と `dist/release-evidence.json` を再生成する。

## 検証

- [x] `npm test` が成功する。
