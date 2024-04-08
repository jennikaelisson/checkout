const PaymentButton = () => {
    const handlePayment = async () => {
        const response = await fetch("http://localhost:3001/api/payments/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify([{
                    product: "price_1P1niGRr8sE6FBT0PdKdea9i",
                    quantity: 1
                },
                {
                    product: "price_1P1newRr8sE6FBT05AitBk9K",
                    quantity: 2
                },
            ])
        })
        const data = await response.json();
        localStorage.setItem("sessionId", JSON.stringify(data.sessionId))
        window.location = data.url;        
    }
    return <button onClick={handlePayment}>Pay</button>
}

export default PaymentButton;