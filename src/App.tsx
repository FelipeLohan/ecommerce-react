import styled from "styled-components";
import { CategoryCard } from "./components/CategoryCard";
import { CtaButton } from "./components/CtaButton";
import { CtaLoadMore } from "./components/CtaLoadMore";
import { HeaderClient } from "./components/HeaderClient";
import { LoginCard } from "./components/LoginCard";
import { ProductCatalogCard } from "./components/ProductCatalogCard";
import { ProductDetailsCard } from "./components/ProductDetailsCard";
import { SearchInput } from "./components/SearchInput";
import { ProductDetailsInCart } from "./components/ProductDetailInCart";

function App() {
  return (
    <>
      <HeaderClient />
      <ProductDetailsInCart />
    </>
  );
}

export default App;
