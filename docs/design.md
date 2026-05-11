# 設計

## UI 方針

Side Panel は小さな操作面として扱い、現在状態の確認と設定変更を同じ画面にまとめます。ページ上には overlay を作らず、動画ページの視聴体験を妨げません。

## 画面要素

- ヘッダー: `Movie Loop Tool` と接続状態。
- 切り替え: `Auto loop` の ON/OFF。
- 回数: `Additional replays` の数値入力、減少ボタン、増加ボタン。
- モード: `Loop mode` で追加回数、無限ループ、現在の周回で停止を選択。
- 対象: `Target video` で全動画または個別動画を選択。
- 区間: `A-B repeat`、開始秒、終了秒。
- 状態: 検出動画数と完了済み追加リプレイ数。
- 失敗表示: 最後の `video.play()` 失敗理由。
- 操作: `Reset count` と `Refresh`。

## 状態表示

- `Checking`: 初期状態。
- `Applied`: 設定反映済み。
- `Updated`: 状態取得済み。
- `Reset`: 完了済み回数リセット済み。
- `Unsupported page`: content script が動作できないページ。

## アクセシビリティ

- 数値入力は `min="1"`、`max="99"`、`step="1"` を指定する。
- A-B repeat の秒数入力は `step="0.1"` を指定する。
- 状態表示は `aria-live="polite"` の領域に置く。
- 切り替えと増減ボタンには意味のある `aria-label` を付ける。

## 操作の分離

Side Panel 起動時は保存済み設定を表示し、active tab へ `MOVIE_LOOP_GET_STATUS` を送るだけにします。設定の保存と `MOVIE_LOOP_APPLY_SETTINGS` は、ユーザーが UI を変更したときだけ実行します。
