'use node'
import { action } from './_generated/server'
import { v } from 'convex/values'
import { api } from './_generated/api'
import { Twilio } from 'twilio'
// New action to send a text message
export const sendTodayCardNotification = action({
  args: { cardId: v.id('cards') },
  handler: async (ctx, { cardId }) => {
    const card = await ctx.runQuery(api.cards.getCardById, { id: cardId })
    if (!card) {
      throw new Error('Card not found')
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_FROM_NUMBER
    const toNumber = process.env.NOTIFICATION_TO_NUMBER

    if (!accountSid || !authToken || !fromNumber || !toNumber) {
      throw new Error('Missing Twilio configuration')
    }

    const client = new Twilio(accountSid, authToken)

    try {
      await client.messages.create({
        body: `Today's card: ${card.title}`,
        from: fromNumber,
        to: toNumber
      })
      console.log(fromNumber, toNumber, 'Text message sent successfully')
    } catch (error) {
      console.error('Error sending text message:', error)
    }
  }
})

// Action to send a "ping" message
export const sendPing = action({
  args: { message: v.string() },
  handler: async (ctx, { message }) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_FROM_NUMBER
    const toNumber = process.env.NOTIFICATION_TO_NUMBER

    if (!accountSid || !authToken || !fromNumber || !toNumber) {
      throw new Error('Missing Twilio configuration')
    }

    const client = new Twilio(accountSid, authToken)

    try {
      await client.messages.create({
        body: message,
        from: fromNumber,
        to: toNumber
      })
      console.log('Ping message sent successfully')
    } catch (error) {
      console.error('Error sending ping message:', error)
    }
  }
})
