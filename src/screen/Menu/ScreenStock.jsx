import SalidasCrud from "../../components/SalidasCrud"
import SideBar from "../../components/SideBar"
import StockCrud from "../../components/StockCrud"

function ScreenStock() {
    return (
        <>
            <div className="d-flex ">
                <SideBar />
                <StockCrud />
                <SalidasCrud />
            </div>
        </>
    )
}

export default ScreenStock
