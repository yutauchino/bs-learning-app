<script setup lang="ts">
import type { Action } from '../types'
import { actionLabels } from '../data/feedbackTemplates'

defineProps<{
  actions: Action[]
  disabled: boolean
}>()

const emit = defineEmits<{
  select: [action: Action]
}>()
</script>

<template>
  <div class="action-buttons">
    <button
      v-for="action in actions"
      :key="action"
      class="action-btn"
      :class="`action-${action.toLowerCase()}`"
      :disabled="disabled"
      @click="emit('select', action)"
    >
      {{ actionLabels[action] || action }}
    </button>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0 16px;
}
.action-btn {
  min-width: var(--tap-min);
  min-height: var(--tap-min);
  padding: 12px 20px;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: var(--color-surface-light);
  transition: background 0.15s, transform 0.1s;
}
.action-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.action-h   { background: #3498db; }
.action-s   { background: #e67e22; }
.action-d   { background: #9b59b6; }
.action-sp  { background: #27ae60; }
.action-sur { background: #7f8c8d; }
</style>
