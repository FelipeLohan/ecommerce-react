import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./routes/ClientHome/Catalog";
import { ProductDetails } from "./routes/ClientHome/ProductDetails";
import { ClientHome } from "./routes/ClientHome";
import { Cart } from "./routes/ClientHome/Cart";
import { useState } from "react";
import { ContextCartQuantity } from "./utils/context-cart";
import { Login } from "./routes/ClientHome/Login";

function App() {
  const [contextCartQuantity, setContextCartQuantity] = useState<number>(0);

  return (
    <>
      <ContextCartQuantity.Provider
        value={{ contextCartQuantity, setContextCartQuantity }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route
                path="/product-details/:productId"
                element={<ProductDetails />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ContextCartQuantity.Provider>
    </>
  );
}

export default App;
