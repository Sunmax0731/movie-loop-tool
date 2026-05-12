# 課題

このディレクトリは、GitHub Issue を使わない場面でも TODO 駆動で作業単位を管理するためのローカルバックログです。

## ファイルルール

- 1 件の課題につき 1 つの Markdown ファイルを作成します。
- ファイル名は `0001-short-title.md` のように、連番と短い slug を使います。
- 状態は `open`、`in-progress`、`blocked`、`closed` のいずれかにします。
- 優先度は `P0` から `P4` を使います。
- フェーズは `00-admin`、`01-requirements`、`02-specification`、`03-design`、`04-implementation`、`05-test`、`06-release` のいずれかを使います。
- 具体作業は `Tasks/*.md` に分け、課題ファイルからリンクします。

## テンプレート

```markdown
# 課題タイトル

- 状態: open
- 優先度: P2
- 種別: feature
- 由来: local
- Phase: 04-implementation
- 作成日: YYYY-MM-DD
- QCDS: Quality, Delivery
- タスク: [Tasks/0001-example.md](../Tasks/0001-example.md)

## 背景

背景と目的。

## 完了条件

- [ ] 完了条件。

## メモ

-
```
