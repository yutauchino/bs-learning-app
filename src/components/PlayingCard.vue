<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '../types'
import { cardToCid } from '../types'

const props = defineProps<{
  card?: Card
  faceDown?: boolean
}>()

const cid = computed(() => {
  if (props.faceDown || !props.card) return undefined
  return cardToCid(props.card)
})
</script>

<template>
  <div class="card-wrap">
    <playing-card
      v-if="faceDown"
      rank="0"
      class="card"
    />
    <playing-card
      v-else-if="cid"
      :cid="cid"
      class="card"
    />
  </div>
</template>

<style scoped>
.card-wrap {
  display: inline-block;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
  animation: cardIn 0.15s ease-out;
}
@keyframes cardIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}
.card {
  --bg: transparent;
  display: inline-block;
  width: 80px;
  height: 112px;
}
</style>
