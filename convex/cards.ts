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
