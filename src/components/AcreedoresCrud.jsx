import { useEffect, useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"
import { API_URI } from "../common/constantes";

function AcreedoresCrud() {
    const [allData, setAllData] = useState([])

    const [showNuevoAcreeForm, setshowNuevoAcreeForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [dataCliente, setdataCliente] = useState([])
    const [dataVenta, setdataVenta] = useState([])
    const [totalDeudorItem, settotalDeudorItem] = useState([])

    const [updateId, setupdateId] = useState("");
    const [updatedataCliente, setupdatedataCliente] = useState([])
    const [updatedataVenta, setupdatedataVenta] = useState([])
    const [updatetotalDeudorItem, setupdatetotalDeudorItem] = useState([])

    const [deleteId, setDeleteId] = useState("");

    const getListApi = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/acreedores/get", requestOptions)
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
                ventas_id: dataVenta,
                total_deudor: totalDeudorItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/acreedores/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el Empleado");
            setdataCliente("")
            setdataVenta("")
            settotalDeudorItem("")
            setshowNuevoAcreeForm(true);
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
                ventas_id: updatedataVenta,
                total_deudor: updatetotalDeudorItem
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(
                API_URI + "/acreedores/update/" + updateId, requestOptions)
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

            const response = await fetch(API_URI + "/acreedores/delete/" + deleteId, requestOptions)
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
    // showNuevoAcreeForm

    return (
        <div className={Styles['div-de-acreedores']}>
            <Row className="d-flex flex-column m-1">
                <Col className={Styles['col-de-acreedores']}>
                    <h2 className={Styles['titulo-de-acreedores']} >Acreedores Varios</h2>
                    <Button className={`m-2 ${Styles['button-de-pedidos']}`}
                        variant="info"
                        onClick={() => {
                            setshowNuevoAcreeForm((prevState) => !prevState);
                        }}
                    ><i className="bi bi-person-fill-add"></i>Nuevo acreedor</Button>
                    <form className={`bg-secondary ${Styles["nuevoItem__acree-form"]}`} style={{ display: showNuevoAcreeForm ? "flex" : "none", height: showNuevoAcreeForm ? "auto" : "10px" }}>
                        <h4 className={Styles['titulo-de-acreedores']}>    Nuevo acreedor </h4>
                        <div className={Styles['container-div-del-form']}>
                            <label>N° Cliente</label>
                            <input type="text" placeholder="Busque el numero que le corresponde al cliente" className={Styles['input-form']} value={dataCliente} onChange={(e) => {
                                const input = e.target.value;
                                const onlyNumbers = input.replace(/[^0-9]/g, "");
                                setdataCliente(onlyNumbers)
                            }} />
                        </div>
                        <div className={Styles['container-div-del-form']}>
                            <label>N° Venta</label>
                            <input type="text" placeholder="Busque el numero que le corresponde a la venta" className={Styles['input-form']} value={dataVenta} onChange={(e) => {
                                const input = e.target.value;
                                const onlyNumbers = input.replace(/[^0-9]/g, "");
                                setdataVenta(onlyNumbers)
                            }} />
                        </div>
                        <div className={Styles['container-div-del-form']}>
                            <label>Precio Deudor</label>
                            <input type="text" placeholder="Indique total fiado" className={Styles['input-form']} value={totalDeudorItem} onChange={(e) => {
                                const input = e.target.value;
                                const onlyNumbersAndDot = input.replace(/[^\d.]/g, "");
                                settotalDeudorItem(onlyNumbersAndDot);
                            }} />
                        </div>
                        <button className={`m-5 ${Styles["button-de-pedidos"]}`}
                            onClick={handleSubmit}
                            disabled={
                                !dataCliente ||
                                !dataVenta ||
                                !totalDeudorItem}>Crear</button>
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
                                <label>N° Cliente</label>
                                <input type="text" placeholder="Busque el numero que le corresponde al cliente" className={Styles['input-form']} value={updatedataCliente} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setupdatedataCliente(onlyNumbers)
                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>N° Venta</label>
                                <input type="text" placeholder="Busque el numero que le corresponde a la venta" className={Styles['input-form']} value={updatedataVenta} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setupdatedataVenta(onlyNumbers)
                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Precio Deudor</label>
                                <input type="text" placeholder="Indique total fiado" className={Styles['input-form']} value={updatetotalDeudorItem} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbersAndDot = input.replace(/[^\d.]/g, "");
                                    setupdatetotalDeudorItem(onlyNumbersAndDot);
                                }} />
                            </div>
                            <button onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                            <Button className="bg-danger" onClick={handleUpdate}
                                disabled={
                                    !updatedataCliente ||
                                    !updatedataVenta ||
                                    !updatetotalDeudorItem
                                }>Actualizar</Button>
                        </form>
                    </Modal.Body>
                </Modal>

                <Col className={Styles['col-de-acreedores-2']}>
                    <h2 className={Styles['titulo-de-acreedores']}>Tabla de Acreedores existentes</h2>
                    <table className={Styles['tabla-de-acreedores']}>
                        <thead>
                            <tr className={Styles['bordes-blancos']}>
                                <th className="text-center">ID Cliente</th>
                                <th className="text-center">ID Venta</th>
                                <th className="text-center">Total Deudor</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center" data-titulo="ID Cliente">{item.clientes_id}</td>
                                        <td className="text-center" data-titulo="ID Venta">{item.ventas_id}</td>
                                        <td className="text-center" data-titulo="Total Deudor">{item.total_deudor}</td>
                                        <td className="text-center" data-titulo="Opciones">
                                            {/* <Button variant='outline-success' className="m-1">
                                                <i className="bi bi-pencil-square">Cambiar Estado</i>
                                            </Button> */}
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
                                                    setupdatedataVenta(item.ventas_id)
                                                    setupdatetotalDeudorItem(item.total_deudor);
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

        </div>
    )
}

export default AcreedoresCrud
