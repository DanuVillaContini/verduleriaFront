import SalidasCrud from "../../components/SalidasCrud"
import StockCrud from "../../components/StockCrud"

function ScreenStock() {
    return (
        <>
            <h1>Sctock</h1>
            <div className="d-flex">
                <StockCrud />
                <SalidasCrud />
            </div>
        </>
    )
}

export default ScreenStock
