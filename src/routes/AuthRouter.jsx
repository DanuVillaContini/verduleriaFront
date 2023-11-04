import { Route, Routes } from "react-router-dom";
import ScreenEmpleados from "../screen/Menu/ScreenEmpleados";
import ScreenProvee from "../screen/Menu/ScreenProvee";
import ScreenStock from "../screen/Menu/ScreenStock";
import ScreenVentas from "../screen/Menu/ScreenVentas";


export default function AuthRouter() {
    return (
        <>
            <Routes>
                {/* http://localhost:5173/auth/              */}
                <Route path="/" element={<ScreenEmpleados />} />   
                {/* http://localhost:5173/auth/proveedores              */}
                <Route path="/proveedores" element={<ScreenProvee />} />
                {/* http://localhost:5173/auth/stock              */}
                <Route path="/stock" element={<ScreenStock />} />
                {/* http://localhost:5173/auth/ventas              */}
                <Route path="/ventas" element={<ScreenVentas />} />
            </Routes>
        </>
    )
}
