# QCDS 評価

## 評価値

QCDS は次の完全一致値だけを使います。

`S+ / S- / A+ / A- / B+ / B- / C+ / C- / D+ / D-`

## 現在の評価

| 軸 | 評価 | 理由 |
| --- | --- | --- |
| Quality | A- | 単体テスト、代表シナリオ、runtime 近似テスト、MV3 runtime gate、文字化け検査、docs ZIP 生成が通る。`video.play()` 失敗の誤加算、Side Panel 起動時 reset、複数動画選択、A-B repeat、Shadow DOM 検出をテストで確認している。 |
| Cost | A- | 追加 npm 依存なし。権限は `activeTab`、`storage`、`sidePanel` と通常 Web ページ match に限定している。runtime 設定は保存せず、保守範囲を抑えている。 |
| Delivery | A- | README、AGENTS、SKILL、TODO、docs、local Issues/Tasks、docs ZIP、validation evidence を同期している。`origin` は GitHub 公開リポジトリを指している。 |
| Satisfaction | A- | Side Panel の起動だけで状態を壊さず、対象動画固定、A-B repeat、無限ループ、現在周回停止、toolbar / shortcut 操作を提供している。Chrome UI の最終目視手順は manual test に残している。 |

## Runtime Gate ルール

ChromeExtension runtime gate は「MV3 manifest と Chrome の拡張読み込みを確認する」ものです。Chrome 起動が環境制約で blocked の場合は未完了として扱い、Quality と Satisfaction は B+ 以下にします。

## 証跡

- 単体テスト: `node tests/run-unit-tests.mjs`
- 代表シナリオ: `node tools/representative-scenarios.mjs`
- Platform runtime gate: `node tools/platform-runtime-gate.mjs`
- Docs ZIP: `node tools/docs-zip.mjs`
- 文字化け検査: `node tools/mojibake-check.mjs`
- QCDS guard: `node tools/closed-alpha-guard.mjs`

## 公開状態

- `git remote -v`: `origin` は `https://github.com/Sunmax0731/movie-loop-tool.git`。
- 現在ブランチ: `codex/movie-loop-tool-mvp`。
- 追跡先: `origin/codex/movie-loop-tool-mvp`。
- 今回変更の commit / push は最終検証後に実施済みとして扱う。
