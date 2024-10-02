<template>
  <div class="view-card">
    <h1>{{ card?.title }}</h1>
    <OneCard :cardId="id" />
  </div>
</template>

<script lang="ts" setup>
import OneCard from '@/components/OneCard.vue'
import { api } from '../../convex/_generated/api'
import { useConvexAction, useConvexQuery } from '@convex-vue/core'
import { useRoute } from 'vue-router'
import type { Id } from 'convex/_generated/dataModel'
import { watch } from 'vue'

const { id } = useRoute().params as { id: Id<'cards'> }
const { data: card } = useConvexQuery(api.cards.getCardById, { id: id as Id<'cards'> })
const { mutate: sendPing } = useConvexAction(api.cardsnode.sendPing)

import { ref, onMounted } from 'vue'

const colors = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Orange',
  'Pink',
  'Brown',
  'Gray',
  'Black',
  'White',
  'Teal',
  'Maroon',
  'Navy',
  'Olive',
  'Cyan',
  'Magenta',
  'Lavender',
  'Turquoise',
  'Gold'
]

const animals = [
  'Lion',
  'Tiger',
  'Bear',
  'Wolf',
  'Fox',
  'Eagle',
  'Hawk',
  'Dolphin',
  'Shark',
  'Elephant',
  'Giraffe',
  'Penguin',
  'Koala',
  'Kangaroo',
  'Octopus',
  'Panther',
  'Cheetah',
  'Gorilla',
  'Owl',
  'Raccoon'
]

const codename = ref('')

onMounted(() => {
  let storedCodename = localStorage.getItem('userCodename')
  if (!storedCodename) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
    storedCodename = `${randomColor} ${randomAnimal}`
    localStorage.setItem('userCodename', storedCodename)
  }
  codename.value = storedCodename
})

watch(card, () => {
  sendPing({
    message: codename.value + ' played ' + card?.value?.title + ' url ' + window.location.href
  })
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
