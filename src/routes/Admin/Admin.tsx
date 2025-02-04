import { Outlet } from "react-router-dom";
import { HeaderAdmin } from "../../components/HeaderAdmin";

const Admin = () => {
  return(
    <>
      <HeaderAdmin/>
      <Outlet/>
    </>
  )
}

export { Admin };