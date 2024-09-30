<template>
  <div class="card-editor">
    <input v-model="title" placeholder="Card Title" />
    <textarea v-model="description" placeholder="Card Description"></textarea>
    <input v-model="youtubeId" placeholder="YouTube Video ID" />
    <button @click="createCard">Create Card</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'

const title = ref('')
const description = ref('')
const youtubeId = ref('')

const { mutate: addCard } = useConvexMutation(api.cards.addCard)

const createCard = async () => {
  try {
    await addCard({
      title: title.value,
      description: description.value,
      youtubeId: youtubeId.value
    })
    // Clear the form after successful creation
    title.value = ''
    description.value = ''
    youtubeId.value = ''
    // You might want to add some user feedback here, like a success message
  } catch (error) {
    console.error('Failed to create card:', error)
    // You might want to add some user feedback here, like an error message
  }
}
</script>

<style scoped>
.card-editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

input,
textarea,
button {
  padding: 8px;
  font-size: 16px;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
