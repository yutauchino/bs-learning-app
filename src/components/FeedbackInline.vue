<script setup lang="ts">
import type { Action } from '../types'
import { actionLabels } from '../data/feedbackTemplates'

defineProps<{
  isCorrect: boolean
  correctAction: Action
}>()

const emit = defineEmits<{
  next: []
}>()
</script>

<template>
  <div class="feedback" :class="isCorrect ? 'correct' : 'incorrect'">
    <div class="result-icon">{{ isCorrect ? '⭕' : '❌' }}</div>
    <div class="result-text">
      <span class="judgment">{{ isCorrect ? '正解！' : '不正解' }}</span>
      <span class="answer">正解: {{ actionLabels[correctAction] || correctAction }}</span>
    </div>
    <button class="next-btn" @click="emit('next')">次の問題へ</button>
  </div>
</template>

<style scoped>
.feedback {
  margin: 0 16px;
  padding: 16px;
  border-radius: var(--radius);
  text-align: center;
}
.correct {
  background: var(--color-correct-bg);
  border: 1px solid var(--color-success);
}
.incorrect {
  background: var(--color-incorrect-bg);
  border: 1px solid var(--color-error);
}
.result-icon {
  font-size: 2rem;
  margin-bottom: 4px;
}
.result-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
}
.judgment {
  font-size: 1.2rem;
  font-weight: 700;
}
.correct .judgment { color: var(--color-success); }
.incorrect .judgment { color: var(--color-error); }
.answer {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}
.next-btn {
  min-height: var(--tap-min);
  padding: 12px 32px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
}
.next-btn:active {
  transform: scale(0.95);
}
</style>
