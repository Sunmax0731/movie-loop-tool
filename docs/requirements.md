# 要件

## 目的

Chrome で開いている通常の Web ページ上の動画を、ユーザーが指定した条件で自動的にリピート再生できるようにする。動画視聴履歴や URL を保存せず、現在タブで必要な制御だけを行う。

## 機能要件

- R1: Side Panel で自動ループを ON/OFF できる。
- R2: 追加リプレイ回数を `1..99` の整数で設定できる。
- R3: 追加リプレイ回数は、最初の通常再生が終わった後に追加で再生する回数として扱う。
- R4: `Use replay count`、`Infinite loop`、`Stop after current run` のループモードを選べる。
- R5: 複数動画ページでは、すべての動画または検出済み動画の 1 つを対象に固定できる。
- R6: 学習・確認用途として A-B 区間リピートを設定できる。
- R7: 現在ページに存在する `<video>` と後から追加された `<video>` を対象にする。
- R8: 同一オリジン iframe と open Shadow DOM 内の動画を検出対象にする。cross-origin iframe は対象外として扱う。
- R9: 設定変更は現在の対象タブへ即時反映する。
- R10: Side Panel を開いただけでは保存値の再適用やリプレイ回数リセットを実行しない。
- R11: `video.play()` が失敗したリプレイは完了回数に加算せず、最後の失敗理由を UI に表示する。
- R12: Toolbar action または `Alt+Shift+L` で、Side Panel を開かずに自動ループを切り替えられる。
- R13: content script が入らない `chrome://` などのページでは対象外として表示する。

## 非機能要件

- N1: Manifest V3 で動作する。
- N2: 権限は動画ループに必要な範囲へ限定する。
- N3: 永続保存する値は `enabled` と `loopCount` のみにする。
- N4: ページ URL、動画 URL、タイトル、再生履歴、視聴内容を保存しない。
- N5: 単体テスト、代表シナリオ、platform runtime gate、docs ZIP、mojibake 検査、QCDS guard を `npm test` で実行できる。
- N6: リリースチェックリスト、手動テスト手順、QCDS 評価を `docs/` に残す。
