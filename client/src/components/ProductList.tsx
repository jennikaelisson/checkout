import { useEffect, useState } from "react";
import { IProduct, useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>();

  const { addToCart } = useCart();

  useEffect(() => {
    const gatherProducts = async () => {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      console.log(data.data);
      setProducts(data.data);
    };
    gatherProducts();
  }, []);

  return (
    <div>
      {products?.map((product: IProduct) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {/* <img src={product.images} alt="Product image" /> */}
          <h4>{product.default_price.unit_amount / 100} kr</h4>
          <p>{product.description}</p>
          <button onClick={() => addToCart(product)}>
            Add {product.name} to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
