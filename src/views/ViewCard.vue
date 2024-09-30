<template>
  <div class="view-card">
    <h1>{{ card?.title }}</h1>
    <OneCard v-if="card" :card="card" />
    <p v-else>Card not found</p>
  </div>
</template>

<script lang="ts" setup>
import OneCard from '@/components/OneCard.vue'
import { api } from '../../convex/_generated/api'
import { useConvexAction, useConvexQuery } from '@convex-vue/core'
import { useRoute } from 'vue-router'
import type { Id } from 'convex/_generated/dataModel'
import { onMounted } from 'vue'

const { id } = useRoute().params
const { data: card } = useConvexQuery(api.cards.getCardById, { id: id as Id<'cards'> })
const { mutate: sendPing } = useConvexAction(api.cardsnode.sendPing)

onMounted(() => {
  sendPing({ message: 'tarot card played ' + card?.value?.title })
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
