<template>
  <div class="view-card">
    <h1>{{ card?.title }}</h1>
    <OneCard :cardId="id" />
  </div>
</template>

<script lang="ts" setup>
import OneCard from '@/components/OneCard.vue'
import { api } from '../../convex/_generated/api'
import { useConvexQuery } from '@convex-vue/core'
import { useRoute } from 'vue-router'
import type { Id } from 'convex/_generated/dataModel'
import { watch } from 'vue'
import { usePing } from '@/usePing'

const { id } = useRoute().params as { id: Id<'cards'> }
const { data: card } = useConvexQuery(api.cards.getCardById, { id: id as Id<'cards'> })
const { sendPing } = usePing()

watch(card, (newCard, oldCard) => {
  if (!oldCard?._id && newCard?._id) {
    sendPing(' loaded ' + newCard?.title + ' url ' + window.location.href)
  }
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
