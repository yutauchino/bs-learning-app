import type { Action, DealerGroup } from '../types'

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

/**
 * ディーラーグループ × アクション の説明テンプレート (15パターン)
 * {dealer} = ディーラーのアップカード値
 * {hand} = プレイヤーのハンド合計値
 */
const feedbackTemplates: Record<DealerGroup, Record<Action, string>> = {
  weak: {
    H: 'ディーラーの「{dealer}」はバーストしやすい弱い手ですが、あなたの「{hand}」はまだ弱いため、もう1枚引いて手を強くする必要があります。',
    S: 'ディーラーの「{dealer}」はバーストしやすい弱い手です。あなたの「{hand}」は十分な強さがあるので、無理せず待ってディーラーのバーストを期待するのが最善です。',
    D: 'ディーラーの「{dealer}」はバーストしやすい弱い手です。あなたの「{hand}」はもう1枚で強い手になる可能性が高く、ここで賭け金を2倍にすることで期待できる利益が最大になります。',
    SP: 'ディーラーの「{dealer}」はバーストしやすい弱い手です。ペアをスプリットして2つのハンドに分けることで、有利な状況を2回活用できます。',
    SUR: 'ディーラーの「{dealer}」は弱い手ですが、あなたの手は非常に不利なため、賭け金の半分を取り戻すサレンダーが損失を最小化します。',
  },
  middle: {
    H: 'ディーラーの「{dealer}」は手が読みにくい中間の手です。あなたの「{hand}」ではまだ勝てる可能性が低いため、もう1枚引いて手を強くしましょう。',
    S: 'ディーラーの「{dealer}」は中間の手です。あなたの「{hand}」は一定の強さがあり、ヒットしてバーストするリスクの方が大きいため、ここで止めるのが最善です。',
    D: 'ディーラーの「{dealer}」は中間の手ですが、あなたの「{hand}」は有利な状況です。ダブルダウンで攻めることで期待値を最大化できます。',
    SP: 'ディーラーの「{dealer}」は中間の手です。ペアをスプリットして2つのハンドで戦うことで、より良い結果を期待できます。',
    SUR: 'ディーラーの「{dealer}」は中間の手ですが、あなたの手では勝つのが難しく、サレンダーで損失を抑えるのが合理的です。',
  },
  strong: {
    H: 'ディーラーの「{dealer}」は強い手を作りやすいカードです。あなたの「{hand}」ではこのまま勝てないため、リスクを取ってでもヒットして手を改善する必要があります。',
    S: 'ディーラーの「{dealer}」は強い手ですが、あなたの「{hand}」も十分に強く、ヒットしてバーストするリスクの方が高いため、ここで止めるのが最善です。',
    D: 'ディーラーの「{dealer}」は強い手ですが、あなたの「{hand}」は非常に有利な状況です。ここでダブルダウンすることで期待できる利益が大きくなります。',
    SP: 'ディーラーの「{dealer}」は強い手ですが、ペアをスプリットすることで不利な1ハンドを有利な2ハンドに変えられる可能性があります。',
    SUR: 'ディーラーの「{dealer}」は強い手を持ちやすく、あなたの「{hand}」では非常に不利です。ここでサレンダーして賭け金の半分を守るのが損失を最小化する最善策です。',
  },
}

export function getFeedbackText(
  dealerGroup: DealerGroup,
  correctAction: Action,
  dealerValue: string,
  handValue: number,
): string {
  const template = feedbackTemplates[dealerGroup]?.[correctAction]
  if (!template) return ''
  return template
    .replace(/\{dealer\}/g, dealerValue)
    .replace(/\{hand\}/g, String(handValue))
}
