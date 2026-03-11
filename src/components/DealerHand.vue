<script setup lang="ts">
import type { Card } from '../types'
import PlayingCard from './PlayingCard.vue'

defineProps<{
  card: Card
}>()
</script>

<template>
  <div class="dealer-hand">
    <div class="label">ディーラー</div>
    <div class="cards">
      <PlayingCard :card="card" />
      <PlayingCard face-down />
    </div>
  </div>
</template>

<style scoped>
.dealer-hand {
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
</style>
