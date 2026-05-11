# Requirements

## 目的

Chrome で再生している通常 Web ページ上の動画を、ユーザーが指定した回数だけ自動的に再生し直せるようにする。ループ機能はユーザーがいつでも ON/OFF でき、保存する情報は最小限にする。

## 機能要件

- R1: Side Panel で自動ループを ON/OFF できる。
- R2: 追加ループ回数を `1..99` の整数で設定できる。
- R3: 追加ループ回数は、最初の通常再生が終わった後に追加で再生する回数として扱う。
- R4: 現在ページに存在する `<video>` と、後から追加された `<video>` を対象にする。
- R5: 設定変更は保存し、現在の対象タブへ即時反映する。
- R6: content script が入らない `chrome://` などのページでは対象外として表示する。
- R7: ループ回数は source 変更、metadata 読み込み、リセット操作、設定変更で初期化する。

## 非機能要件

- N1: Manifest V3 で動作する。
- N2: 権限は動画ループに必要な範囲へ限定する。
- N3: 動画 URL、ページ URL、再生履歴、視聴内容を保存しない。
- N4: unit tests、代表シナリオ、platform runtime gate、docs ZIP、mojibake check、QCDS guard を `npm test` で実行できる。
- N5: release checklist と手動テスト手順を docs に残す。
