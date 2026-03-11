import type { DealerGroup } from '../types'

export const dealerGroupLabels: Record<DealerGroup, string> = {
  weak: '弱牌（2〜6）',
  middle: '中間（7〜8）',
  strong: '強牌（9〜A）',
}

export const actionLabels: Record<string, string> = {
  H: 'ヒット',
  S: 'スタンド',
  D: 'ダブルダウン',
  SP: 'スプリット',
  SUR: 'サレンダー',
}

// 将来的にグループ×アクション別の説明テンプレートを追加
// export const feedbackTemplates: Record<DealerGroup, Record<string, string>> = { ... }
