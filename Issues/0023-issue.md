# 未整理Issueのフェーズ整理

- Status: closed
- Priority: P2
- Type: feature
- Source: local
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-13
- QCDS: Quality, Cost, Delivery

## Context

未整理のIssueを確認し、要件、仕様、設計、実装、テスト、リリースなどの各フェーズに分類できる状態にする。既存Issueの意図を保ちつつ、フェーズタグ付けによって優先順位付け、進捗管理、重複確認をしやすくする。

## Acceptance Criteria

- [x] 未整理Issueが対象範囲として洗い出されている
- [x] 各Issueに適切なフェーズタグが付与されている
- [x] 分類が曖昧なIssueは理由または確認事項が記録されている
- [x] 重複または統合候補のIssueがあれば一覧化されている

## Phase Classification Result

`Issues/*.md` のうち課題本文として扱う `0001` から `0023` を対象に確認した。作業開始時点で `Phase:` がなかった未整理対象は `0001` から `0009` の 9 件で、次の分類を追加した。

| Issue | Phase | 理由 |
| --- | --- | --- |
| `0001-release-manual-validation.md` | `05-test` | Chrome UI と実動画ページの配布前確認手順を整備する validation / test 作業。 |
| `0002-publication-evidence-drift.md` | `06-release` | GitHub 公開状態、release evidence、QCDS 証跡をリリース状態へ同期する作業。 |
| `0003-sidepanel-open-resets-replay-counts.md` | `04-implementation` | Side Panel 起動時の保存適用と再生回数 reset を分離する実装修正。 |
| `0004-replay-failure-counted-completed.md` | `04-implementation` | `video.play()` 失敗時のカウント処理と UI 表示を修正する実装修正。 |
| `0005-runtime-integration-coverage-gap.md` | `05-test` | content script と Side Panel messaging の runtime 近似テストを追加する作業。 |
| `0006-testissue.md` | `00-admin` | ローカル課題テンプレート確認用の管理作業で、製品機能ではない。 |
| `0007-p0-p3-todo.md` | `04-implementation` | P0-P3 の機能追加と不具合修正をまとめて処理した実装フェーズの集約課題。 |
| `0008-qcds.md` | `05-test` | QCDS 評価値と guard 証跡を検査・記録する品質評価作業。 |
| `0009-issue.md` | `06-release` | リリース準備、公開状態、release checklist、push 対象同期を扱う作業。 |

確認後、`0010` から `0023` は既に `Phase:` を持っていることを確認した。`Issues/README.md` のテンプレートにも `Phase:` と利用するフェーズ値を追加した。

## Ambiguous Items

- `0001-release-manual-validation.md` は GitHub #1 と対応するが、ローカル課題は手順・証跡整備が完了したため closed。GitHub #1 は配布直前の visible Chrome UI / 実動画ページの人手確認として open のまま残す。
- `0007-p0-p3-todo.md` は GitHub #6 から #10 を横断する集約課題で、個別の `0013` から `0017` と重なる。履歴維持のため削除せず、closed の集約課題として扱う。
- `0010-issue.md` と `0011-issue.md` はどちらもドキュメント実装整合性確認だが、別時点の確認証跡を保持しているため統合しない。

## Duplicate / Merge Candidates

次の組み合わせは同じ GitHub Issue または同じ目的を別フォーマットで追跡した履歴である。すべて closed のため今回の作業では統合せず、今後新規起票時は新しい `Status` / `Phase` 形式へ寄せる。

| 候補 | 扱い |
| --- | --- |
| `0002-publication-evidence-drift.md` と `0021-github-qcds.md` | GitHub #2 の旧ローカル課題と Codex handoff 課題。 |
| `0003-sidepanel-open-resets-replay-counts.md` と `0020-bug-opening-the-side-panel-resets-active-replay-.md` | GitHub #3 の旧ローカル課題と Codex handoff 課題。 |
| `0004-replay-failure-counted-completed.md` と `0019-replay.md` | GitHub #4 の旧ローカル課題と Codex handoff 課題。 |
| `0005-runtime-integration-coverage-gap.md` と `0018-runtime-like-integration-coverage-for-content-sc.md` | GitHub #5 の旧ローカル課題と Codex handoff 課題。 |
| `0007-p0-p3-todo.md` と `0013` から `0017` | GitHub #6 から #10 を集約した旧課題と個別課題。 |
| `0010-issue.md` と `0011-issue.md` | ドキュメント実装整合性確認の連続した証跡。 |

## Notes

- GitHub Issue の現在状態は 2026-05-13 JST に `gh issue list --repo Sunmax0731/movie-loop-tool --state all --limit 50 --json number,title,state,labels,createdAt,closedAt,url` で確認した。GitHub #1 は open、#2 から #10 は closed、GitHub labels は未設定だった。今回のフェーズ分類はローカル `Issues/*.md` の `Phase:` を正とし、GitHub labels は変更していない。
- 検証: `npm test`
