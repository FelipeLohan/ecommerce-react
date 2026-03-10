import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";
import { ProductDetailsCard } from "../../../components/ProductDetailsCard";
import * as productService from "../../../services/product-service.ts";
import * as cartService from "../../../services/cart-service.ts";
import { ContextCartQuantity } from "../../../utils/context-cart.ts";
import { ContextToast } from "../../../utils/context-toast.ts";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDTO>();
  const { setContextCartQuantity } = useContext(ContextCartQuantity);
  const { addToast } = useContext(ContextToast);

  function handleBuyProduct(quantity: number) {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        cartService.addProduct(product);
      }
      setContextCartQuantity(cartService.getCart().items.length);
      addToast("success", "Item adicionado ao carrinho!");
      navigate("/cart");
    }
  }

  useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  if (!product) return null;

  return (
    <ProductDetailsCard
      product={product}
      onBuy={handleBuyProduct}
      onBack={() => navigate("/")}
    />
  );
};

export { ProductDetails };
