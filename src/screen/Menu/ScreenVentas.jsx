import SalidasCrud from "../../components/SalidasCrud"
import StockCrud from "../../components/StockCrud"

function ScreenVentas() {
    return (
        <div>
            <h1>Ventas</h1>
            <div className="d-flex">
                <StockCrud/>
                <SalidasCrud/>
            </div>

        </div>
    )
}

export default ScreenVentas
