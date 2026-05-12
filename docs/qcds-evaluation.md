# QCDS 評価

## 評価値

QCDS は次の完全一致値だけを使います。

`S+ / S- / A+ / A- / B+ / B- / C+ / C- / D+ / D-`

## 現在の評価

| 軸 | 評価 | 理由 |
| --- | --- | --- |
| Quality | A- | 単体テスト、代表シナリオ、runtime 近似テスト、文字化け検査、docs ZIP 生成、MV3 manifest / Side Panel control 静的検査、0011 のドキュメント実装整合性確認は通る。2026-05-12 21:49 JST の `npm test` 再確認で ChromeExtension runtime gate も `pass: true`、`extensionLoad: passed` になり、P0 の [`0012`](../Issues/0012-chrome-gui.md) と Twitter / X 直 mp4 対応の [`0022`](../Issues/0022-twitter.md) は closed。 |
| Cost | A- | 追加 npm 依存なし。権限は `activeTab`、`storage`、`sidePanel` と通常 Web ページ match に限定している。runtime 設定は保存せず、保守範囲を抑えている。 |
| Delivery | A- | README、AGENTS、SKILL、TODO、docs、local Issues/Tasks、docs ZIP、validation evidence は同期済み。`origin` は GitHub 公開リポジトリを指し、default branch は現状の `codex/movie-loop-tool-mvp` を維持する。2026-05-13 JST に [`0023`](../Issues/0023-issue.md) で未整理 Issue のフェーズ分類を完了し、今回更新分は Git 書き込み前確認後に commit / push する。 |
| Satisfaction | A- | Side Panel の起動だけで状態を壊さず、対象動画固定、A-B repeat、無限ループ、現在周回停止、toolbar / shortcut 操作、quick-toggle 時の Side Panel 同期、replay 失敗理由表示、未接続 content script の遅延注入を提供している。対象動画ラベルは title / URL / ファイル名を使わない。配布直前の visible Chrome UI / 実動画ページ目視は GitHub #1 に分離して残す。 |

## フォローアップ

| 項目 | 状態 | 次アクション |
| --- | --- | --- |
| Chrome UI `Load unpacked` と実動画ページの最終目視 | 手順化済み / release manual validation | 配布直前に GitHub #1 と `docs/manual-test.md` の手順で人手確認する。Twitter / X 直 mp4 ページの確認観点も `docs/manual-test.md` に追加済み。 |
| Runtime gate 失敗時の評価見直し | ルール化済み | ChromeExtension runtime gate が失敗または blocked の場合は Quality と Satisfaction を B+ 以下にする。 |
| ローカル課題との追跡 | 完了 | `Issues/0008-qcds.md` と `Tasks/0008-qcds.md` を closed にし、TODO Work Items に紐づける。 |

## Runtime Gate ルール

ChromeExtension runtime gate は「MV3 manifest と Chrome の拡張読み込みを確認する」ものです。Chrome 起動が環境制約で blocked の場合は未完了として扱い、Quality と Satisfaction は B+ 以下にします。2026-05-12 20:30 JST の `npm test` では runtime gate が `pass: true`、`extensionLoad: passed` になりました。

## 証跡

- 単体テスト: `node tests/run-unit-tests.mjs`
- 代表シナリオ: `node tools/representative-scenarios.mjs`
- Platform runtime gate: `node tools/platform-runtime-gate.mjs`
- Docs ZIP: `node tools/docs-zip.mjs`
- 文字化け検査: `node tools/mojibake-check.mjs`
- QCDS guard: `node tools/closed-alpha-guard.mjs`

## ドキュメント実装整合性確認 (2026-05-11 23:06 JST)

| 対象 | 確認内容 | 結果 |
| --- | --- | --- |
| README | MV3 manifest、Side Panel、追加リプレイ回数 `1..99`、ループモード、対象動画固定、A-B repeat、toolbar / shortcut、保存キー制限を `extension/manifest.json`、`src/loop-policy.mjs`、`extension/content/video-loop-controller.js`、`extension/sidepanel/sidepanel.js` と照合した。 | 矛盾なし |
| AGENTS / SKILL | `src/` と `extension/` の配置、保存キー `enabled` / `loopCount` の限定、runtime 設定、Side Panel 起動時の read-only refresh、`video.play()` 失敗時の未加算と表示が実装と一致することを確認した。 | 矛盾なし |
| manual-test | `Load unpacked`、Side Panel 操作、unsupported page、対象動画固定、A-B repeat、無限ループ、現在周回停止、toolbar action / `Alt+Shift+L` の確認手順が現在の manifest / UI / messaging 実装で実行可能であることを確認した。 | 矛盾なし |

