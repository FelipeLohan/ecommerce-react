import { CtaButton } from "./components/CtaButton";
import { HeaderClient } from "./components/HeaderClient";
import { ProductCatalogCard } from "./components/ProductCatalogCard";
import { SearchInput } from "./components/SearchInput";

function App() {
  return (
    <>
      <HeaderClient />
      <SearchInput />
      <ProductCatalogCard/>
      <CtaButton/>
    </>
  );
}

export default App;
