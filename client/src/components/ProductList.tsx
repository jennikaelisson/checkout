import { useEffect, useState } from "react";
import { IProduct } from "./context/CartContext";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct>([]);
   
    useEffect(() => {
         const gatherProducts = async () => {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();
            console.log(data.data);
            //setProducts(data.data);
        }
        gatherProducts();
    }, [])

    return <>Lista</>
}

export default ProductList;