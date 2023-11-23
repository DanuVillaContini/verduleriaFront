import AcreedoresCrud from "../../components/AcreedoresCrud"
import ClientesCrud from "../../components/ClientesCrud"
import PedidosCrud from "../../components/PedidosCrud"
import SideBar from "../../components/SideBar"

function ScreenPedidos() {
    return (
        <>
            <div className="d-flex">
                <SideBar />
                <ClientesCrud />
                <div>
                    <PedidosCrud />
                    <AcreedoresCrud />
                </div>
            </div>
        </>
    )
}

export default ScreenPedidos
