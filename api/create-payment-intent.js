import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name } = req.body

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Create or retrieve customer
    const customers = await stripe.customers.list({ email, limit: 1 })
    let customer = customers.data[0]
    if (!customer) {
      customer = await stripe.customers.create({ email, name })
    }

    // Create PaymentIntent — $99/month
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9900, // cents
      currency: 'usd',
      customer: customer.id,
      metadata: { name, email },
      description: 'Vantage Field Pro — Monthly',
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
