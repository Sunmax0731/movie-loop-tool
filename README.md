# Movie Loop Tool

`movie-loop-tool` は、Chrome で開いている通常の Web ページ上の動画を自動リピートする Manifest V3 拡張です。Side Panel から自動ループの ON/OFF、追加リプレイ回数、ループモード、対象動画、A-B 区間を操作できます。

## 機能

- Side Panel で自動ループを ON/OFF できます。
- 追加リプレイ回数を `1` から `99` まで指定できます。
- `Use replay count`、`Infinite loop`、`Stop after current run` のループモードを選べます。
- 複数動画ページでは `All detected videos` または検出済み動画の 1 つを対象に固定できます。
- A-B repeat で学習・確認用の区間リピートを設定できます。
- ページ上に最初から存在する `<video>`、後から追加された `<video>`、同一オリジン iframe 内、open Shadow DOM 内の動画を検出します。
- 既に開いていた `https://video.twimg.com/...mp4` 形式の直動画ページなど、content script が未接続の通常 Web ページには Side Panel / toolbar 操作時に content script を遅延注入してから設定を反映します。
- Toolbar action または `Alt+Shift+L` で、Side Panel を開かずに自動ループを切り替えられます。
- 永続保存する値は `enabled` と `loopCount` だけです。対象動画、A-B 区間、ループモードは現在ページの runtime 設定として扱い、URL、動画 URL、タイトル、再生履歴、視聴内容は保存しません。

## ローカルテスト用インストール

1. PowerShell で `D:\AI\ChromeExtension\movie-loop-tool` に移動します。
2. `npm test` を実行します。
3. Chrome で `chrome://extensions` を開きます。
4. Developer mode を有効にします。
5. `Load unpacked` を選びます。
6. `D:\AI\ChromeExtension\movie-loop-tool\extension` を選びます。
7. `http://` または `https://` の動画ページを開き、拡張機能の Side Panel または toolbar action から操作します。

## 操作

1. `Auto loop` を ON にします。
2. `Additional replays` に、最初の通常再生後に追加したいリプレイ回数を設定します。
3. 必要に応じて `Loop mode`、`Target video`、`A-B repeat` を設定します。
4. 動画が `ended` に到達すると、設定に従って `currentTime` を戻し、`play()` を呼びます。
5. `video.play()` が失敗した場合、完了リプレイ数には加算せず、Side Panel に最後の失敗理由を表示します。

`chrome://extensions` など Chrome 内部ページでは content script が動作できないため、この拡張機能は対象外として扱います。

## 検証

```powershell
npm test
```

`npm test` は単体テスト、代表シナリオ、ChromeExtension runtime gate、docs ZIP 生成、文字化け検査、QCDS guard を実行します。

## ドキュメント

- `docs/requirements.md`
- `docs/specification.md`
- `docs/architecture.md`
- `docs/design.md`
- `docs/manual-test.md`
- `docs/qcds-evaluation.md`
- `docs/release-checklist.md`
