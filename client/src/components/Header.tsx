import { useCart } from "../context/CartContext";

const Header = () => {
    const {cart} = useCart();
    return <>header 
    {/* Vill man visa quantity i kundvagnen får man bygga en reducer. nu visas enbart hur många olika saker som finns */}
    <p>Cart: {cart.length}</p></> 
}

export default Header;