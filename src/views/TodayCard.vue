<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../convex/_generated/api'
import { useConvexQuery } from '@convex-vue/core'

const router = useRouter()
const { data: todayCard } = useConvexQuery(api.cards.getRandomCardForToday, {})

watch(todayCard, (newVal) => {
  if (newVal) {
    router.replace({ name: 'ViewCard', params: { id: newVal._id } })
  }
})
</script>

<template>
  <div v-if="!todayCard">Loading...</div>
  Got it {{ todayCard }}
</template>
