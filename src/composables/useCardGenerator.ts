import { type Card, type Rank, type Suit, type HandType, bjValue } from '../types'

const SUITS: Suit[] = ['h', 'd', 'c', 's']
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function randomCard(): Card {
  const rank = RANKS[Math.floor(Math.random() * RANKS.length)]!
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)]!
  return { rank, suit }
}

function bjRankValue(rank: Rank): number {
  // For split comparison, J/Q/K/10 are all "10"
  if (['K', 'Q', 'J', '10'].includes(rank)) return 10
  if (rank === 'A') return 11
  return parseInt(rank)
}

export function judgeHandType(cards: Card[]): HandType {
  if (cards.length === 2 && bjRankValue(cards[0]!.rank) === bjRankValue(cards[1]!.rank)) {
    return 'split'
  }
  if (cards.some(c => c.rank === 'A')) {
    return 'soft'
  }
  return 'hard'
}

export function calcHandValue(cards: Card[]): number {
  let total = 0
  let aces = 0
  for (const c of cards) {
    const v = bjValue(c.rank)
    total += v
    if (c.rank === 'A') aces++
  }
  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }
  return total
}

/** For split hands, return the rank value (e.g. "A", "10", "9") */
export function splitKey(cards: Card[]): string {
  const v = bjRankValue(cards[0]!.rank)
  if (cards[0]!.rank === 'A') return 'A'
  return String(v)
}

export function dealerKey(card: Card): string {
  const v = bjRankValue(card.rank)
  if (card.rank === 'A') return 'A'
  return String(v)
}

export interface GeneratedHand {
  playerCards: Card[]
  dealerCard: Card
  handType: HandType
  handValue: number
}

export function useCardGenerator() {
  function generateHand(mode: 'all' | 'hard' | 'soft' | 'split'): GeneratedHand {
    const maxRetries = 100
    for (let i = 0; i < maxRetries; i++) {
      const c1 = randomCard()
      const c2 = randomCard()
      const playerCards = [c1, c2]
      const dealerCard = randomCard()
      const handType = judgeHandType(playerCards)
      const handValue = calcHandValue(playerCards)

      // Skip blackjack (A + 10-value) - not a quiz scenario
      if (handType === 'soft' && handValue === 21) continue

      // Hard hands below 5 don't exist in BS table
      if (handType === 'hard' && handValue < 5) continue

      if (mode === 'all' || mode === handType) {
        return { playerCards, dealerCard, handType, handValue }
      }
    }
    // Fallback (should not happen in practice)
    const c1 = randomCard()
    const c2 = randomCard()
    return {
      playerCards: [c1, c2],
      dealerCard: randomCard(),
      handType: judgeHandType([c1, c2]),
      handValue: calcHandValue([c1, c2]),
    }
  }

  return { generateHand }
}
