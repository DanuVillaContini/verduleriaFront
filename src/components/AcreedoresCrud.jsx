// import { useEffect } from "react";
import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"

function AcreedoresCrud() {
    const [showNuevoAcreeForm, setshowNuevoAcreeForm] = useState(false)

    showNuevoAcreeForm

    const mostrarItem = [
        { _id: 1, numPedido: 1, total: 7.2, descrip: "manzana + pera + motadela" },
        { _id: 2, numPedido: 2, total: 8.5, descrip: "manzana + pera + motadela" },
        { _id: 3, numPedido: 3, total: 9.0, descrip: "manzana + pera + motadela" },
        { _id: 4, numPedido: 4, total: 6.8, descrip: "manzana + pera + motadela" },
        { _id: 5, numPedido: 5, total: 8.0, descrip: "manzana + pera + motadela" },
        { _id: 6, numPedido: 6, total: 7.5, descrip: "manzana + pera + motadela" },
        { _id: 7, numPedido: 7, total: 8.9, descrip: "manzana + pera + motadela" },
        { _id: 8, numPedido: 8, total: 9.2, descrip: "manzana + pera + motadela" },
        { _id: 9, numPedido: 9, total: 8.7, descrip: "manzana + pera + motadela" }
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
                            Nuevo Pedido
                        </h4>
                        <div className="">
                            <label>Numero de Pedido</label>
                            <input
                                type="number"
                                placeholder="Indique numero de pedido"
                            />
                        </div>
                        <div className="">
                            <label>Precio Total</label>
                            <input type="text" placeholder="Indique precio total" />
                        </div>
                        <div className="">
                            <label>Descripcion</label>
                            <input type="tel" placeholder="Indique productos que contiene el pedido" />
                        </div>
                        <Button className="bg-dark">Crear</Button>
                    </form>

                </Col>
                <Col >
                    <table className="bg-warning">
                        <thead>
                            <tr>
                                <th className="text-center">Numero de Pedido</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Descripcion</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mostrarItem.map((item) => (
                                    <tr key={item._id}>
                                        <td className="text-center" data-titulo="Numero de Pedido">{item.numPedido}</td>
                                        <td className="text-center" data-titulo="Apellido">{item.total}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.descrip}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.descrip}</td>
                                        <td data-titulo="Opciones">
                                            <Button variant='outline-danger' className="m-1">
                                                <i className="bi bi-trash-fill" ></i>
                                            </Button>
                                            <Button variant='outline-success' className="m-1">
                                                <i className="bi bi-pencil-square"></i>
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
