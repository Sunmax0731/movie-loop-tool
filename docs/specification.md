# 仕様

## 設定モデル

永続保存キーは `movieLoopTool` です。`chrome.storage.sync` に保存する値は次の 2 つだけです。

```json
{ "enabled": true, "loopCount": 2 }
```

- `enabled`: 自動ループを有効にする場合は `true`。
- `loopCount`: 最初の通常再生後に追加で再生する回数。範囲は `1..99`。

現在ページだけで使う runtime 設定は content script のメモリ上で扱います。

- `loopMode`: `count`、`infinite`、`stop-current`。
- `targetVideoId`: `all` または content script が検出した動画 ID。
- `segment`: A-B repeat 設定。`enabled`、`start`、`end` を持つ。

## ループ仕様

1. content script が現在ページの `<video>` を検出する。
2. `MutationObserver` で後から追加された `<video>`、open Shadow DOM、同一オリジン iframe を再走査する。
3. `ended` event で現在設定と完了済みリプレイ回数を確認する。
4. `enabled === true` かつ次回リプレイが許可されている場合、`currentTime = 0` に戻して `play()` を呼ぶ。
5. `loopMode === "count"` では `loopCount` に到達したら自動リプレイを止める。
6. `loopMode === "infinite"` では `Stop after current run` へ切り替えるまで自動リプレイを続ける。
7. `loopMode === "stop-current"` では現在再生中の周回後に次の自動リプレイを開始しない。
8. A-B repeat が有効で `currentTime >= end` になった場合、対象動画を `start` に戻して `play()` を呼ぶ。
9. `video.play()` が reject された場合は完了回数に加算せず、`lastError` に理由を残す。
10. source 変更、`loadedmetadata`、`emptied`、明示的な reset、設定変更では完了済み回数を初期化する。

## Side Panel 仕様

- `Auto loop`: ON/OFF の切り替え。
- `Additional replays`: `1..99` の数値入力と増減ボタン。
- `Loop mode`: 追加回数、無限ループ、現在の周回で停止。
- `Target video`: すべての検出動画または特定動画を選択。
- 対象動画の選択肢は `Video N (current / duration)` 形式で表示し、title、動画 URL、ファイル名は表示しない。
- `A-B repeat`: 開始秒、終了秒、ON/OFF。
- `Detected videos`: content script が追跡している動画数。
- `Completed replays`: 現在ページで完了した自動リプレイ回数の合計。
- `Last replay error`: 最後に失敗した `play()` の理由。
- `Reset count`: 現在ページの完了済み回数をリセットする。
- `Refresh`: 現在タブから状態を再取得する。

## Shortcut 仕様

- Toolbar action click は現在タブの `enabled` を切り替える。
- `Alt+Shift+L` は現在タブの `enabled` を切り替える。
- 切り替え結果は `chrome.storage.sync` に保存し、可能な場合は現在タブへ即時送信する。
