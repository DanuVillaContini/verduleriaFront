import AcreedoresCrud from "../../components/AcreedoresCrud"
import SideBar from "../../components/SideBar"
function ScreenAcreedores() {
    return (
        <>

            <div className="d-flex">
                <SideBar />
                <AcreedoresCrud />
            </div>
        </>
    )
}

export default ScreenAcreedores
