<template>
  <div v-if="card" class="one-card">
    <div v-if="!isEditing">
      <h2>{{ card.title }}</h2>
      <p>{{ card.description }}</p>
      <p v-if="editable && card.lastDayUsed">Last used: {{ card.lastDayUsed }}</p>
      <div class="video-container">
        <img
          v-if="editable && card.youtubeId && !showIframe"
          :src="`https://img.youtube.com/vi/${card.youtubeId}/0.jpg`"
          :alt="card.title"
          class="youtube-thumbnail"
          @click="showIframe = true"
        />
        <iframe
          v-else-if="card.youtubeId"
          ref="youtubePlayer"
          width="100%"
          height="315"
          :src="`https://www.youtube.com/embed/${card.youtubeId}?enablejsapi=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          :id="`youtube-player-${card.youtubeId}`"
          @load="setupYouTubeAPI"
        ></iframe>
      </div>
      <button v-if="editable" @click="startEditing">Edit</button>
      <router-link v-if="editable" :to="{ name: 'viewCard', params: { id: card._id } }">
        View Card
      </router-link>
    </div>
    <div v-else>
      <input v-model="editedCard.title" placeholder="Title" />
      <textarea v-model="editedCard.description" placeholder="Description"></textarea>
      <input v-model="editedCard.youtubeId" placeholder="YouTube ID" />
      <input
        v-model="editedCard.lastDayUsed"
        placeholder="Last Day Used (YYYY-MM-DD or leave empty to reset)"
      />
      <button @click="saveChanges">Save</button>
      <button @click="cancelEditing">Cancel</button>
      <div class="video-container">
        <img
          v-if="editedCard.youtubeId"
          :src="`https://img.youtube.com/vi/${editedCard.youtubeId}/0.jpg`"
          :alt="editedCard.title"
          class="youtube-thumbnail"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConvexQuery, useConvexMutation, useConvexAction } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { usePing } from '@/usePing'

// Add this type declaration at the top of your file
declare const YT: any

const props = defineProps<{
  cardId: Id<'cards'>
  editable?: boolean
}>()

const { data: card } = useConvexQuery(api.cards.getCardById, { id: props.cardId })
const updateCard = useConvexMutation(api.cards.updateCard)
const { sendPing } = usePing()

const isEditing = ref(false)
const showIframe = ref(false)
const editedCard = reactive({
  title: '',
  description: '',
  youtubeId: '',
  lastDayUsed: ''
})

let player: any = null

function startEditing() {
  if (card.value) {
    editedCard.title = card.value.title
    editedCard.description = card.value.description
    editedCard.youtubeId = card.value.youtubeId
    editedCard.lastDayUsed = card.value.lastDayUsed || ''
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
      youtubeId: editedCard.youtubeId,
      lastDayUsed: editedCard.lastDayUsed
    })
    isEditing.value = false
  }
}

function setupYouTubeAPI(event: Event) {
  console.log('setupYouTubeAPI')
  if (typeof YT === 'undefined' || !YT.Player) {
    console.log('YT is undefined')
    // Load the YouTube API script if it's not already loaded
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    ;(window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  } else {
    console.log('YT is not undefined')
    onYouTubeIframeAPIReady(event.target as HTMLIFrameElement)
  }
}

function onYouTubeIframeAPIReady(element: HTMLIFrameElement) {
  console.log('onYouTubeIframeAPIReady')
  player = new YT.Player(`youtube-player-${card.value?.youtubeId}`, {
    events: {
      onStateChange: onPlayerStateChange
    }
  })
}

function onPlayerStateChange(event: any) {
  console.log('onPlayerStateChange')
  if (event.data == YT.PlayerState.PLAYING) {
    sendPing('youtube started ' + card.value?.title)
    console.log('youtube started')
  }
}

const youtubePlayer = ref<HTMLDivElement | null>(null)
onMounted(() => {
  // setupYouTubeAPI(youtubePlayer.value as HTMLDivElement)
})

onUnmounted(() => {
  if (player) {
    player.destroy()
  }
})
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

.youtube-thumbnail {
  width: 100%;
  height: auto;
  max-height: 315px;
  object-fit: cover;
  cursor: pointer;
}
</style>
