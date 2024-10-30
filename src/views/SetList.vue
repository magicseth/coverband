<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

const songsWithAttributionAndDate = ref<
  { url: string; lastModified: string | null; author: string }[]
>([])
onMounted(async () => {
  const fromNatSongs = import.meta.glob('@/assets/songs/fromNat/*.m4a', {
    as: 'url',
    import: 'default',
    eager: true
  })
  const fromNatFileStats = await Promise.all(
    Object.entries(fromNatSongs).map(async ([path, url]) => {
      const response = await fetch(url as string, { method: 'HEAD' })
      const lastModified = path.split('/').pop()?.split('_')[0] || ''
      return {
        url: url as string,
        lastModified: lastModified,
        author: 'Nat'
      }
    })
  )

  const fromSethSongs = import.meta.glob('@/assets/songs/fromSeth/*.m4a', {
    as: 'url',
    import: 'default',
    eager: true
  })

  const fromSethFileStats = await Promise.all(
    Object.entries(fromSethSongs).map(async ([path, url]) => {
      const response = await fetch(url as string, { method: 'HEAD' })
      // const lastModified = response.headers.get('last-modified')
      // extract the date from the filename
      console.log(path.split('/').pop()?.split('_')[0])
      const lastModified = path.split('/').pop()?.split('_')[0] || ''
      return {
        url: url as string,
        lastModified: lastModified,
        author: 'Seth'
      }
    })
  )

  const allFileStats = [...fromNatFileStats, ...fromSethFileStats]
  allFileStats.sort((a, b) => {
    if (!a.lastModified || !b.lastModified) return 0
    return b.lastModified > a.lastModified ? -1 : 1
  })

  songsWithAttributionAndDate.value = allFileStats.map((stat) => ({
    url: stat.url,
    lastModified: stat.lastModified,
    author: stat.author
  }))
})

const decodeURL = (url: string) => {
  const nameWithPrefix = decodeURIComponent(
    url.split('/').pop()?.split('.')[0].replace(/%20/g, ' ') || ''
  )
  // get Rid of everything before _
  const name = nameWithPrefix.split('_')[1].replace(/-/g, ' ')

  return name
}
</script>

<template>
  <div>
    <div>Well Hello,</div>
    <div class="flex flex-col">
      <div
        v-for="song in songsWithAttributionAndDate"
        :key="song.url"
        class="flex flex-col"
        :class="song.author"
      >
        {{ decodeURL(song.url) }}<br />
        <audio :src="song.url" controls /> {{ song.lastModified }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.Nat {
  background-color: rgb(59 130 246); /* bg-blue-500 */
  border-radius: 1rem; /* rounded-2xl */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  margin: 0.5rem 1rem 0.5rem 3rem; /* mr-4 ml-12 my-2 */
  color: white; /* text-white */
  border-bottom-right-radius: 0.25rem !important;
  align-self: flex-end;
  text-align: right;
  width: fit-content;
  max-width: 80%;
}
.Seth {
  background-color: rgb(209 213 219); /* bg-gray-300 */
  border-radius: 1rem; /* rounded-2xl */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  margin: 0.5rem 3rem 0.5rem 1rem; /* ml-4 mr-12 my-2 */
  border-bottom-left-radius: 0.25rem !important;
  align-self: flex-start;
  color: black; /* text-black */
  width: fit-content;
  max-width: 80%;
}
</style>
