import { useState } from "react"
import { Accordion, Button, Col, Row } from "react-bootstrap";
import Styles from "../styles/crudStock.module.css"

function SalidasCrud() {
    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)

    const articulosPrueba = [
        { _id: 1, producto: "Banana", cantidad: "50k", precio: 100.0},
        { _id: 2,  producto: "Manzana", cantidad: "50k", precio: 100.0},
        { _id: 3,  producto: "Apio", cantidad: "50k", precio: 100.0},
        { _id: 4,  producto: "Rucula", cantidad: "50k", precio: 100.0},
        { _id: 5,  producto: "Acelga", cantidad: "50k", precio: 100.0},
        { _id: 6,  producto: "Espinaca", cantidad: "50k", precio: 100.0},
        { _id: 7,  producto: "Pera", cantidad: "50k", precio: 100.0},
        { _id: 8,  producto: "Frutilla", cantidad: "50k", precio: 100.0},
        { _id: 9,  producto: "Tomate", cantidad: "50k", precio: 100.0},
        { _id: 10,  producto: "Zanahoria", cantidad: "50k", precio: 100.0},
    ]
    return (
        <>
        <Row className="d-flex flex-row flex-column m-1">
                <Col>
                    <h2>Salidas</h2>

                    <Button
                        variant="info"
                        onClick={() => {
                            setshowNuevoPedidoForm((prevState) => !prevState);

                        }}
                    >Nuevo</Button>
                    <form className={`bg-secondary ${Styles["nuevoItem__salidas-form"]}`} style={{ height: showNuevoPedidoForm ? "auto" : undefined }}>
                        <h4>
                            Nuevo Pedido
                        </h4>
                        <div className="">
                            <label>N° Pedido</label>
                            <input
                                type="number"
                                placeholder="Indique numero de pedido"
                            />
                        </div>
                        <div className="">
                            <label>Nombre y apellido</label>
                            <input type="text" placeholder="Nombre y apellido de quien hace el pedido" />
                        </div>
                        <div className="">
                            <label>Telefono</label>
                            <input type="tel" placeholder="Telefono del cliente" />
                        </div>

                        <div className="col-10">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Articulos</Accordion.Header>
                                    <Accordion.Body className="d-flex flex-column">
                                        {articulosPrueba.map((articulo) => (
                                            <div key={articulo._id} className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`articuloCheckbox${articulo._id}`}
                                                    value={articulo.nameArt}
                                                />
                                                <label className="form-check-label" htmlFor={`articuloCheckbox${articulo._id}`}>
                                                    {articulo.nameArt}
                                                </label>
                                            </div>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="">
                            <label>Precio Total</label>
                            <input type="text" placeholder="Indique precio total del pedido" />
                        </div>
                        <Button className="bg-dark">Crear</Button>
                        {/* <Button className="bg-dark" onClick={agregarNuevoPedido}>Crear</Button> */}

                    </form>
                </Col>

                <Col >
                    <table className="bg-warning">
                        <thead>
                            <tr>
                                <th className="text-center">Code</th>
                                <th className="text-center">Producto</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center">Precio x Kilo</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articulosPrueba.map((item) => (
                                    <tr key={item._id}>
                                        <td className="text-center" data-titulo="Code">{item._id}</td>
                                        <td className="text-center" data-titulo="Producto">{item.producto}</td>
                                        <td className="text-center" data-titulo="Cantidad">{item.cantidad}</td>
                                        <td className="text-center" data-titulo="Precio x Kilo">{item.precio}</td>
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

export default SalidasCrud
