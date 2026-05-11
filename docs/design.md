# Design

## UI 方針

Side Panel は小さな操作面として扱い、現在状態の確認と設定変更を同じ画面にまとめます。ページ上には overlay を作らず、動画ページの視聴体験を妨げません。

## 画面要素

- Header: `Movie Loop Tool` と接続状態。
- Toggle: `Auto loop` の ON/OFF。
- Count: `Additional replays` の数値入力、減少ボタン、増加ボタン。
- Status: 検出動画数と完了済み追加リプレイ数。
- Actions: `Reset count` と `Refresh`。

## 状態表示

- `Checking`: 初期状態。
- `Applied`: 設定反映済み。
- `Updated`: 状態取得済み。
- `Reset`: 完了済み回数リセット済み。
- `Unsupported page`: content script が動作できないページ。

## アクセシビリティ

- 数値入力は `min="1"`、`max="99"`、`step="1"` を指定する。
- 状態表示は `aria-live="polite"` の領域内に置く。
- Toggle と増減ボタンには意味のある `aria-label` を付ける。
