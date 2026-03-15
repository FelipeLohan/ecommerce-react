import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./routes/ClientHome/Catalog";
import { ProductDetails } from "./routes/ClientHome/ProductDetails";
import { ClientHome } from "./routes/ClientHome";
import { Cart } from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartQuantity } from "./utils/context-cart";
import { Login } from "./routes/ClientHome/Login";
import { Register } from "./routes/ClientHome/Register";
import { MyAccount } from "./routes/ClientHome/MyAccount";
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
import { ProductListing } from "./routes/Admin/ProductListing/ProductListing.tsx";
import { ProductForm } from "./routes/Admin/ProductForm/ProductForm.tsx";
import { CategoryListing } from "./routes/Admin/CategoryListing";
import { CategoryForm } from "./routes/Admin/CategoryForm";
import { OrderHistory } from "./routes/Admin/OrderHistory";
import { ToastProvider } from "./components/Toast";

function App() {
  const [contextCartQuantity, setContextCartQuantity] = useState<number>(0);
  const [contextTokenPayload, setContextTokenPayload] =
    useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    setContextCartQuantity(cartService.getCart().items.length);

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <ToastProvider>
      <ContextToken.Provider
        value={{ contextTokenPayload, setContextTokenPayload }}
      >
        <ContextCartQuantity.Provider
          value={{ contextCartQuantity, setContextCartQuantity }}
        >
          <HistoryRouter history={history as never}>
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
                <Route path="/register" element={<Register />} />
                <Route
                  path="/my-account"
                  element={
                    <PrivateRoute>
                      <MyAccount />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/confirmation/:orderId"
                  element={
                    <PrivateRoute>
                      <Confirmation />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route
                path="/admin/"
                element={
                  <PrivateRoute roles={["ROLE_ADMIN"]}>
                    <Admin />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="/admin/home" />} />
                <Route path="home" element={<AdminHome />} />
                <Route path="products" element={<ProductListing />} />
                <Route path="products/:productId" element={<ProductForm />} />
                <Route path="categories" element={<CategoryListing />} />
                <Route path="categories/:categoryId" element={<CategoryForm />} />
                <Route path="orders" element={<OrderHistory />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </HistoryRouter>
        </ContextCartQuantity.Provider>
      </ContextToken.Provider>
    </ToastProvider>
  );
}

export default App;
