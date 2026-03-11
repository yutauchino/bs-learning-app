<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Action, GameMode, HandType, Card } from '../types'
import { useCardGenerator, splitKey, dealerKey } from '../composables/useCardGenerator'
import { useBasicStrategy } from '../composables/useBasicStrategy'
import { useSession } from '../composables/useSession'
import { useBottomSheet } from '../composables/useBottomSheet'
import DealerHand from '../components/DealerHand.vue'
import PlayerHand from '../components/PlayerHand.vue'
import ActionButtons from '../components/ActionButtons.vue'
import FeedbackInline from '../components/FeedbackInline.vue'
import SessionStats from '../components/SessionStats.vue'
import BsChartSheet from '../components/BsChartSheet.vue'

const route = useRoute()
const router = useRouter()

const mode = computed(() => (route.params.mode as GameMode) || 'all')

const { generateHand } = useCardGenerator()
const { getCorrectAction, getValidActions } = useBasicStrategy()
const { record } = useSession()
const { isOpen: chartOpen, toggle: toggleChart, close: closeChart } = useBottomSheet()

// Quiz state
const playerCards = ref<Card[]>([])
const dealerCard = ref<Card>({ rank: '2', suit: 'h' })
const handType = ref<HandType>('hard')
const handValue = ref(0)
const answered = ref(false)
const selectedAction = ref<Action | null>(null)
const correctAction = ref<Action>('H')
const isCorrect = ref(false)

const validActions = computed(() => getValidActions(handType.value))

// Chart highlight info
const chartRow = computed(() => {
  if (handType.value === 'split') return splitKey(playerCards.value)
  return String(handValue.value)
})
const chartCol = computed(() => dealerKey(dealerCard.value))

function deal() {
  const hand = generateHand(mode.value)
  playerCards.value = hand.playerCards
  dealerCard.value = hand.dealerCard
  handType.value = hand.handType
  handValue.value = hand.handValue
  answered.value = false
  selectedAction.value = null
  correctAction.value = getCorrectAction(hand.handType, hand.playerCards, hand.dealerCard)
  isCorrect.value = false
}

function onSelect(action: Action) {
  if (answered.value) return
  answered.value = true
  selectedAction.value = action
  const correct = action === correctAction.value
  isCorrect.value = correct
  record(correct)
}

function goBack() {
  router.push({ name: 'home' })
}

onMounted(() => {
  deal()
})
</script>

<template>
  <div class="quiz">
    <header class="quiz-header">
      <button class="back-btn" @click="goBack">← 戻る</button>
      <SessionStats />
    </header>

    <div class="quiz-body">
      <DealerHand :card="dealerCard" />

      <div class="spacer" />

      <PlayerHand
        :cards="playerCards"
        :hand-type="handType"
        :hand-value="handValue"
      />

      <div class="spacer" />

      <FeedbackInline
        v-if="answered"
        :is-correct="isCorrect"
        :correct-action="correctAction"
        @next="deal"
      />

      <ActionButtons
        v-else
        :actions="validActions"
        :disabled="answered"
        @select="onSelect"
      />
    </div>

    <footer class="quiz-footer">
      <button class="chart-btn" @click="toggleChart">
        BSチャートを見る ▲
      </button>
    </footer>

    <BsChartSheet
      :is-open="chartOpen"
      :current-hand-type="handType"
      :highlight-row="chartRow"
      :highlight-col="chartCol"
      @close="closeChart"
    />
  </div>
</template>

<style scoped>
.quiz {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.back-btn {
  min-height: var(--tap-min);
  padding: 8px 12px;
  background: transparent;
  color: var(--color-primary-light);
  font-size: 0.95rem;
  font-weight: 600;
}
.quiz-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
  overflow-y: auto;
}
.spacer {
  height: 12px;
}
.quiz-footer {
  padding: 8px 16px 20px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.chart-btn {
  width: 100%;
  min-height: var(--tap-min);
  padding: 12px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
}
.chart-btn:active {
  background: var(--color-surface-light);
}
</style>
