<template>
  <div class="one-card">
    <h2>{{ card.title }}</h2>
    <p>{{ card.description }}</p>
    <p v-if="card.lastDayUsed && $route.name !== 'viewCard'">Last used: {{ card.lastDayUsed }}</p>
    <div v-if="card.youtubeId" class="video-container">
      <iframe
        :src="'https://www.youtube.com/embed/' + card.youtubeId"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Card {
  title: string
  description: string
  youtubeId?: string
  _id: string
  lastDayUsed?: string
}

const props = defineProps<{
  card: Card
}>()
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
