# QCDS Evaluation

## Grade Scale

QCDS は次の完全一致値だけを使います。

`S+ / S- / A+ / A- / B+ / B- / C+ / C- / D+ / D-`

## Current Grades

| Axis | Grade | Reason |
| --- | --- | --- |
| Quality | A- | Unit tests、代表シナリオ、MV3 静的検査、Chrome 拡張読み込み gate、mojibake check、docs ZIP 生成が通る。 |
| Cost | A- | 追加 npm 依存なし、権限は `activeTab`、`storage`、`sidePanel` と通常 Web ページ match に限定。 |
| Delivery | B+ | release docs と docs ZIP は用意済み。生成済みファイルは未 commit で、`origin` remote と GitHub 公開は未完了。 |
| Satisfaction | B+ | Side Panel は操作可能だが、Chrome UI での `Load unpacked` と実動画ページの手動確認が未実施のため B+ に留める。 |

## Runtime Gate Rule

ChromeExtension runtime gate は「MV3 manifest と Chrome の拡張読み込みを確認する」です。Chrome 起動が環境制約で blocked の場合も未完了として扱い、Quality と Satisfaction は B+ 以下にします。

## Evidence

- Unit tests: `node tests/run-unit-tests.mjs`
- Representative scenarios: `node tools/representative-scenarios.mjs`
- Platform runtime gate: `node tools/platform-runtime-gate.mjs`
- Docs ZIP: `node tools/docs-zip.mjs`
- Mojibake check: `node tools/mojibake-check.mjs`
- QCDS guard: `node tools/closed-alpha-guard.mjs`

## Publication Status

- `git status --short --branch`: generated files are uncommitted on `codex/movie-loop-tool-mvp`.
- `git remote -v`: no `origin` remote is configured.
- GitHub public repo creation and push are not complete.
