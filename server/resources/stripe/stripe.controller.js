const initStripe = require("../../stripe")
const fs = require("fs").promises

const path = require('path');

const ordersFilePath = path.resolve(__dirname, 'orders.json');


const createCheckOutSession = async (req, res) => {
  
    const cart = req.body

  const stripe = initStripe()

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: req.session.user.customerId,
    line_items: cart.map(item => {
      return {
        price: item.product,
        quantity: item.quantity,
      }
    }),
    success_url: "http://localhost:5173/confirmation",
  })

  res.status(200).json({ url: session.url, sessionId: session.id })
}

const verifySession = async (req, res) => {
  const stripe = initStripe()

  console.log("Nu kommer jag hit")

  const sessionId = req.body.sessionId

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status === "paid") {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
    

    console.log(lineItems)

    const order = {
      orderNumber: Math.floor(Math.random() * 100000000),
      customerName: session.customer_details.name,
      products: lineItems.data,
      total: session.amount_total,
      date: new Date()

    }

    const orders = JSON.parse(await fs.readFile(ordersFilePath))
    orders.push(order)
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 4))
    console.log(session)

    res.status(200).json({ verified: true })
  }

}

module.exports = { createCheckOutSession, verifySession }
