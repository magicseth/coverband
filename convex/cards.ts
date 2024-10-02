import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { api } from './_generated/api'
import { DateTime } from 'luxon'

// New reusable function to get the current date in Pacific Time
function getDate() {
  return DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
}

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
    const today = getDate()

    // Check if a card has already been set for today
    const existingTodayCard = await ctx.db
      .query('cards')
      .withIndex('by_last_day_used', (q) => q.eq('lastDayUsed', today))
      .first()

    if (existingTodayCard) {
      return existingTodayCard._id
    }

    const allCards = await ctx.db
      .query('cards')
      .withIndex('by_last_day_used', (q) => q.eq('lastDayUsed', undefined))
      .collect()
    if (allCards.length === 0) {
      return null
    }

    const seed = parseInt(today.replace(/-/g, ''))
    const randomIndex = seed % allCards.length
    const selectedCard = allCards[randomIndex]

    await ctx.db.patch(selectedCard._id, { lastDayUsed: today })

    // Schedule the action to send a text message
    await ctx.scheduler.runAfter(0, api.cardsnode.sendTodayCardNotification, {
      cardId: selectedCard._id
    })

    return selectedCard._id
  }
})

export const getTodayCard = query({
  args: {},
  handler: async (ctx) => {
    const today = getDate()
    const todayCard = await ctx.db
      .query('cards')
      .withIndex('by_last_day_used', (q) => q.eq('lastDayUsed', today))
      .first()

    return todayCard
  }
})

// Add this new mutation
export const recycleCard = mutation({
  args: { id: v.id('cards') },
  handler: async (ctx, args) => {
    const { id } = args
    await ctx.db.patch(id, { lastDayUsed: undefined })
    return id
  }
})

// Add this new mutation
export const updateCard = mutation({
  args: {
    id: v.id('cards'),
    title: v.string(),
    description: v.string(),
    youtubeId: v.string(),
    lastDayUsed: v.optional(v.union(v.string(), v.null()))
  },
  handler: async (ctx, args) => {
    const { id, title, description, youtubeId, lastDayUsed } = args
    await ctx.db.patch(id, {
      title,
      description,
      youtubeId,
      lastDayUsed: lastDayUsed === '' || lastDayUsed === null ? undefined : lastDayUsed
    })
    return id
  }
})
