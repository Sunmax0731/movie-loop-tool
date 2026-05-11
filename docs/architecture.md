# アーキテクチャ

## 構成

- `src/loop-policy.mjs`: 設定正規化、ループ判定、保存キー制限などの主要判定ロジック。
- `extension/manifest.json`: Manifest V3 の拡張定義、権限、content script、Side Panel、commands。
- `extension/content/video-loop-controller.js`: DOM 監視、動画状態管理、Chrome runtime message の受信。
- `extension/sidepanel/*`: ユーザー操作 UI と active tab への message 送信。
- `extension/background/service-worker.js`: 初期保存値、toolbar action、keyboard command、badge 更新。
- `tests/`: Node 標準テスト。content script は疑似 DOM / Chrome API で runtime に近い形を検証する。
- `tools/`: 代表シナリオ、runtime gate、docs ZIP、mojibake check、QCDS guard。

## データ境界

永続保存する値は `enabled` と `loopCount` だけです。対象動画、A-B repeat、ループモードは content script の runtime state として扱い、ページを離れたら破棄します。これにより、動画 URL、ページ URL、タイトル、再生履歴、視聴内容を保存しません。

## Message Flow

1. Side Panel は active tab を取得する。
2. 状態確認時は `MOVIE_LOOP_GET_STATUS` を送る。
3. 設定変更時は永続保存キーだけを `chrome.storage.sync` に保存し、runtime 設定全体を `MOVIE_LOOP_APPLY_SETTINGS` で送る。
4. content script は設定を正規化し、必要な場合だけ完了済み回数をリセットする。
5. `Reset count` は `MOVIE_LOOP_RESET_COUNTS` を送る。
6. service worker は toolbar action / keyboard command で保存済み `enabled` を反転し、可能な場合は active tab に反映する。

## 動画検出

- 通常 DOM は `querySelectorAll("video")` で検出する。
- SPA 遷移や後続追加は `MutationObserver` で再走査する。
- open Shadow DOM は `shadowRoot` を再帰的に走査する。
- 同一オリジン iframe は `contentDocument` を走査する。
- cross-origin iframe はブラウザ制約で読み取れないため対象外とする。

## Runtime Gate

`tools/platform-runtime-gate.mjs` は次を確認します。

- `extension/manifest.json` が Manifest V3 である。
- 必要な権限が存在し、`tabs` 権限を使っていない。
- manifest 参照ファイルが存在する。
- content script が `http://*/*` と `https://*/*` に限定されている。
- Chrome または Edge を `--load-extension` 付きで起動できる。
