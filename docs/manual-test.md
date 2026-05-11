# Manual Test

## 前提

- Working directory: `D:\AI\ChromeExtension\movie-loop-tool`
- Extension directory: `D:\AI\ChromeExtension\movie-loop-tool\extension`
- Command: `npm test`
- Browser page: `chrome://extensions`

## 手順

1. PowerShell で `npm test` を実行し、すべて成功することを確認する。
2. Chrome で `chrome://extensions` を開く。
3. Developer mode を有効にする。
4. `Load unpacked` で `D:\AI\ChromeExtension\movie-loop-tool\extension` を選ぶ。
5. `https://` の動画ページを開く。
6. 拡張アイコンから Side Panel を開く。
7. `Auto loop` を ON にする。
8. `Additional replays` を `2` にする。
9. 動画を最後まで再生し、追加で 2 回再生されることを確認する。
10. `Auto loop` を OFF にし、次の `ended` event で再生が再開しないことを確認する。
11. `Reset count` と `Refresh` がエラーなく動作することを確認する。
12. `chrome://extensions` などの対象外ページで Side Panel が `Unsupported page` を表示することを確認する。

## 期待結果

- Side Panel の ON/OFF と追加リプレイ回数が即時反映される。
- 追加リプレイ回数に達した後は自動再生しない。
- 対象外ページではクラッシュせず、対象外状態を表示する。
- 保存データは `enabled` と `loopCount` のみに留まる。

## 現在の実施状況

Codex では Chrome UI の手動操作と実動画ページ確認は未実施です。自動の platform runtime gate は `npm test` で実行します。
