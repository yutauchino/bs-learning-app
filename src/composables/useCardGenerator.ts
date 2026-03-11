import { type Card, type Rank, type Suit, type HandType, bjValue } from '../types'

const SUITS: Suit[] = ['h', 'd', 'c', 's']
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function randomCard(): Card {
  const rank = RANKS[Math.floor(Math.random() * RANKS.length)]!
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)]!
  return { rank, suit }
}

function randomSuit(): Suit {
  return SUITS[Math.floor(Math.random() * SUITS.length)]!
}

const TEN_RANKS: Rank[] = ['10', 'J', 'Q', 'K']

/** Weighted split key selection (A-9: weight 1, 10: weight 4, total 13) */
const SPLIT_KEYS: { key: string; ranks: Rank[] }[] = [
  { key: 'A', ranks: ['A'] },
  { key: '2', ranks: ['2'] },
  { key: '3', ranks: ['3'] },
  { key: '4', ranks: ['4'] },
  { key: '5', ranks: ['5'] },
  { key: '6', ranks: ['6'] },
  { key: '7', ranks: ['7'] },
  { key: '8', ranks: ['8'] },
  { key: '9', ranks: ['9'] },
  { key: '10', ranks: TEN_RANKS },
]

function generateSplitHand(): GeneratedHand {
  // Weighted selection: each key's weight = number of ranks it covers
  const totalWeight = SPLIT_KEYS.reduce((sum, k) => sum + k.ranks.length, 0) // 13
  const roll = Math.random() * totalWeight
  let cumulative = 0
  let chosen = SPLIT_KEYS[0]!
  for (const entry of SPLIT_KEYS) {
    cumulative += entry.ranks.length
    if (roll < cumulative) {
      chosen = entry
      break
    }
  }

  const rank1 = chosen.ranks[Math.floor(Math.random() * chosen.ranks.length)]!
  const rank2 = chosen.ranks[Math.floor(Math.random() * chosen.ranks.length)]!
  const playerCards: Card[] = [
    { rank: rank1, suit: randomSuit() },
    { rank: rank2, suit: randomSuit() },
  ]
  const dealerCard = randomCard()
  return {
    playerCards,
    dealerCard,
    handType: 'split' as HandType,
    handValue: calcHandValue(playerCards),
  }
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
  function generateHandRandom(mode: 'all' | 'hard' | 'soft' | 'split'): GeneratedHand {
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

  function generateHand(mode: 'all' | 'hard' | 'soft' | 'split'): GeneratedHand {
    if (mode === 'split') {
      return generateSplitHand()
    }
    return generateHandRandom(mode)
  }

  return { generateHand }
}
