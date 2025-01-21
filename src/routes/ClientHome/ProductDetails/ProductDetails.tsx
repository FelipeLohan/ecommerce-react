import styled from "styled-components";
import { ProductDetailsCard } from "../../../components/ProductDetailsCard";
import { CtaButton } from "../../../components/CtaButton";
import { Button } from "../../../models/button";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";
import * as productService from "../../../services/product-service.ts";

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

const ProductDetails = () => {
  const params = useParams();

  const navigate = useNavigate()

  const [product, setProduct] = useState<ProductDTO>();

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
        {button.map((e) =>
          e.text === "Início" ? (
            <Link to="/" key={e.text}>
              <CtaButton button={e} />
            </Link>
          ) : (
            <CtaButton key={e.text} button={e} />
          )
        )}
      </CtaButtonContainer>
    </>
  );
};

export { ProductDetails };
