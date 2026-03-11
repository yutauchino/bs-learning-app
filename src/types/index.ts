export type Suit = 'h' | 'd' | 'c' | 's'
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export interface Card {
  rank: Rank
  suit: Suit
}

export type HandType = 'hard' | 'soft' | 'split'

export type Action = 'H' | 'S' | 'D' | 'SP' | 'SUR'

export type BsAction =
  | 'H' | 'S' | 'D' | 'Dh' | 'Ds' | 'P'
  | 'Rh' | 'Rs' | 'Rp'

export type GameMode = 'all' | 'hard' | 'soft' | 'split'

export type DealerGroup = 'weak' | 'middle' | 'strong'

export interface SessionStats {
  correct: number
  total: number
}

export interface QuizState {
  playerCards: Card[]
  dealerCard: Card
  handType: HandType
  handValue: number
  answered: boolean
  selectedAction: Action | null
  correctAction: Action
  isCorrect: boolean | null
}

export function cardToCid(card: Card): string {
  return `${card.rank}${card.suit}`
}

export function bjValue(rank: Rank): number {
  if (rank === 'A') return 11
  if (['K', 'Q', 'J', '10'].includes(rank)) return 10
  return parseInt(rank)
}
