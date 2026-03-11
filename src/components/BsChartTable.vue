<script setup lang="ts">
import { computed } from 'vue'
import type { HandType } from '../types'
import bsData from '../data/basicStrategy.json'

const props = defineProps<{
  tableType: HandType
  highlightRow?: string
  highlightCol?: string
}>()

const dealerColumns = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A']

const tableData = computed(() => {
  const raw = bsData[props.tableType] as Record<string, Record<string, string>>
  return raw
})

const rowKeys = computed(() => {
  return Object.keys(tableData.value)
})

const rowLabel = computed(() => {
  if (props.tableType === 'split') return 'ペア'
  if (props.tableType === 'soft') return 'ソフト'
  return 'ハード'
})

function cellClass(action: string): string {
  switch (action) {
    case 'H': return 'cell-h'
    case 'S': return 'cell-s'
    case 'D':
    case 'Dh':
    case 'Ds': return 'cell-d'
    case 'P': return 'cell-sp'
    case 'Rh':
    case 'Rs':
    case 'Rp': return 'cell-sur'
    default: return ''
  }
}

function isHighlighted(row: string, col: string): boolean {
  return row === props.highlightRow && col === props.highlightCol
}
</script>

<template>
  <div class="chart-table-wrap">
    <table class="chart-table">
      <thead>
        <tr>
          <th class="corner">{{ rowLabel }}</th>
          <th v-for="col in dealerColumns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rowKeys" :key="row">
          <th>{{ row }}</th>
          <td
            v-for="col in dealerColumns"
            :key="col"
            :class="[
              cellClass(tableData[row]?.[col] || ''),
              { highlight: isHighlighted(row, col) }
            ]"
          >
            {{ tableData[row]?.[col] || '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.chart-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.chart-table {
  border-collapse: collapse;
  width: 100%;
  font-family: var(--font-number);
  font-size: 0.7rem;
  text-align: center;
}
.chart-table th,
.chart-table td {
  padding: 4px 2px;
  border: 1px solid rgba(201, 168, 76, 0.12);
  min-width: 24px;
}
.chart-table thead th {
  background: var(--color-surface-light);
  font-weight: 700;
  color: var(--color-accent);
  position: sticky;
  top: 0;
}
.chart-table tbody th {
  background: var(--color-surface-light);
  font-weight: 700;
  color: var(--color-accent);
  position: sticky;
  left: 0;
  z-index: 1;
}
.corner {
  position: sticky;
  left: 0;
  z-index: 2;
  font-family: var(--font-body);
  font-size: 0.65rem;
}
.cell-h   { background: var(--bs-hit);      color: #fff; }
.cell-s   { background: var(--bs-stand);     color: #fff; }
.cell-d   { background: var(--bs-double);    color: #fff; }
.cell-sp  { background: var(--bs-split);     color: #fff; }
.cell-sur { background: var(--bs-surrender); color: #fff; }

.highlight {
  outline: 3px solid var(--color-accent);
  outline-offset: -2px;
  animation: pulse 1.2s ease-in-out infinite;
  z-index: 3;
  position: relative;
}

@keyframes pulse {
  0%, 100% { outline-color: var(--color-accent); }
  50% { outline-color: rgba(201, 168, 76, 0.4); }
}
</style>
