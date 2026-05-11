# Architecture

## 構成

- `src/loop-policy.mjs`: 設定正規化、追加リプレイ可否、保存対象の純粋ロジック。
- `extension/manifest.json`: MV3 manifest、権限、background、content script、side panel 定義。
- `extension/background/service-worker.js`: 初期設定と action クリック時の side panel 起動。
- `extension/content/video-loop-controller.js`: `<video>` 検出、DOM 監視、`ended` event、再生制御、side panel との messaging。
- `extension/sidepanel/`: 設定 UI、`chrome.storage.sync`、active tab messaging。
- `tests/`: 主要判定と manifest 契約の unit tests。
- `tools/`: 代表シナリオ、runtime gate、docs ZIP、mojibake、QCDS 検証。

## 責務境界

主要な判断は `src/loop-policy.mjs` でテスト可能な形に置きます。Chrome API、DOM、storage、messaging、再生操作は `extension/` に閉じ、ブラウザ実行環境の制約を外へ漏らさない構成にします。

## 権限

- `activeTab`: 現在タブへ side panel から message を送るため。
- `storage`: `enabled` と `loopCount` を保存するため。
- `sidePanel`: Chrome side panel を使うため。
- `http://*/*`, `https://*/*`: 通常 Web ページの video 要素へ content script を入れるため。

`tabs` permission は使いません。

## プライバシー境界

保存するデータは `enabled` と `loopCount` のみです。ページ URL、動画 URL、タイトル、視聴履歴、ページ内容、動画内容は保存しません。runtime gate と unit tests でも保存対象のキーを確認します。
