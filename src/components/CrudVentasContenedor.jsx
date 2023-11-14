import { Container } from "react-bootstrap";
import PedidosCrud from "./PedidosCrud";
import AcreedoresCrud from "./AcreedoresCrud";
import Styles from "../styles/main.module.css"

function CrudVentasContenedor() {


    return (
        <>
            <Container className={`d-flex p-1 ${Styles['contenedor-de-acreedores-pedidos']}`}>
                <AcreedoresCrud/>
                <PedidosCrud/>
            </Container>

        </>
    )
}

export default CrudVentasContenedor
