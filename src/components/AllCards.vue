<template>
  <div class="all-cards">
    <h1>All Cards</h1>
    <div v-if="data?.length === 0">No cards available.</div>
    <OneCard v-for="card in data" :key="card._id" :card="card">
      <p v-if="card.lastDayUsed">
        Last used: {{ card.lastDayUsed }}
        <button @click="recycleCardMutation.mutate({ id: card._id })">Recycle</button>
      </p>

      <router-link :to="{ name: 'viewCard', params: { id: card._id } }" class="view-card-link">
        View Card Details
      </router-link>
    </OneCard>
  </div>
</template>

<script setup lang="ts">
import { useConvexMutation, useConvexQuery } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import OneCard from './OneCard.vue'

const { data } = useConvexQuery(api.cards.getCards, {})
const recycleCardMutation = useConvexMutation(api.cards.recycleCard)
</script>

<style scoped>
.all-cards {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>
