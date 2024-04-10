import { useCart } from "../context/CartContext"

const PaymentButton = () => {
    const {cart} = useCart();
    const handlePayment = async () => {
        
        const cartItems = cart.map((item) => ({
            product: item.product.default_price.id,
            quantity: item.quantity,
          }));

        const response = await fetch("http://localhost:3001/payments/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(
               cartItems
            )
        })
        const data = await response.json()
        localStorage.setItem("sessionId", JSON.stringify(data.sessionId))
        window.location = data.url  
    }
    return <button onClick={handlePayment}>Pay</button>
}

export default PaymentButton;