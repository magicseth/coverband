<script lang="ts" setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../convex/_generated/api'
import { useConvexQuery, useConvexMutation } from '@convex-vue/core'

const router = useRouter()
const { data: todayCard } = useConvexQuery(api.cards.getTodayCard, {})

const { mutate: setRandomCardForToday } = useConvexMutation(api.cards.setRandomCardForToday)

watch(todayCard, (newVal) => {
  if (newVal) {
    router.replace({ name: 'viewCard', params: { id: newVal._id } })
  } else {
    setRandomCardForToday({})
  }
})
</script>

<template>
  <div v-if="!todayCard">Consulting the tarot...</div>
</template>
