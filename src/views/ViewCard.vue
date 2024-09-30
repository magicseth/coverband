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
import { useConvexQuery } from '@convex-vue/core'
import { useRoute } from 'vue-router'
import type { Id } from 'convex/_generated/dataModel'

const { id } = useRoute().params
const { data: card } = useConvexQuery(api.cards.getCardById, { id: id as Id<'cards'> })
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
