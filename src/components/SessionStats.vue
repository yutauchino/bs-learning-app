<script setup lang="ts">
import { useSession } from '../composables/useSession'

const { stats, rate } = useSession()
</script>

<template>
  <div class="session-stats">
    <span class="stats-text">
      {{ stats.correct }}/{{ stats.total }}
    </span>
    <span v-if="stats.total > 0" class="rate">({{ rate }}%)</span>
  </div>
</template>

<style scoped>
.session-stats {
  font-family: var(--font-number);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent-light);
}
.rate {
  color: var(--color-text-muted);
  margin-left: 4px;
}
</style>
