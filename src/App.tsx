import { CategoryCard } from "./components/CategoryCard";
import { CtaButton } from "./components/CtaButton";
import { CtaLoadMore } from "./components/CtaLoadMore";
import { HeaderClient } from "./components/HeaderClient";
import { LoginCard } from "./components/LoginCard";
import { ProductCatalogCard } from "./components/ProductCatalogCard";
import { SearchInput } from "./components/SearchInput";

function App() {
  return (
    <>
      <HeaderClient />
      <SearchInput />
      <ProductCatalogCard/>
      <CtaButton/>
      <CtaLoadMore/>
      <LoginCard/>
      <CategoryCard/>
    </>
  );
}

export default App;
