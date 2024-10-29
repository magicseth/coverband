<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../convex/_generated/api'
import { useConvexQuery, useConvexMutation } from '@convex-vue/core'
import { FormInstance } from 'twilio/lib/rest/verify/v2/form'

const natSongs = ref<string[]>([])
onMounted(async () => {
  const fromNatSongs = import.meta.glob('@/assets/songs/fromNat/*.m4a')
  const newNatSongs = (await Promise.all(
    Object.values(fromNatSongs).map((importFn) => importFn())
  )) as { default: string }[]
  natSongs.value = newNatSongs.map((song) => song.default)
  // console.log(fromNatSongs)
})
</script>

<template>
  <div>
    <div>Well Hello,</div>
    <div v-for="song in natSongs" :key="song">
      {{ decodeURIComponent(song.split('/').pop()?.split('.')[0].replace(/%20/g, ' ')) }}<br />
      <audio :src="song" controls />
    </div>
  </div>
</template>
