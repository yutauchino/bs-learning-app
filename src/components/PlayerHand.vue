<script setup lang="ts">
import type { Card, HandType } from '../types'
import PlayingCard from './PlayingCard.vue'

const props = defineProps<{
  cards: Card[]
  handType: HandType
  handValue: number
}>()

const handTypeLabels: Record<HandType, string> = {
  hard: 'Hard',
  soft: 'Soft',
  split: 'Split',
}
</script>

<template>
  <div class="player-hand">
    <div class="label">プレイヤー</div>
    <div class="cards">
      <PlayingCard v-for="(card, i) in cards" :key="i" :card="card" />
    </div>
    <div class="hand-info">
      {{ handTypeLabels[handType] }} {{ handValue }}
    </div>
  </div>
</template>

<style scoped>
.player-hand {
  text-align: center;
}
.label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}
.cards {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.hand-info {
  margin-top: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary-light);
}
</style>
