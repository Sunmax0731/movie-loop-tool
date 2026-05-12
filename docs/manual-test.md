# 手動テスト

## 前提

- 作業ディレクトリ: `D:\AI\ChromeExtension\movie-loop-tool`
- 拡張機能ディレクトリ: `D:\AI\ChromeExtension\movie-loop-tool\extension`
- 実行コマンド: `npm test`
- ブラウザページ: `chrome://extensions`

## 手順

1. PowerShell で `npm test` を実行し、すべて成功することを確認する。
2. Chrome で `chrome://extensions` を開く。
3. Developer mode を有効にする。
4. `Load unpacked` で `D:\AI\ChromeExtension\movie-loop-tool\extension` を選ぶ。
5. `http://` または `https://` の動画ページを開く。
6. 拡張機能の Side Panel を開く。
7. `Auto loop` を ON にする。
8. `Additional replays` を `2` にする。
9. `Loop mode` を `Use replay count` にする。
10. 動画を最後まで再生し、追加で 2 回再生されることを確認する。
11. `Loop mode` を `Infinite loop` にし、追加回数を超えても次の自動再生が始まることを確認する。
12. `Loop mode` を `Stop after current run` にし、現在の周回後に次の自動再生が始まらないことを確認する。
13. 複数動画ページでは `Target video` で対象を切り替え、選んだ動画だけがリピート対象になることを確認する。
14. `A-B repeat` を ON にし、開始秒と終了秒を設定して区間リピートされることを確認する。
15. `Reset count` と `Refresh` がエラーなく動作することを確認する。
16. `chrome://extensions` などの対象外ページで Side Panel が `Unsupported page` を表示することを確認する。
17. Toolbar action または `Alt+Shift+L` で Side Panel を開かずに `Auto loop` を切り替えられることを確認する。

## 期待結果

- Side Panel の ON/OFF と追加リプレイ回数が即時反映される。
- Side Panel を開いただけでは完了済みリプレイ回数がリセットされない。
- `video.play()` が失敗した場合、完了済み回数は増えず、失敗理由が表示される。
- A-B repeat、対象動画固定、無限ループ、現在周回停止が動作する。
- 保存データは `enabled` と `loopCount` のみに留まる。

## 現在の実行状態

Codex では Chrome UI の目視操作は人手確認として残します。自動検証として `npm test` 内で ChromeExtension runtime gate を実行し、MV3 manifest、必須ファイル、Side Panel control を確認します。2026-05-12 20:30 JST の `npm test` 再確認で Chrome の `--load-extension` 起動確認は `extensionLoad: passed` になりました。P0 の [`0012`](../Issues/0012-chrome-gui.md) は closed です。実動画ページ確認と visible Chrome UI の最終目視は配布直前に GitHub #1 で人手実施します。README、AGENTS、SKILL、manual-test と実装の整合性は 0011 で再確認済みです。
