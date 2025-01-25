import styled from "styled-components";
import { ProductDetailsCard } from "../../../components/ProductDetailsCard";
import { CtaButton } from "../../../components/CtaButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";
import * as productService from "../../../services/product-service.ts";
import * as cartService from "../../../services/cart-service.ts";

const CtaButtonContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const ProductDetails = () => {
  const params = useParams();

  const navigate = useNavigate()

  const [product, setProduct] = useState<ProductDTO>();

  function handleBuyProduct(){
    if(product){
      cartService.addProduct(product)
      navigate("/cart")
    }
  }

  function handleHomeClick(){
    navigate("/")
  }

  useEffect(() => {
    productService.findById(Number(params.productId))
    .then((response) => {
      setProduct(response.data);
    }).catch(() => {
      navigate("/")
    })
  }, []);

  return (
    <>
      {product && <ProductDetailsCard product={product} />}
      <CtaButtonContainer>
        <CtaButton text="Inicio" primaryColor="#fff" secondaryColor="#3483FA" handleClick={handleHomeClick} />
        <CtaButton text="Comprar" primaryColor="#3483FA" secondaryColor="#fff" handleClick={handleBuyProduct} />
      </CtaButtonContainer>
    </>
  );
};

export { ProductDetails };
