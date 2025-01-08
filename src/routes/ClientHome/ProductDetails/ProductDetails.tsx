import styled from "styled-components";
import { ProductDetailsCard } from "../../../components/ProductDetailsCard";
import { CtaButton } from "../../../components/CtaButton";
import { ProductDTO } from "../../../models/product";
import { Button } from "../../../models/button";

const CtaButtonContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const product: ProductDTO = {
  id: 1,
  name: "SmartTV Samsung 4k",
  description:
    "Smart TV da Samsung modelo 4k, 120hz, com 48 polegadas de imagem",
  price: 2900,
  imgUrl:
    "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/refs/heads/master/backend/img/2-big.jpg",
  categories: [
    {
      id: 1,
      name: "Eletrônicos",
    },
    {
      id: 2,
      name: "Computadores",
    },
  ],
};

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

const ProductDetails = () => {
  return (
    <>
      <ProductDetailsCard product={product} />
      <CtaButtonContainer>
        {button.map((e) => (
          <CtaButton key={e.text} button={e} />
        ))}
      </CtaButtonContainer>
    </>
  );
};

export { ProductDetails };
