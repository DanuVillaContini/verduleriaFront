import CrudEmpleados from "../../components/CrudEmpleados"
import SideBar from "../../components/SideBar"

function ScreenEmpleados() {
    return (
        <>
            <div className="d-flex">
                <SideBar/>
                <CrudEmpleados />
            </div>
            
        </>
    )
}

export default ScreenEmpleados
