import styled from "styled-components";
import { ProductDetailsCard } from "../../../components/ProductDetailsCard";
import { CtaButton } from "../../../components/CtaButton";
import * as productService from '../../../services/product-service.ts'
import { Button } from "../../../models/button";
import { useParams } from "react-router-dom";

const CtaButtonContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const button: Button[] = [
  {
    primaryColor: "#3483fa",
    secondaryColor: "#fff",
    text: "Comprar",
  },
  {
    primaryColor: "#fff",
    secondaryColor: "#3483fa",
    text: "Início",
  },
];

// eslint-disable-next-line react-hooks/rules-of-hooks
const params = useParams()

const product = productService.findById(Number(params.productId));

const ProductDetails = () => {
  return (
    <>
      {
        product &&
        <ProductDetailsCard product={product} />
      }
      <CtaButtonContainer>
        {button.map((e) => (
          <CtaButton key={e.text} button={e} />
        ))}
      </CtaButtonContainer>
    </>
  );
};

export { ProductDetails };
