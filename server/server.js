const express = require("express")
const cookieSession = require("cookie-session")
const cors = require("cors")
const initStripe = require("./stripe")
require("dotenv").config()

const userRouter = require("./resources/users/users.router")
const authRouter = require("./resources/auth/auth.router")
const stripeRouter = require("./resources/stripe/stripe.router")

const app = express()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60, // 1h
    httpOnly: true,
    secure: false, 
    sameSite: "lax"
}))

// Routes
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/payments", stripeRouter)

app.get("/products", async (req, res) => {
    const stripe = initStripe()
    const products = await stripe.products.list({
        expand: ["data.default_price"]
    })
    res.status(200).json(products)
})



app.listen(3001, () => console.log("Servers up n runnin"))