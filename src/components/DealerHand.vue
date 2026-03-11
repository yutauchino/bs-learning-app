<script setup lang="ts">
import type { Card } from '../types'
import PlayingCard from './PlayingCard.vue'

defineProps<{
  card: Card
}>()
</script>

<template>
  <div class="dealer-hand">
    <div class="label">Dealer</div>
    <div class="card-area">
      <div class="cards">
        <PlayingCard :card="card" />
        <PlayingCard face-down />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dealer-hand {
  text-align: center;
}
.label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.card-area {
  display: inline-block;
  padding: 12px 20px;
  border-radius: var(--radius);
  background: rgba(26, 46, 26, 0.6);
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
}
.cards {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
