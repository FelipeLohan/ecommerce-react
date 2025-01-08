import { Outlet } from "react-router-dom"
import { HeaderClient } from "../../components/HeaderClient"

const ClientHome = () => {
  return(
    <>
    <HeaderClient/>
    <Outlet/>
    </>
  )
}

export { ClientHome }