import type { Action, BsAction, HandType, DealerGroup, Card } from '../types'
import bsData from '../data/basicStrategy.json'
import { dealerKey, splitKey, calcHandValue } from './useCardGenerator'
import { bjValue } from '../types'

type BsTable = Record<string, Record<string, BsAction>>

const hard = bsData.hard as BsTable
const soft = bsData.soft as BsTable
const split = bsData.split as BsTable

export function getDealerGroup(card: Card): DealerGroup {
  const v = bjValue(card.rank)
  if (v >= 2 && v <= 6) return 'weak'
  if (v >= 7 && v <= 8) return 'middle'
  return 'strong' // 9, 10, A
}

/**
 * Look up the raw BS action from the JSON table
 */
function lookupBsAction(
  handType: HandType,
  playerCards: Card[],
  dealerCard: Card,
): BsAction | null {
  const dk = dealerKey(dealerCard)

  if (handType === 'split') {
    const sk = splitKey(playerCards)
    return split[sk]?.[dk] ?? null
  }
  if (handType === 'soft') {
    const hv = String(calcHandValue(playerCards))
    return soft[hv]?.[dk] ?? null
  }
  // hard
  const hv = String(calcHandValue(playerCards))
  return hard[hv]?.[dk] ?? null
}

/**
 * Convert a composite BS action to the simple user-facing action
 * Dh → D (Double, otherwise Hit) → user should pick D
 * Ds → D (Double, otherwise Stand) → user should pick D
 * Rh → SUR (Surrender, otherwise Hit) → user should pick SUR
 * Rs → SUR (Surrender, otherwise Stand) → user should pick SUR
 * Rp → SUR (Surrender, otherwise Split) → user should pick SUR
 * P → SP
 */
export function resolveAction(bsAction: BsAction): Action {
  switch (bsAction) {
    case 'H': return 'H'
    case 'S': return 'S'
    case 'D':
    case 'Dh':
    case 'Ds': return 'D'
    case 'P': return 'SP'
    case 'Rh':
    case 'Rs':
    case 'Rp': return 'SUR'
  }
}

/**
 * Get the list of valid actions for the current hand
 */
export function getValidActions(handType: HandType): Action[] {
  const base: Action[] = ['H', 'S', 'D', 'SUR']
  if (handType === 'split') {
    return ['H', 'S', 'D', 'SP', 'SUR']
  }
  return base
}

export function useBasicStrategy() {
  function getCorrectAction(
    handType: HandType,
    playerCards: Card[],
    dealerCard: Card,
  ): Action {
    const bsAction = lookupBsAction(handType, playerCards, dealerCard)
    if (!bsAction) {
      // Fallback: shouldn't happen with complete BS data
      return 'H'
    }
    return resolveAction(bsAction)
  }

  function getRawBsAction(
    handType: HandType,
    playerCards: Card[],
    dealerCard: Card,
  ): BsAction | null {
    return lookupBsAction(handType, playerCards, dealerCard)
  }

  return { getCorrectAction, getRawBsAction, getValidActions, getDealerGroup }
}
