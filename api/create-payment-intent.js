import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

// Allowed plan amounts (cents) — guards against client-side tampering
const PLAN_AMOUNTS = {
  starter:      8900,
  professional: 15900,
  enterprise:   24900,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name, plan } = req.body

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const amount = PLAN_AMOUNTS[plan] ?? PLAN_AMOUNTS.professional

  try {
    // Create or retrieve Stripe customer
    const existing = await stripe.customers.list({ email, limit: 1 })
    let customer = existing.data[0]
    if (!customer) {
      customer = await stripe.customers.create({ email, name })
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      metadata: { name, email, plan: plan ?? 'professional' },
      description: `Vantage Field ${plan ?? 'Professional'} — Monthly`,
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
