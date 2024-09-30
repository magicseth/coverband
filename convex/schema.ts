import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  cards: defineTable({
    title: v.string(),
    description: v.string(),
    youtubeId: v.string()
  })
})
