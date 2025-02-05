import {  Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./routes/ClientHome/Catalog";
import { ProductDetails } from "./routes/ClientHome/ProductDetails";
import { ClientHome } from "./routes/ClientHome";
import { Cart } from "./routes/ClientHome/Cart";
import { useState } from "react";
import { ContextCartQuantity } from "./utils/context-cart";
import { Login } from "./routes/ClientHome/Login";
import { Admin } from "./routes/Admin";
import { AdminHome } from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";

function App() {
  const [contextCartQuantity, setContextCartQuantity] = useState<number>(0);

  return (
    <>
      <ContextCartQuantity.Provider
        value={{ contextCartQuantity, setContextCartQuantity }}
      >
        <HistoryRouter history={history}>
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
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminHome />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartQuantity.Provider>
    </>
  );
}

export default App;
