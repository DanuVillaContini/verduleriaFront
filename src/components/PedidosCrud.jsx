import { useState } from "react"
import { Accordion, Button, Col, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"

function PedidosCrud() {
    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)

    const mostrarItem = [
        { _id: 1, numPedido: 1, nameCliente: "Rogelio Bermudes", telefon: 381222333, total: 7.2, descrip: "manzana + pera + motadela" },
        { _id: 2, numPedido: 2, nameCliente: "Sandra Raco", telefon: 381222333, total: 8.5, descrip: "manzana + pera + motadela" },
        { _id: 3, numPedido: 3, nameCliente: "Carlos Peremulter", telefon: 381222333, total: 9.0, descrip: "manzana + pera + motadela" },
        { _id: 4, numPedido: 4, nameCliente: "Sabrina Perez", telefon: 381222333, total: 6.8, descrip: "manzana + pera + motadela" },
        { _id: 5, numPedido: 5, nameCliente: "Octavio Ponce", telefon: 381222333, total: 8.0, descrip: "manzana + pera + motadela" },
        { _id: 6, numPedido: 6, nameCliente: "Silvina Escupidero", telefon: 381222333, total: 7.5, descrip: "manzana + pera + motadela" },
        { _id: 7, numPedido: 7, nameCliente: "Roberta Rojo", telefon: 381222333, total: 8.9, descrip: "manzana + pera + motadela" },
        { _id: 8, numPedido: 8, nameCliente: "Ellen Sanchez", telefon: 381222333, total: 9.2, descrip: "manzana + pera + motadela" },
        { _id: 9, numPedido: 9, nameCliente: "Sasha Costa", telefon: 381222333, total: 8.7, descrip: "manzana + pera + motadela" }
    ]
    const articulosPrueba = [
        { _id: 1, nameArt: "Banana" },
        { _id: 2, nameArt: "Manzana" },
        { _id: 3, nameArt: "Apio" },
        { _id: 4, nameArt: "Rucula" },
        { _id: 5, nameArt: "Acelga" },
        { _id: 6, nameArt: "Espinaca" },
        { _id: 7, nameArt: "Pera" },
        { _id: 8, nameArt: "Frutilla" },
        { _id: 9, nameArt: "Tomate" },
        { _id: 10, nameArt: "Zanahoria" },
    ]

    return (
        <>
            <Row className="d-flex flex-row flex-column m-1">
                <Col>
                    <h2>Pedidos Delivery</h2>

                    <Button
                        variant="info"
                        onClick={() => {
                            setshowNuevoPedidoForm((prevState) => !prevState);

                        }}
                    >Nuevo</Button>
                    <form className={`bg-secondary ${Styles["nuevoItem__pedidos-form"]}`} style={{ height: showNuevoPedidoForm ? "auto" : undefined }}>
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
                                <th className="text-center">N° Pedido</th>
                                <th className="text-center">Cliente</th>
                                <th className="text-center">Telefono</th>
                                <th className="text-center">Articulos</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mostrarItem.map((item) => (
                                    <tr key={item._id}>
                                        <td className="text-center" data-titulo="N° Pedido">{item.numPedido}</td>
                                        <td className="text-center" data-titulo="Cliente">{item.nameCliente}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.telefon}</td>
                                        <td className="text-center" data-titulo="Articulos">{item.descrip}</td>
                                        <td className="text-center" data-titulo="Total">{"$" + item.total}</td>
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

export default PedidosCrud
