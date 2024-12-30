import styled from "styled-components";
import { HeaderClient } from "../../components/HeaderClient";
import { ProductDetailsCard } from "../../components/ProductDetailsCard";
import { CtaButton } from "../../components/CtaButton";

const CtaButtonContainer = styled.div`
margin-top: 20px;
width: 90%;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 20px;
`;

const ProductDetails = () => {
  return (
    <>
      <HeaderClient />
      <ProductDetailsCard />
      <CtaButtonContainer>
        <CtaButton />
      </CtaButtonContainer>
    </>
  );
};

export { ProductDetails };
