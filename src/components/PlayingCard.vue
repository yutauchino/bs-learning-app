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
</template>

<style scoped>
.card {
  --bg: transparent;
  display: inline-block;
  width: 80px;
  height: 112px;
}
</style>
