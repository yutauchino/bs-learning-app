import { ref, computed, watch } from 'vue'
import type { SessionStats } from '../types'

const STORAGE_KEY = 'bs-learning-session'

function loadStats(): SessionStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { correct: parsed.correct ?? 0, total: parsed.total ?? 0 }
    }
  } catch {
    // ignore
  }
  return { correct: 0, total: 0 }
}

const stats = ref<SessionStats>(loadStats())

export function useSession() {
  const rate = computed(() => {
    if (stats.value.total === 0) return 0
    return Math.round((stats.value.correct / stats.value.total) * 100)
  })

  function record(isCorrect: boolean) {
    stats.value = {
      correct: stats.value.correct + (isCorrect ? 1 : 0),
      total: stats.value.total + 1,
    }
  }

  function reset() {
    stats.value = { correct: 0, total: 0 }
  }

  watch(stats, (v) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  }, { deep: true })

  return { stats, rate, record, reset }
}
