import CrudProveedores from "../../components/CrudProveedores"
import SideBar from "../../components/SideBar"

function ScreenProvee() {
    return (
        <>
            <div className="d-flex">
                <SideBar />
                <CrudProveedores />
            </div>

        </>
    )
}

export default ScreenProvee
