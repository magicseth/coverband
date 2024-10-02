<template>
  <div v-if="card" class="one-card">
    <h2>{{ card.title }}</h2>
    <p>{{ card.description }}</p>
    <iframe
      v-if="card.youtubeId"
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${card.youtubeId}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { useConvexQuery } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'

const props = defineProps<{
  cardId: Id<'cards'>
}>()

const { data: card } = useConvexQuery(api.cards.getCardById, { id: props.cardId })
</script>

<style scoped>
.one-card {
  border: 1px solid beige;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #333;
}

p {
  color: #666;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-top: 16px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
