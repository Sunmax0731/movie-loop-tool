# GitHub公開状態とQCDSリリース証跡の再同期

- Status: closed
- Priority: P1
- Type: release
- Source: GitHub Issue #2
- Draft source: codex-cli
- Phase: 06-release
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Delivery
- GitHub Issue: [#2](https://github.com/Sunmax0731/movie-loop-tool/issues/2)

## Context

GitHub Issue #2 のローカル TODO / Issue 化。公開済みリポジトリと origin 設定が存在する一方で、QCDS評価、リリースチェックリスト、生成済み検証証跡が古い公開ブロッカーを示しているため、実際の GitHub / git 状態とリリース資料を一致させる。Tasks は legacy compatibility として明示設定時のみ作成する。

## Acceptance Criteria

- [x] `git remote -v`、`gh repo view`、現在ブランチ、`git status` の確認結果がリリース資料に反映されている。
- [x] GitHub default branch を `codex/movie-loop-tool-mvp` のままにするか正規化するかの判断が記録されている。
- [x] `docs/qcds-strict-metrics.json`、`docs/qcds-evaluation.md`、`docs/release-checklist.md` が現在の公開状態と矛盾しない。
- [x] `dist/validation-result.json` と `dist/release-evidence.json` が stale publication blocker を報告しない。
- [x] `npm test` が成功する。

## Notes

- `origin` は `https://github.com/Sunmax0731/movie-loop-tool.git`、GitHub default branch は現状の `codex/movie-loop-tool-mvp` を維持する。
- `gh auth status` は `Sunmax0731` で有効。Git 書き込み前確認後に今回の同期差分を commit / push する。
- 検証: `npm test`。
