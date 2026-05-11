# Specification

## 設定モデル

保存キーは `movieLoopTool` です。

```json
{ "enabled": true, "loopCount": 2 }
```

- `enabled`: 自動ループを有効にする場合は `true`。
- `loopCount`: 最初の通常再生後に追加で再生する回数。範囲は `1..99`。
- 保存対象は `enabled` と `loopCount` のみ。URL、タイトル、再生履歴、動画 metadata は保存しない。

## ループ仕様

1. content script が現在ページの `<video>` を検出する。
2. `MutationObserver` で後から追加された `<video>` も検出する。
3. `ended` event で現在設定と完了済み追加リプレイ回数を確認する。
4. `enabled === true` かつ完了済み回数が `loopCount` 未満なら、`currentTime = 0` に戻して `play()` を呼ぶ。
5. `loopCount` に達したら自動再生しない。
6. source 変更、`loadedmetadata`、`emptied`、設定変更、手動リセットで完了済み回数を `0` に戻す。

## Side Panel 仕様

- `Auto loop`: ON/OFF の切り替え。
- `Additional replays`: `1..99` の数値入力と増減ボタン。
- `Detected videos`: 現在 content script が追跡している動画数。
- `Completed replays`: 現在ページで完了した追加リプレイ回数の合計。
- `Reset count`: 現在ページの完了済み回数をリセットする。
- `Refresh`: 現在タブから状態を再取得する。

## Runtime Gate

`tools/platform-runtime-gate.mjs` は次を確認します。

- `extension/manifest.json` が Manifest V3 である。
- 必要な権限が存在し、`tabs` permission を使っていない。
- manifest 参照ファイルが存在する。
- content script が `http://*/*` と `https://*/*` に限定されている。
- Chrome または Edge を `--load-extension` で起動できる。
