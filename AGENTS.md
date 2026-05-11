# AGENTS

このリポジトリは Chrome で再生している動画を自動ループする MV3 拡張です。作業前に `README.md`、`AGENTS.md`、`SKILL.md` をこの順で確認してください。

## 作業ルール

- 作業ブランチは `codex/<task-summary>` 形式を 1 本だけ使います。
- 共通ルートは `D:\AI` です。`D:\Claude` を再導入しません。
- 変更は `D:\AI\ChromeExtension\movie-loop-tool` に閉じます。
- TODO 駆動で進め、発見した作業は `TODO.md` に追記してから処理します。
- 主要判定ロジックは `src/`、Chrome API と DOM 接続は `extension/` に置きます。

## 評価ゲート

- `npm test` は unit tests、代表シナリオ、platform runtime gate、docs ZIP、mojibake check、QCDS guard を実行します。
- ChromeExtension runtime gate は MV3 manifest と Chrome の拡張読み込みを確認します。
- QCDS は `S+ / S- / A+ / A- / B+ / B- / C+ / C- / D+ / D-` の完全一致だけを使います。
