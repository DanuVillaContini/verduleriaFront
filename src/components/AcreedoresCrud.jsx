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
        <div className={Styles['div-de-acreedores']}>
            <Row className="d-flex flex-column m-1">
                <Col className={Styles['col-de-acreedores']}>
                    <h2 className={Styles['titulo-de-acreedores']} >Acreedores Varios</h2>
                    <button className={Styles['button-de-pedidos']}
                        variant="info"
                        onClick={() => {
                            setshowNuevoAcreeForm((prevState) => !prevState);

                        }}
                    ><i class="bi bi-person-fill-add"></i>Nuevo acreedor</button>
                    <form className={`bg-secondary ${Styles["nuevoItem__acree-form"]}`} style={{ height: showNuevoAcreeForm ? "auto" : undefined }}>
                        <h4 className={Styles['titulo-de-acreedores']}>    Nuevo acreedor </h4>
                        <div className={Styles['container-div-del-form']}>
                            <label>Nombre y apellido</label>
                            <input className={Styles['input-form']} type="text" placeholder="Julio César" />
                        </div>
                        <div className={Styles['container-div-del-form']}>
                            <label>Domicilio</label>
                            <input className={Styles['input-form']} type="text" placeholder="Gotham city 1010" />
                        </div>
                        <div className={Styles['container-div-del-form']}>
                            <label>Teléfono</label>
                            <input className={Styles['input-form']} type="text" placeholder="+1 8 5555 5555" />
                        </div>
                        <div className={Styles['container-div-del-form']}>
                            <label>Total Deudor</label>
                            <input className={Styles['input-form']} type="text" placeholder="Indique precio total" />
                        </div>

                        <button className={`bg-dark mt-5 ${Styles["button-de-pedidos"]}`}> <i class="bi bi-plus-circle"></i> Crear</button>
                    </form>

                </Col>
                <Col className={Styles['col-de-acreedores-2']}>
                    <table className={Styles['tabla-de-acreedores']}>
                        <thead>
                            <tr className={Styles['bordes-blancos']}>
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
                                        <td className="text-center" data-titulo="Opciones">
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

        </div>
    )
}

export default AcreedoresCrud
