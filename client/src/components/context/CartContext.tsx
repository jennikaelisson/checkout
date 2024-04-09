import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export interface IProduct {
    id: string,
    name: string,
    description: string,
    images: string[],
    default_price: {
        unit_amount: number
    }
}

interface ICartItem {
    product: IProduct,
    quantity: number
}

interface ICartContext {
    cart: ICartItem[],
    addToCart: (product: IProduct) => void
}

const initValues = {
    cart: [],
    addToCart: () => {}
}

const CartContext = createContext<ICartContext>(initValues);
export const useCart = () => useContext(CartContext);

const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, setCart] = useState<ICartItem[]>(() => {
        const localStorageData = localStorage.getItem("cart");
        return localStorageData ? JSON.parse(localStorageData) : [];
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: IProduct) => {
        const clonedCart = [...cart];

        const productExists = clonedCart.find(item => item.product.id === product.id)

        if (productExists) {
            productExists.quantity++ 
            setCart(clonedCart)
        } else {
            setCart([...cart, {product, quantity: 1}])
        }
    }

    return (
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;