この確認で 0010 の範囲に新規 TODO 化が必要な矛盾は見つからなかった。Chrome 起動 `EPERM`、Git index lock 作成権限、GitHub CLI 認証は当時のリリース準備 blocker として `0009` に記録した。その後 2026-05-12 19:55 JST の再確認で runtime gate と GitHub CLI 認証は解消済み。

## ドキュメント実装整合性確認 (0011 / 2026-05-11 23:37 JST)

| 対象 | 確認内容 | 結果 |
| --- | --- | --- |
| README | `extension/manifest.json`、`src/loop-policy.mjs`、`extension/content/video-loop-controller.js`、`extension/sidepanel/sidepanel.js`、`extension/background/service-worker.js` と照合し、MV3、Side Panel、追加リプレイ回数 `1..99`、ループモード、対象動画固定、A-B repeat、toolbar / shortcut、保存キー制限が一致することを確認した。 | 矛盾なし |
| AGENTS.md | `src/` と `extension/` の責務分離、永続保存値 `enabled` / `loopCount` の限定、TODO 駆動、`npm test` の gate 構成が現在のリポジトリ構成と一致することを確認した。 | 矛盾なし |
| SKILL.md | `loopMode` / `targetVideoId` / `segment` の runtime 設定、Side Panel 起動時の read-only refresh、`video.play()` reject 時の未加算と `lastError` 表示、同一オリジン iframe / open Shadow DOM の検出方針が実装と一致することを確認した。 | 矛盾なし |
| manual-test | `Load unpacked`、Side Panel 操作、unsupported page、対象動画固定、A-B repeat、無限ループ、現在周回停止、toolbar action / `Alt+Shift+L` の確認手順が現在の manifest / UI / messaging 実装で実行可能であることを確認した。Chrome UI と実動画ページの最終目視は配布直前の人手確認として残す。 | 矛盾なし |

この確認で 0011 の範囲に新規 TODO 化が必要な矛盾は見つからなかった。Task から Issue への相対リンク不一致は `Tasks/0011-issue.md` 内で修正し、0011 を closed にした。

## 公開状態

- `git remote -v`: `origin` は `https://github.com/Sunmax0731/movie-loop-tool.git`。
- GitHub default branch: `codex/movie-loop-tool-mvp` を現状維持する。
- 現在ブランチ: `codex/movie-loop-tool-mvp`。
- 追跡先: `origin/codex/movie-loop-tool-mvp`。
- リリース準備 Work Item は、今回更新分を Git 書き込み前確認後に commit / push することを最終 gate とする。配布直前の Chrome UI / 実動画ページの最終目視は GitHub #1 に分離する。

## 最新確認 (2026-05-12 21:49 JST)

- `npm test`: 2026-05-12 21:49 JST に exit 0。単体テスト 21 件、代表シナリオ 6 件、ChromeExtension runtime gate、docs ZIP、mojibake 検査、QCDS guard は通過した。
- Runtime gate: `dist/platform-runtime-gate-result.json` は `pass: true`、`method: mv3-manifest-and-chrome-load-extension`、`extensionLoad: passed`、`staticChecks.pass: true`。
- Issue 0022: `https://video.twimg.com/...mp4` 形式の直動画ページで起きる未接続 content script 経路に対し、Side Panel と toolbar action / keyboard command の遅延注入と再送を追加して closed にした。
- Git staging: `git status --short --branch` と `.git/index.lock` の事前確認後、今回更新した release prep / QCDS 証跡を commit / push する。
- GitHub CLI auth: 2026-05-12 20:30 JST の `gh auth status` で `Sunmax0731` の有効な認証を確認した。

## Issue フェーズ整理 (0023 / 2026-05-13 JST)

- `Issues/*.md` の `0001` から `0023` を対象に確認し、`Phase:` がなかった `0001` から `0009` にフェーズを追加した。
- `Issues/README.md` に `Phase:` テンプレートと利用するフェーズ値を追加した。
- `0023` に分類結果、曖昧事項、重複または統合候補を記録して closed にした。
- GitHub Issue の現在状態は `gh issue list --repo Sunmax0731/movie-loop-tool --state all --limit 50 --json number,title,state,labels,createdAt,closedAt,url` で確認し、GitHub #1 は open、#2 から #10 は closed、labels は未設定だった。今回の分類はローカル `Issues/*.md` の `Phase:` を正とし、GitHub labels は変更していない。
- VS Code の Work Items Tree では `TODO.md` の checklist 行も個別 Work Item として phase 判定されるため、完了済み checklist 行に `[Phase: ...]` を追記し、`scanWorkItems()` で `00-inbox` が `total=0` になることを確認した。
