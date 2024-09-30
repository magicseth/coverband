<template>
  <div class="all-cards">
    <h1>All Cards</h1>
    <div v-if="data?.length === 0">No cards available.</div>
    <OneCard v-for="card in data" :key="card._id" :card="card" />
  </div>
</template>

<script setup lang="ts">
import { useConvexQuery } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import OneCard from './OneCard.vue'

const { data } = useConvexQuery(api.cards.getCards, {})
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
