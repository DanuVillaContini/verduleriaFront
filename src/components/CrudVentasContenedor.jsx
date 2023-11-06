import { Container } from "react-bootstrap";
import PedidosCrud from "./pedidosCrud";
import AcreedoresCrud from "./AcreedoresCrud";

function CrudVentasContenedor() {

    return (
        <>
            <Container className="d-flex p-1">
                <PedidosCrud/>
                <AcreedoresCrud/>
            </Container>

        </>
    )
}

export default CrudVentasContenedor
