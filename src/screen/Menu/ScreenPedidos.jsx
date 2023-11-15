import PedidosCrud from "../../components/PedidosCrud"
import SideBar from "../../components/SideBar"

function ScreenPedidos() {
    return (
        <>
            <div className="d-flex">
                <SideBar />
                <PedidosCrud />
            </div>
        </>
    )
}

export default ScreenPedidos
