import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const PaymentButton = () => {
    const {cart} = useCart();
    const { user } = useUser();
    const handlePayment = async () => {
        if (!user) {
            alert("Du måste logga in för att genomföra köpet!");
            return;
          }
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