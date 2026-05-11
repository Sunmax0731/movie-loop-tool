# SKILL

このリポジトリ用の作業スキルです。対象は `D:\AI\ChromeExtension\movie-loop-tool` です。

## 開始手順

1. `README.md` を読む。
2. `AGENTS.md` を読む。
3. `SKILL.md` を読む。
4. `TODO.md` と `docs/` を確認する。
5. 実装変更前に `extension/manifest.json` を確認する。

## 実装メモ

- 永続保存する値は `enabled` と `loopCount` だけにする。
- `loopCount` は、最初の通常再生後の追加リプレイ回数として扱う。
- `loopMode`、`targetVideoId`、`segment` は現在ページの runtime 設定として扱う。
- ループ判定、設定正規化、保存キー制限は `src/` に置く。
- Chrome API、DOM 監視、Side Panel、service worker は `extension/` に置く。
- Side Panel の起動だけで storage 書き込みや replay count reset を実行しない。
- `video.play()` が reject された場合は完了回数に加算せず、`lastError` として表示する。
- 同一オリジン iframe と open Shadow DOM は検出対象にする。cross-origin iframe は content script から検査できないため対象外として扱う。
- Windows では Chrome 終了直後に runtime gate 用の一時プロファイルが短時間ロックされる場合がある。cleanup 失敗は製品検証失敗ではなく、後続確認が必要な証跡として扱う。

## 検証

```powershell
npm test
```
