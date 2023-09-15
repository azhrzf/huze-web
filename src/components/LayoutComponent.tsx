import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent"
import { Outlet } from "react-router-dom"

const LayoutComponent = () => {
    return (
        <>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default LayoutComponent