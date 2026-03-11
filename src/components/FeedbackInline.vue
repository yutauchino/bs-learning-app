<script setup lang="ts">
import type { Action, Card, DealerGroup } from '../types'
import { bjValue } from '../types'
import { actionLabels, getFeedbackText } from '../data/feedbackTemplates'
import { getDealerGroup } from '../composables/useBasicStrategy'
import { computed } from 'vue'

const props = defineProps<{
  isCorrect: boolean
  correctAction: Action
  dealerCard: Card
  handValue: number
}>()

const emit = defineEmits<{
  next: []
}>()

const dealerGroup = computed<DealerGroup>(() => getDealerGroup(props.dealerCard))
const dealerDisplay = computed(() => {
  const v = bjValue(props.dealerCard.rank)
  return props.dealerCard.rank === 'A' ? 'A' : String(v)
})

const explanation = computed(() =>
  getFeedbackText(dealerGroup.value, props.correctAction, dealerDisplay.value, props.handValue)
)
</script>

<template>
  <div class="feedback" :class="isCorrect ? 'correct' : 'incorrect'">
    <div class="result-icon">{{ isCorrect ? '⭕' : '❌' }}</div>
    <div class="result-text">
      <span class="judgment">{{ isCorrect ? '正解！' : '不正解' }}</span>
      <span class="answer">正解: {{ actionLabels[correctAction] || correctAction }}</span>
    </div>
    <p v-if="explanation" class="explanation">{{ explanation }}</p>
    <button class="next-btn" @click="emit('next')">次の問題へ</button>
  </div>
</template>

<style scoped>
.feedback {
  margin: 0 16px;
  padding: 16px;
  border-radius: var(--radius);
  text-align: center;
  animation: slideDown 0.2s ease-out;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
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
  margin-bottom: 8px;
}
.judgment {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
}
.correct .judgment { color: var(--color-success); }
.incorrect .judgment { color: var(--color-error); }
.answer {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}
.explanation {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text);
  margin-bottom: 12px;
  text-align: left;
  padding: 0 4px;
}
.next-btn {
  min-height: var(--tap-min);
  padding: 12px 32px;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: var(--color-bg);
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--font-heading);
  box-shadow: 0 2px 8px rgba(201, 168, 76, 0.3);
}
.next-btn:active {
  transform: scale(0.95);
}
</style>
