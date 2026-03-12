import { Outlet } from "react-router-dom";
import { HeaderClient } from "../../components/HeaderClient";
import { BackToTop } from "../../components/BackToTop";
import { FooterClient } from "../../components/FooterClient";

const ClientHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderClient />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterClient />
      <BackToTop />
    </div>
  );
};

export { ClientHome };
