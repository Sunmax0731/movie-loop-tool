# [Feature] Expand video detection for iframe, shadow DOM, and SPA scenarios

- Status: closed
- Priority: P2
- Type: feature
- Source: GitHub Issue #9
- Draft source: codex-cli
- Phase: 04-implementation
- Created: 2026-05-12
- Closed: 2026-05-12
- QCDS: Quality, Satisfaction
- GitHub Issue: [#9](https://github.com/Sunmax0731/movie-loop-tool/issues/9)

## Context

多くの動画サイトでは iframe、Shadow DOM、SPA ナビゲーション内にプレイヤーが配置される。現在の content script は通常の document 直下の video 要素と MutationObserver 変更を主に対象としているため、MV3 で許可される範囲で検出境界を明確化し、必要な検出拡張を行う。権限とプライバシー制約を明示し、不要な広範権限は追加しない。

## Acceptance Criteria

- [x] iframe、同一オリジン frame、クロスオリジン frame、Shadow DOM、SPA ルート変更ごとの対応可否が文書化されている
- [x] manifest の all_frames などの変更要否が判断され、理由が記録されている
- [x] 選定した対応範囲について video 検出処理が実装または調整されている
- [x] 可能な範囲で代表シナリオまたは runtime check の自動テストが追加されている
- [x] 不要な広範権限が追加されていない

## Notes

- `MutationObserver`、open Shadow DOM 再帰走査、同一オリジン iframe 走査を実装済み。
- `all_frames` は追加せず、cross-origin iframe は対象外として docs に明記した。
- 検証: `scanner includes videos inside open shadow roots`、`scanner includes videos inside same-origin iframes`、`npm test`。

## Codex Sessions

- 2026-05-12T11:04:20.316Z `codex-session-20260512110420-xh5g43` - All Work Items; access=danger-full-access; model=gpt-5.5; intelligence=xhigh; [prompt](c:/Users/gkkjh/AppData/Roaming/Code/User/workspaceStorage/451324c4275e7a88f07a03bbde37a90f/sunmax0731.codex-friendly-project-starter/first-prompt-20260512T110420Z.md)
