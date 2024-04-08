const initStripe = require("../../stripe")

const createCheckOutSession = async (req, res) => {
const cart = req.body

    const stripe = initStripe()
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: cart.map(item => {
            return {
                price: item.product,
                quantity: item.quantity
            }
        }),
        success_url: "http://localhost:5173/confirmation", //lägg till confirmation eller cancellation 
        cancel_url: "http://localhost:5173",

    })

    res.status(200).json({ url: session.url }) // , sessionId: session.id
}

module.exports = { createCheckOutSession }