import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"

function AcreedoresCrud() {
    const [showNuevoAcreeForm, setshowNuevoAcreeForm] = useState(false)

    showNuevoAcreeForm

    const mostrarItem = [
        { _id: 1, nameCliente: "Rogelio Bermudes", total: 7.2, },
        { _id: 2, nameCliente: "Sandra Raco", total: 8.5, },
        { _id: 3, nameCliente: "Carlos Peremulter", total: 9.0, },
        { _id: 4, nameCliente: "Sabrina Perez", total: 6.8, },
        { _id: 5, nameCliente: "Octavio Ponce", total: 8.0, },
        { _id: 6, nameCliente: "Silvina Escupidero", total: 7.5, },
        { _id: 7, nameCliente: "Roberta Rojo", total: 8.9, },
        { _id: 8, nameCliente: "Ellen Sanchez", total: 9.2, },
        { _id: 9, nameCliente: "Sasha Costa", total: 8.7, }
    ]
    return (
        <>
            <Row className="d-flex flex-column m-1">
                <Col>
                    <h2>Acreedores Varios</h2>
                    <Button
                        variant="info"
                        onClick={() => {
                            setshowNuevoAcreeForm((prevState) => !prevState);

                        }}
                    >Nuevo</Button>
                    <form className={`bg-secondary ${Styles["nuevoItem__acree-form"]}`} style={{ height: showNuevoAcreeForm ? "auto" : undefined }}>
                        <h4>
                            Nuevo
                        </h4>
                        <div className="">
                            <label>Nombre y apellido</label>
                            <input type="text" placeholder="Nombre y apellido de quien hace el pedido" />
                        </div>
                        <div className="">
                            <label>Total Deudor</label>
                            <input type="text" placeholder="Indique precio total" />
                        </div>

                        <Button className="bg-dark">Crear</Button>
                    </form>

                </Col>
                <Col >
                    <table className="bg-warning">
                        <thead>
                            <tr>
                                <th className="text-center">Cliente</th>
                                <th className="text-center">Total Deudor</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mostrarItem.map((item) => (
                                    <tr key={item._id}>
                                        <td className="text-center" data-titulo="Cliente">{item.nameCliente}</td>
                                        <td className="text-center" data-titulo="Total Deudor">{item.total}</td>
                                        <td data-titulo="Opciones">
                                            <Button variant='outline-success' className="m-1">
                                                <i className="bi bi-pencil-square">Cambiar Estado</i>
                                            </Button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>

        </>
    )
}

export default AcreedoresCrud
