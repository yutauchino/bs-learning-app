<script setup lang="ts">
defineProps<{
  title: string
  description: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="mode-card"
    :class="{ disabled }"
    :disabled="disabled"
    @click="emit('click')"
  >
    <div class="mode-title">{{ title }}</div>
    <div class="mode-desc">{{ description }}</div>
    <div v-if="disabled" class="mode-badge">準備中</div>
  </button>
</template>

<style scoped>
.mode-card {
  width: 100%;
  padding: 20px;
  border-radius: var(--radius);
  background: var(--color-surface);
  text-align: left;
  transition: background 0.15s, transform 0.1s;
  border: 1px solid transparent;
  min-height: var(--tap-min);
  position: relative;
}
.mode-card:not(.disabled):active {
  transform: scale(0.98);
  background: var(--color-surface-light);
}
.mode-card.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.mode-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.mode-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
.mode-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--color-text-muted);
  color: var(--color-bg);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
