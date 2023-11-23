import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudProveedores.module.css"
import { useEffect, useState } from "react";
import { API_URI } from "../common/constantes";

function CrudProveedores() {
    const [allData, setAllData] = useState([])
    const [showNuevoProveeForm, setshowNuevoProveeForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    const [nameEmpresaItem, setnameEmpresaItem] = useState([])
    const [nameEncargadoItem, setnameEncargadoItem] = useState([])
    const [telefonoItem, settelefonoItem] = useState([])
    const [direccionItem, setdireccionItem] = useState([])
    // const [productItem, setproductItem] = useState([])

    const [updateId, setupdateId] = useState([])
    const [updatenameEmpresa, setupdatenameEmpresa] = useState([])
    const [updatenameEncargado, setupdatenameEncargado] = useState([])
    const [updateTelefono, setupdateTelefono] = useState([])
    const [updateDirecc, setupdateDirecc] = useState([])
    // const [updateproductItem, setupdateproductItem] = useState([])

    const [deleteId, setDeleteId] = useState("");

    const getListApi = async () => {
        try {
            console.log("Fetching data from API...");

            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/proveedores/get", requestOptions)
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
                name_empresa: nameEmpresaItem,
                name_encargado: nameEncargadoItem,
                telefono: telefonoItem,
                direccion: direccionItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/proveedores/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el Proveedor");
            setnameEmpresaItem("");
            setnameEncargadoItem("");
            settelefonoItem("");
            setdireccionItem("");
            setshowNuevoProveeForm(true);
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
                name_empresa: updatenameEmpresa,
                name_encargado: updatenameEncargado,
                telefono: updateTelefono,
                direccion: updateDirecc
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(
                API_URI + "/proveedores/update/" + updateId, requestOptions)
            if (!response.ok) throw new Error("No se pudo actualizar el empleado");

            setShowSuccessModal(true);
            setShowUpdateModal(false);
            await getListApi();
        } catch (error) {
            console.error(error);
        }
    }
    const deleteItem = async () => {
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/proveedores/delete/" + deleteId, requestOptions)
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
        await updateItem()
    }
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
        <div className={Styles['div-de-proveedores']}>
            <Container>
                {/* FORM Y BUTTON PARA CREAR NUEVO ITEM */}
                <Row className="d-flex flex-row flex-column m-1">
                    <Col className={Styles['col-de-proveedores']}>
                        <h2>Proveedores</h2>
                        <button className={Styles['button-de-proveedores']}
                            // variant="info"
                            onClick={() => {
                                setshowNuevoProveeForm((prevState) => !prevState);
                            }}
                        > <i className="bi bi-plus-circle-fill"></i>  Agregar nuevo proveedor</button>
                        <form className={`bg-secondary ${Styles["nuevoItem__provee-form"]}`} style={{ display: showNuevoProveeForm ? "flex" : "none", height: showNuevoProveeForm ? "auto" : "10px" }}>
                            <h4>
                                Agregar Nuevo
                            </h4>
                            <div className={Styles['container-div-del-form']}>
                                <label>Nombre de la Empresa</label>
                                <input
                                    type="text"
                                    placeholder="Nombre de la empresa"
                                    value={nameEmpresaItem}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setnameEmpresaItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Nombre del Encargado</label>
                                <input type="text" placeholder="Nombre del encargado" value={nameEncargadoItem} className={Styles['input-form']} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setnameEncargadoItem(onlyLettersAndSpaces);

                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Phonenumber</label>
                                <input type="tel" placeholder="Your phonenumber" value={telefonoItem} className={Styles['input-form']} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    settelefonoItem(onlyNumbers);
                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Direccion</label>
                                <input type="email" placeholder="Direccion" value={direccionItem} className={Styles['input-form']} onChange={(e) => setdireccionItem(e.target.value)} />
                            </div>
                            <button className={Styles['button-de-proveedores']} onClick={handleSubmit}
                                disabled={
                                    !nameEmpresaItem ||
                                    !nameEncargadoItem ||
                                    !telefonoItem ||
                                    !direccionItem
                                }>Agregar</button>
                        </form>
                    </Col>
                </Row>

                {/* FORM PARA ACTUALIZAR NUEVO- MODAL  */}
                <Modal
                    show={showUpdateModal}
                    onHide={() => setShowUpdateModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">
                            Actualizar Datos
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="">
                            <h1>
                                Actualizar
                            </h1>
                            <div className="m-1">
                                <label className="mx-2">Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    maxLength={25}
                                    value={updatenameEmpresa} onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdatenameEmpresa(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className="m-1">
                                <label className="mx-2">Apellido</label>
                                <input type="text" placeholder="Your Apellido" value={updatenameEncargado} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setupdatenameEncargado(onlyLettersAndSpaces);
                                }} />
                            </div>
                            <div className="m-1">
                                <label className="mx-2">Phonenumber</label>
                                <input type="tel" placeholder="Your phonenumber" value={updateTelefono} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setupdateTelefono(onlyNumbers);
                                }} />
                            </div>
                            <div className="m-1">
                                <label className="mx-2">Correo</label>
                                <input type="email" placeholder="correo@example.com" value={updateDirecc} onChange={(e) => setupdateDirecc(e.target.value)} />
                            </div>
                            {/* <div className="">
                                <label>Productos</label>
                                <input type="text" placeholder="Productos que provee" value={updateApellido} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setupdateproductItem(onlyLettersAndSpaces);
                                }} />
                            </div> */}
                            <button className={`my-1 mx-4 ${Styles["button-de-proveedores"]}`} onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                            <button className={`my-1 mx-4 ${Styles["button-de-proveedores"]}`} onClick={handleUpdate}
                                disabled={
                                    !updatenameEmpresa ||
                                    !updatenameEncargado ||
                                    !updateTelefono ||
                                    !updateDirecc
                                    // !updateproductItem
                                }>Actualizar</button>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* TABLA QUE RENDERIZA LO QUE TRAE DEL BACK  */}

                <div className={`bg-warning ${Styles["contenedor-de-proveedores"]}`}>
                    <table className={`bg-warning ${Styles["tabla-de-proveedores"]}`}>
                        <thead>
                            <tr>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Apellido</th>
                                <th className="text-center">Telefono</th>
                                <th className="text-center">Correo</th>
                                {/* <th className="text-center">Productos</th> */}
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allData?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center" data-titulo="Nombre">{item.name_empresa}</td>
                                        <td className="text-center" data-titulo="Apellido">{item.name_encargado}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.telefono}</td>
                                        <td className="text-center" data-titulo="correo">{item.direccion}</td>
                                        {/* <td className="text-center" data-titulo="Productos">{item.productos}</td> */}
                                        <td className="text-center" data-titulo="Opciones">
                                            <Button variant='outline-danger' className="m-1" onClick={() => {
                                                handleDeletePersonal(item.id);
                                            }}>
                                                <i className="bi bi-trash-fill" ></i>
                                            </Button>
                                            <Button variant='outline-success' className="m-1" onClick={() => {
                                                setShowUpdateModal(true);
                                                setupdateId(item.id)
                                                setupdatenameEmpresa(item.name_empresa)
                                                setupdatenameEncargado(item.name_encargado)
                                                setupdateTelefono(item.telefono)
                                                setupdateDirecc(item.direccion)
                                            }}>
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* MODAL PARA ELIMINAR ITEM DE LA TABLA  */}
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

                {/* MODAL GENERICO PARA CONFIRMA ACCION  */}
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

            </Container>
        </div>
    )
}

export default CrudProveedores;
