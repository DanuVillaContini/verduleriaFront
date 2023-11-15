import SalidasCrud from "../../components/SalidasCrud"
import StockCrud from "../../components/StockCrud"

function ScreenStock() {
    return (
        <>
            <div className="d-flex ">
                <StockCrud />
                <SalidasCrud />
            </div>
        </>
    )
}

export default ScreenStock
