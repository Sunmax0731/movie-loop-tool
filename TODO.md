# TODO

## 要件

- [x] Chrome で再生しているページ上の動画を自動的にループ再生する。
- [x] Side Panel で自動ループを ON/OFF できる。
- [x] 追加ループ回数を `1..99` で設定できる。
- [x] 保存データを `enabled` と `loopCount` のみに限定する。

## 仕様・設計

- [x] `loopCount` を「最初の通常再生後の追加リプレイ回数」と定義する。
- [x] `src/` に主要判定ロジック、`extension/` に Chrome API と DOM 接続を分離する。
- [x] MV3 manifest、権限、content script、side panel、拡張読み込み gate を評価対象にする。

## 今回発見した作業

- [x] README、AGENTS、TODO、docs の文字化けを正式な UTF-8 文書に直す。
- [x] Side Panel の破損した日本語 UI 文言と HTML 属性を修正する。
- [x] `tools/mojibake-check.mjs` の破損した検査パターンを修正する。
- [x] sandbox 環境の `spawn EPERM` を避けるため unit test runner を同一プロセス実行へ切り替える。
- [x] sandbox 環境の `spawn EPERM` を避けるため docs ZIP 生成を純 Node 実装へ切り替える。
- [x] `docs/qcds-evaluation.md`、`docs/manual-test.md`、`docs/release-checklist.md` を追加する。

## 実装・検証

- [x] MV3 manifest、service worker、content script、side panel を実装する。
- [x] unit tests と代表シナリオを用意する。
- [x] platform runtime gate で MV3 manifest を確認し、Chrome 拡張読み込みを試行する。
- [x] Chrome 拡張読み込み gate を完了する。
- [x] docs ZIP、mojibake check、QCDS guard を `npm test` に含める。
- [ ] Chrome UI で `Load unpacked` し、実動画ページで手動確認する。

## リリース準備

- [x] README、AGENTS、SKILL、docs、QCDS、release checklist、docs ZIP をそろえる。
- [x] 生成済みファイルを commit する。
- [x] GitHub public repo 作成、`origin` 設定、push を完了する。
