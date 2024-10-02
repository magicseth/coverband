<template>
  <div v-if="card" class="one-card">
    <div v-if="!isEditing">
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
      <button v-if="editable" @click="startEditing">Edit</button>
    </div>
    <div v-else>
      <input v-model="editedCard.title" placeholder="Title" />
      <textarea v-model="editedCard.description" placeholder="Description"></textarea>
      <input v-model="editedCard.youtubeId" placeholder="YouTube ID" />
      <button @click="saveChanges">Save</button>
      <button @click="cancelEditing">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConvexQuery, useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'
import { ref, reactive } from 'vue'

const props = defineProps<{
  cardId: Id<'cards'>
  editable?: boolean
}>()

const { data: card } = useConvexQuery(api.cards.getCardById, { id: props.cardId })
const updateCard = useConvexMutation(api.cards.updateCard)

const isEditing = ref(false)
const editedCard = reactive({
  title: '',
  description: '',
  youtubeId: ''
})

function startEditing() {
  if (card.value) {
    editedCard.title = card.value.title
    editedCard.description = card.value.description
    editedCard.youtubeId = card.value.youtubeId
    isEditing.value = true
  }
}

function cancelEditing() {
  isEditing.value = false
}

async function saveChanges() {
  if (card.value) {
    await updateCard.mutate({
      id: card.value._id,
      title: editedCard.title,
      description: editedCard.description,
      youtubeId: editedCard.youtubeId
    })
    isEditing.value = false
  }
}
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

input,
textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

button {
  margin-right: 10px;
}
</style>
