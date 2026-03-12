import { Outlet } from "react-router-dom";
import { HeaderAdmin } from "../../components/HeaderAdmin";

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface-page">
      <HeaderAdmin />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export { Admin };
