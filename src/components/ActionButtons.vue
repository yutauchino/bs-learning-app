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
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid rgba(201, 168, 76, 0.3);
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.action-btn:active:not(:disabled) {
  transform: scale(0.95);
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.action-h {
  background: linear-gradient(180deg, #2a5a3a, #1a3a2a);
  border-color: #4a8a5a;
}
.action-s {
  background: linear-gradient(180deg, #5a3a2a, #3a2a1a);
  border-color: #8a6a4a;
}
.action-d {
  background: linear-gradient(180deg, #4a3a5a, #2a2a3a);
  border-color: #7a6a8a;
}
.action-sp {
  background: linear-gradient(180deg, #2a4a4a, #1a2a3a);
  border-color: #4a8a8a;
}
.action-sur {
  background: linear-gradient(180deg, #3a3a3a, #2a2a2a);
  border-color: #6a6a6a;
}
</style>
