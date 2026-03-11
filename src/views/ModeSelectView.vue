<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { GameMode } from '../types'
import ModeCard from '../components/ModeCard.vue'

const router = useRouter()

const modes: { key: GameMode; title: string; description: string; disabled: boolean }[] = [
  { key: 'all',   title: '全モード',           description: 'ハード・ソフト・スプリット全てからランダム出題', disabled: false },
  { key: 'hard',  title: 'ハードハンドのみ',    description: 'ハードハンドに限定して出題',                   disabled: false },
  { key: 'soft',  title: 'ソフトハンドのみ',    description: 'ソフトハンド（A含む）に限定して出題',          disabled: false },
  { key: 'split', title: 'スプリットのみ',      description: 'ペアハンドに限定して出題',                    disabled: false },
]

function selectMode(mode: GameMode) {
  router.push({ name: 'quiz', params: { mode } })
}
</script>

<template>
  <div class="mode-select">
    <div class="header">
      <h1 class="title">BS Trainer</h1>
      <p class="subtitle">ベーシックストラテジー学習</p>
      <div class="divider" />
    </div>
    <div class="modes">
      <ModeCard
        v-for="m in modes"
        :key="m.key"
        :title="m.title"
        :description="m.description"
        :disabled="m.disabled"
        @click="!m.disabled && selectMode(m.key)"
      />
    </div>
    <div class="footer">
      <p>American S17 / Late Surrender</p>
    </div>
  </div>
</template>

<style scoped>
.mode-select {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  overflow-y: auto;
}
.header {
  text-align: center;
  margin-bottom: 32px;
  padding-top: 24px;
}
.title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-shadow: 0 2px 12px rgba(201, 168, 76, 0.3);
}
.subtitle {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-top: 4px;
}
.divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  margin: 16px auto 0;
}
.modes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.footer {
  text-align: center;
  padding-top: 24px;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
</style>
