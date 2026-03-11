<script setup lang="ts">
import { ref, watch } from 'vue'
import type { HandType } from '../types'
import BsChartTable from './BsChartTable.vue'

const props = defineProps<{
  isOpen: boolean
  currentHandType: HandType
  highlightRow?: string
  highlightCol?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const activeTab = ref<HandType>(props.currentHandType)

watch(() => props.currentHandType, (v) => {
  activeTab.value = v
})

const tabs: { key: HandType; label: string }[] = [
  { key: 'hard', label: 'Hard' },
  { key: 'soft', label: 'Soft' },
  { key: 'split', label: 'Split' },
]

// Swipe down to close
let startY = 0
function onTouchStart(e: TouchEvent) {
  startY = e.touches[0]?.clientY ?? 0
}
function onTouchEnd(e: TouchEvent) {
  const diff = (e.changedTouches[0]?.clientY ?? 0) - startY
  if (diff > 80) {
    emit('close')
  }
}
</script>

<template>
  <Transition name="sheet">
    <div
      v-if="isOpen"
      class="sheet-overlay"
      @click.self="emit('close')"
    >
      <div
        class="sheet"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div class="sheet-handle" />

        <div class="sheet-header">
          <h3>BSチャート</h3>
          <button class="close-btn" @click="emit('close')">閉じる</button>
        </div>

        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="sheet-body">
          <BsChartTable
            :table-type="activeTab"
            :highlight-row="activeTab === currentHandType ? highlightRow : undefined"
            :highlight-col="activeTab === currentHandType ? highlightCol : undefined"
          />
        </div>

        <div class="legend">
          <span class="legend-item"><span class="swatch cell-h">H</span> Hit</span>
          <span class="legend-item"><span class="swatch cell-s">S</span> Stand</span>
          <span class="legend-item"><span class="swatch cell-d">D</span> Double</span>
          <span class="legend-item"><span class="swatch cell-sp">SP</span> Split</span>
          <span class="legend-item"><span class="swatch cell-sur">SUR</span> Surrender</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}
.sheet {
  width: 100%;
  max-height: 85vh;
  background: var(--color-surface);
  border-radius: var(--radius) var(--radius) 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--color-text-muted);
  border-radius: 2px;
  margin: 8px auto 4px;
}
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}
.sheet-header h3 {
  font-size: 1rem;
}
.close-btn {
  min-height: var(--tap-min);
  padding: 8px 16px;
  background: transparent;
  color: var(--color-primary-light);
  font-size: 0.9rem;
  font-weight: 600;
}
.tabs {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0 16px;
}
.tab {
  flex: 1;
  padding: 10px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  border-bottom: 2px solid transparent;
}
.tab.active {
  color: var(--color-primary-light);
  border-bottom-color: var(--color-primary);
}
.sheet-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 8px 12px;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.75rem;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 3px;
}
.swatch {
  display: inline-block;
  width: 22px;
  height: 16px;
  border-radius: 3px;
  text-align: center;
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 16px;
  color: #333;
}
.cell-h   { background: var(--bs-hit); }
.cell-s   { background: var(--bs-stand); }
.cell-d   { background: var(--bs-double); }
.cell-sp  { background: var(--bs-split); }
.cell-sur { background: var(--bs-surrender); }

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.25s;
}
.sheet-enter-active .sheet,
.sheet-leave-active .sheet {
  transition: transform 0.25s ease-out;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(100%);
}
</style>
