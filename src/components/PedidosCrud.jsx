import { useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"
import { API_URI } from "../common/constantes";
import { useEffect } from "react";

function PedidosCrud() {
    const [allData, setAllData] = useState([])

    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [idPedido, setidPedido] = useState([])
    const [dataCliente, setdataCliente] = useState([])
    const [totalItem, settotalItem] = useState([])

    const [updateId, setupdateId] = useState("");
    const [updatedataCliente, setupdatedataCliente] = useState([])
    const [updatetotalItem, setupdatetotalItem] = useState([])

    const [deleteId, setDeleteId] = useState("");

    const getListApi = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/pedidos/get", requestOptions)
            if (!response.ok) {
                console.error("Error fetching data:", response.statusText);
                return;
            }

            const result = await response.json();

            if (Array.isArray(result)) {
                console.log("Data received:", result);
                setAllData(result);
            } else {
                console.error("Error: Unexpected response format - expected an array", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const nuevoItem = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                clientes_id: dataCliente,
                total: totalItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/pedidos/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el Empleado");
            setdataCliente("")
            settotalItem("")
            setshowNuevoPedidoForm(true);
            setShowSuccessModal(false);
            await getListApi();
        } catch (error) {
            console.error(error);
        }
    }
    const updateItem = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                clientes_id: updatedataCliente,
                total: updatetotalItem
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(
                API_URI + "/pedidos/update/" + updateId, requestOptions)
            if (!response.ok) throw new Error("No se pudo actualizar el empleado");

            setShowSuccessModal(true);
            setShowUpdateModal(false);
            await getListApi();

        } catch (error) {
            console.error(error);
        }
    };
    const deleteItem = async () => {
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/pedidos/delete/" + deleteId, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el empleado")
            setDeleteId("");
            setShowSuccessModal(true);
            setShowDeleteModal(false);
            await getListApi()

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async () => {
        await nuevoItem()
    }
    const handleUpdate = async () => {
        await updateItem();
    };
    const handleDeletePersonal = async (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    }
    const handleConfirmDelete = async () => {
        await deleteItem(deleteId);
    }
    useEffect(() => {
        getListApi()
    }, [])
    return (
        <div className={Styles['div-de-pedidos']}>
            <Row className="d-flex flex-row flex-column m-1">
                {/* FORM CREAR  */}
                <Col className={Styles['col-de-acreedores']}>
                    <h2>Pedidos Delivery</h2>
                    <Button className={Styles['button-de-pedidos']}
                        variant="info"
                        onClick={() => {
                            setshowNuevoPedidoForm((prevState) => !prevState);
                        }}
                    > <i className="bi bi-plus-circle-fill"></i>  Agregar nuevo pedido</Button>
                    <form className={`bg-secondary ${Styles["nuevoItem__pedidos-form"]}`} style={{ display: showNuevoPedidoForm ? "flex" : "none", height: showNuevoPedidoForm ? "auto" : "10px" }}>
                        <h4 className={Styles['texto-de-nuevo-pedido']}>
                            Nuevo Pedido
                        </h4>
                        <div className={Styles['container-div-del-form']}>
                            <label>N° Cliente</label>
                            <input type="text" placeholder="Busque el numero que le corresponde al cliente" className={Styles['input-form']} value={dataCliente} onChange={(e) => {
                                const input = e.target.value;
                                const onlyNumbers = input.replace(/[^0-9]/g, "");
                                setdataCliente(onlyNumbers)
                            }} />
                        </div>
                        {/* <div className="col-10 m-5">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Articulos</Accordion.Header>
                                    <Accordion.Body className="d-flex flex-column">
                                        {allData.map((articulo) => (
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
                        </div> */}
                        <div className={Styles['container-div-del-form']}>
                            <label>Precio Total</label>
                            <input type="text" placeholder="Indique precio total del pedido" className={Styles['input-form']} value={totalItem} onChange={(e) => {
                                const input = e.target.value;
                                const onlyNumbers = input.replace(/[^0-9]/g, "");
                                settotalItem(onlyNumbers);
                            }} />
                        </div>
                        <button className={`m-5 ${Styles["button-de-pedidos"]}`}
                            onClick={handleSubmit}
                            disabled={
                                !dataCliente ||
                                !totalItem}>Crear</button>

                    </form>
                </Col>

                {/* FORM UPDATE  */}
                <Modal
                    show={showUpdateModal}
                    onHide={() => setShowUpdateModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">
                            Actualizar Pedido
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="bg-success">
                            <h1>
                                Actualizar
                            </h1>
                            <div className="">
                                <label>Cliente</label>
                                <input
                                    type="text"
                                    placeholder="n° cliente"
                                    maxLength={25}
                                    value={updatedataCliente} onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdatedataCliente(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className="">
                                <label>Total</label>
                                <input type="tel" placeholder="Your phonenumber" value={updatetotalItem} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setupdatetotalItem(onlyNumbers);
                                }} />
                            </div>
                            <button onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                            <Button className="bg-danger" onClick={handleUpdate}
                                disabled={
                                    !updatedataCliente ||
                                    !updatetotalItem
                                }>Actualizar</Button>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* TABLA RENDERIZA DATOS  */}
                <Col >
                    <table className={`bg-warning ${Styles["tabla-de-acreedores"]}`}>
                        <thead>
                            <tr>
                                <th className="text-center">N° Pedido</th>
                                <th className="text-center">Cliente</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allData?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center" data-titulo="N° Pedido">{item.id}</td>
                                        <td className="text-center" data-titulo="Cliente">{item.clientes_id}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.total}</td>
                                        <td data-titulo="Opciones">
                                            <Button variant='outline-danger' className="m-1"
                                                onClick={() =>
                                                    handleDeletePersonal(item.id)}>
                                                <i className="bi bi-trash-fill" ></i>
                                            </Button>
                                            <Button variant='outline-success' className="m-1"
                                                onClick={() => {
                                                    setShowUpdateModal(true);
                                                    setupdateId(item.id);
                                                    setupdatedataCliente(item.clientes_id)
                                                    setupdatetotalItem(item.total);
                                                }}>
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
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace ">
                        Confirmar eliminación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace ">
                    ¿Estás seguro de que deseas eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                    <button
                        onClick={handleConfirmDelete}>Si</button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace ">
                        Operación exitosa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace ">
                    La operación se ha realizado exitosamente.
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={() => setShowSuccessModal(false)}
                    >Ok</button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default PedidosCrud
