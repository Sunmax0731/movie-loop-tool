# Side Panel を開くと再生回数がリセットされる

- 状態: closed
- 優先度: P1
- 種別: bug
- 由来: ローカル調査
- 作成日: 2026-05-11
- 完了日: 2026-05-11
- QCDS: Quality, Satisfaction
- GitHub Issue: #3
- タスク: [Tasks/0003-sidepanel-open-resets-replay-counts.md](../Tasks/0003-sidepanel-open-resets-replay-counts.md)

## 背景

Side Panel 起動時に `saveAndApply()` を呼ぶと、ユーザーが設定を変更していなくても storage 書き込みと `MOVIE_LOOP_APPLY_SETTINGS` が走り、content script 側で完了済み回数がリセットされます。

## 完了条件

- [x] Side Panel 起動時は保存済み設定を表示し、状態取得だけを行う。
- [x] Side Panel を開くだけでは active な `loopsCompleted` がリセットされない。
- [x] 実際の設定変更は active tab へ即時反映される。
- [x] 明示的な `Reset count` は引き続きリプレイ回数をリセットする。
- [x] 起動時にリセットしないことを回帰テストで確認する。
- [x] `npm test` が成功する。

## メモ

- 永続化するデータは `enabled` と `loopCount` に限定する。
