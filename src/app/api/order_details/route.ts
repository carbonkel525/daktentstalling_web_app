import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    // Hier kun je de sessiegegevens verwerken en opslaan in je database als dat nodig is

    const orderDetails = {
      id: session.id,
      amount: session.amount_total,
      status: session.payment_status,
      items: session.line_items?.data.map(item => item.description) || [],
      // Voeg hier meer velden toe zoals nodig
    }

    return NextResponse.json(orderDetails)
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Error retrieving order details' }, { status: 500 })
  }
}