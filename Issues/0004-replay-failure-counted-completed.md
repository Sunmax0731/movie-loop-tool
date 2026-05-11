# 失敗した動画リプレイ試行が完了として数えられる

- 状態: closed
- 優先度: P1
- 種別: bug
- 由来: ローカル調査
- 作成日: 2026-05-11
- 完了日: 2026-05-11
- QCDS: Quality, Satisfaction
- GitHub Issue: #4
- タスク: [Tasks/0004-replay-failure-counted-completed.md](../Tasks/0004-replay-failure-counted-completed.md)

## 背景

`video.play()` が reject された場合でも完了済み回数を先に加算すると、要求リプレイ回数だけが消費され、ユーザーは失敗理由を確認できません。

## 完了条件

- [x] reject された `video.play()` は要求リプレイ回数を消費しない。
- [x] 繰り返し reject されても無限リトライにならない。
- [x] `lastError` がある場合、Side Panel に失敗メッセージを表示する。
- [x] reject された `play()` の挙動をテストで確認する。
- [x] `npm test` が成功する。

## メモ

- 完了回数は `play()` 成功後にだけ加算する。
