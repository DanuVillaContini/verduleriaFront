import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"

function PedidosCrud() {
    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)
    // const [nuevoArticulo, setNuevoArticulo] = useState("");

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
    // const agregarNuevoPedido = () => {
    //     if (nuevoArticulo) {
    //         const nuevoPedido = {
    //             _id: mostrarItem.length + 1, // Ajusta el valor de _id según tus necesidades
    //             numPedido: mostrarItem.length + 1, // Ajusta el valor de numPedido según tus necesidades
    //             nameCliente: "Nombre del Cliente",
    //             telefon: "Teléfono del Cliente",
    //             total: "Precio Total",
    //             descrip: nuevoArticulo, // Agrega el valor del select
    //         };

    //         // Actualiza el estado de mostrarItem con el nuevo pedido
    //         setMostrarItem((prevItems) => [...prevItems, nuevoPedido]);

    //         // Restablece el valor del estado nuevoArticulo
    //         setNuevoArticulo("");
    //     }
    // };
    return (
        <>
            <Row className="d-flex flex-row flex-column m-1">
                <Col>
                    <h2>Pedidos Deliveri</h2>

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

                        <div className="">
                            <label>Articulos</label>
                            <select>
                                {/* <select value={nuevoArticulo}
                                onChange={(e) => setNuevoArticulo(e.target.value)}></select> */}
                                <option value="">Opciones</option>
                                <option value="Bananas">Bananas</option>
                                <option value="Zanahorias">Zanahorias</option>
                                <option value="Espinacas">Espinacas</option>
                                <option value="Manzanas">Manzanas</option>
                                <option value="Peras">Peras</option>
                                <option value="Zanahorias">Zanahorias</option>
                                <option value="Espinacas">Espinacas</option>
                            </select>
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
