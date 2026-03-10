import { Outlet } from "react-router-dom";
import { HeaderClient } from "../../components/HeaderClient";
import { BackToTop } from "../../components/BackToTop";

const ClientHome = () => {
  return (
    <>
      <HeaderClient />
      <Outlet />
      <BackToTop />
    </>
  );
};

export { ClientHome };
