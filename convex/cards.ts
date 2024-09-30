import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const addCard = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    youtubeId: v.string()
  },
  handler: async (ctx, args) => {
    const { title, description, youtubeId } = args
    const newCardId = await ctx.db.insert('cards', {
      title,
      description,
      youtubeId
    })
    return newCardId
  }
})

export const getCards = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('cards').collect()
  }
})

export const getCardById = query({
  args: { id: v.id('cards') },
  handler: async (ctx, args) => {
    const { id } = args
    return await ctx.db.get(id)
  }
})
export const setRandomCardForToday = mutation({
  args: {},
  handler: async (ctx) => {
    const allCards = await ctx.db
      .query('cards')
      .withIndex('by_last_day_used', (q) => q.eq('lastDayUsed', undefined))
      .collect()
    if (allCards.length === 0) {
      return null
    }

    const today = new Date().toISOString().split('T')[0]
    const seed = parseInt(today.replace(/-/g, ''))
    const randomIndex = seed % allCards.length
    const selectedCard = allCards[randomIndex]

    await ctx.db.patch(selectedCard._id, { lastDayUsed: today })

    return selectedCard._id
  }
})

export const getTodayCard = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0]
    const todayCard = await ctx.db
      .query('cards')
      .withIndex('by_last_day_used', (q) => q.eq('lastDayUsed', today))
      .first()

    return todayCard
  }
})

// export const getRandomCardForToday = query({
//   args: {},
//   handler: async (ctx) => {
//     const allCards = await ctx.db.query('cards').collect()
//     if (allCards.length === 0) {
//       return null
//     }

//     const today = new Date()
//     const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
//     const randomIndex = seed % allCards.length

//     return allCards[randomIndex]
//   }
// })
