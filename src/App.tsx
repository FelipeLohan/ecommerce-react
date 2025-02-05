import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./routes/ClientHome/Catalog";
import { ProductDetails } from "./routes/ClientHome/ProductDetails";
import { ClientHome } from "./routes/ClientHome";
import { Cart } from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartQuantity } from "./utils/context-cart";
import { Login } from "./routes/ClientHome/Login";
import { Admin } from "./routes/Admin";
import { AdminHome } from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/auth";
import * as authService from "./services/auth-service.ts";
import * as cartService from "./services/cart-service.ts";
import { ContextToken } from "./utils/context-token";
import { Confirmation } from "./components/Confirnation/Confirmation.tsx";

function App() {
  const [contextCartQuantity, setContextCartQuantity] = useState<number>(0);
  const [contextTokenPayload, setContextTokenPayload] =
    useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    
    setContextCartQuantity(cartService.getCart().items.length)

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <>
      <ContextToken.Provider
        value={{ contextTokenPayload, setContextTokenPayload }}
      >
        <ContextCartQuantity.Provider
          value={{ contextCartQuantity , setContextCartQuantity }}
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
                <Route
                  path="/confirmation/:orderId"
                  element={<Confirmation />}
                />
              </Route>
              <Route
                path="/admin"
                element={
                  <PrivateRoute roles={["ROLE_ADMIN"]}>
                    <Admin />
                  </PrivateRoute>
                }
              >
                <Route index element={<AdminHome />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </HistoryRouter>
        </ContextCartQuantity.Provider>
      </ContextToken.Provider>
    </>
  );
}

export default App;
