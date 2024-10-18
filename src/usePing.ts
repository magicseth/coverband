import { useConvexAction } from '@convex-vue/core'
import { api } from '../convex/_generated/api'
import { onMounted, ref } from 'vue'

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

export function usePing() {
  const { mutate: sendPing } = useConvexAction(api.cardsnode.sendPing)

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

  return {
    sendPing: function (message: string) {
      sendPing({
        message: codename.value + ': ' + message
      })
    }
  }
}
