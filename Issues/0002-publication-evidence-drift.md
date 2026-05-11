# リリース証跡が現在の GitHub 公開状態と一致していない

- 状態: closed
- 優先度: P0
- 種別: bug
- 由来: ローカル調査
- 作成日: 2026-05-11
- 完了日: 2026-05-11
- QCDS: Delivery
- GitHub Issue: #2
- タスク: [Tasks/0002-publication-evidence-drift.md](../Tasks/0002-publication-evidence-drift.md)

## 背景

`origin` は `https://github.com/Sunmax0731/movie-loop-tool.git` を指し、現在ブランチは `origin/codex/movie-loop-tool-mvp` を追跡しています。過去の QCDS 証跡には未公開または remote 未設定の記述が残っていたため、現在状態へ同期します。

## 完了条件

- [x] `git remote -v`、現在ブランチ、upstream branch、GitHub repo の確認結果を docs に反映する。
- [x] `docs/qcds-strict-metrics.json` が現在の公開状態を反映している。
- [x] `docs/qcds-evaluation.md` と `docs/release-checklist.md` が同じ状態を示している。
- [x] `dist/validation-result.json` と `dist/release-evidence.json` を再生成する。
- [x] `npm test` が成功する。

## メモ

- 最終 commit / push 後に release evidence は再生成済みファイルとして追跡する。
