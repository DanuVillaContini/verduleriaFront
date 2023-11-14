import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudProveedores.module.css"
import { useEffect, useState } from "react";

function CrudProveedores() {
    const [listApi, setlistApi] = useState([])
    const [showNuevoProveeForm, setshowNuevoProveeForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    const [nameItem, setnameItem] = useState([])
    const [apellidoItem, setapellidoItem] = useState([])
    const [telefonoItem, settelefonoItem] = useState([])
    const [correoItem, setcorreoItem] = useState([])
    const [dniItem, setdniItem] = useState([])
    const [productItem, setproductItem] = useState([])

    const [updateId, setupdateId] = useState([])
    const [updateName, setupdateName] = useState([])
    const [updateApellido, setupdateApellido] = useState([])
    const [updateTelefono, setupdateTelefono] = useState([])
    const [updateCorreo, setupdateCorreo] = useState([])
    const [updateDni, setupdateDni] = useState([])
    const [updateproductItem, setupdateproductItem] = useState([])

    const [deleteId, setDeleteId] = useState("");

    const getListApi = async () => {
        //funcion fetch para traer todo lo del backend
    }
    const nuevoItem = async () => {
        //funcion fetch para crear nuevo
    }
    const updateItem = async () => {
        //funcion fetch para actualizar nuevo
    }
    const deleteItem = async (_id) => {
        //funcion fetch para eliminar nuevo

    }
    const handleSubmit = async () => {
        await nuevoItem()
    }
    const handleUpdate = async (_id) => {
        await updateItem(_id)
    }
    const handleDeletePersonal = async (_id) => {
        setDeleteId(_id);
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = async () => {
        await deleteItem(deleteId);
    }
    useEffect(() => {
        getListApi()
    }, [])
    return (
        <div>
            <Container>
                {/* FORM Y BUTTON PARA CREAR NUEVO ITEM */}
                <Row className="d-flex flex-row flex-column m-1">
                    <Col>
                        <h1>Proveedores</h1>
                        <Button
                            variant="info"
                            onClick={() => {
                                setshowNuevoProveeForm((prevState) => !prevState);
                            }}
                        >Nuevo</Button>
                        <form className={`bg-secondary ${Styles["nuevoItem__provee-form"]}`} style={{ height: showNuevoProveeForm ? "auto" : undefined }}>
                            <h1>
                                Agregar Nuevo
                            </h1>
                            <div className="">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={nameItem}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setnameItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className="">
                                <label>Apellido</label>
                                <input type="text" placeholder="Your Apellido" value={apellidoItem} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setapellidoItem(onlyLettersAndSpaces);

                                }} />
                            </div>
                            <div className="">
                                <label>Phonenumber</label>
                                <input type="tel" placeholder="Your phonenumber" value={telefonoItem} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    settelefonoItem(onlyNumbers);
                                }} />
                            </div>
                            <div className="">
                                <label>Correo</label>
                                <input type="email" placeholder="correo@example.com" value={correoItem} onChange={(e) => setcorreoItem(e.target.value)} />
                            </div>
                            <div className="">
                                <label>Dni</label>
                                <input type="tel" placeholder="Your DNI" value={dniItem} onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setdniItem(onlyNumbers);
                                }} />
                            </div>
                            <div className="">
                                <label>Productos que provee</label>
                                <input type="text" placeholder="Productos" value={apellidoItem} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setproductItem(onlyLettersAndSpaces);

                                }} />
                            </div>
                            <button className="bg-danger" onClick={handleSubmit}
                                disabled={
                                    !nameItem ||
                                    !apellidoItem ||
                                    !telefonoItem ||
                                    !correoItem ||
                                    !dniItem ||
                                    !productItem
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
                        <form className="bg-success">
                            <h1>
                                Actualizar
                            </h1>
                            <div className="">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    maxLength={25}
                                    value={updateName} onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdateName(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className="">
                                <label>Apellido</label>
                                <input type="text" placeholder="Your Apellido" value={updateApellido} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setupdateApellido(onlyLettersAndSpaces);
                                }} />
                            </div>
                            <div className="">
                                <label>Phonenumber</label>
                                <input type="tel" placeholder="Your phonenumber" value={updateTelefono} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setupdateTelefono(onlyNumbers);
                                }} />
                            </div>
                            <div className="">
                                <label>Correo</label>
                                <input type="email" placeholder="correo@example.com" value={updateCorreo} onChange={(e) => setupdateCorreo(e.target.value)} />
                            </div>
                            <div className="">
                                <label>Dni</label>
                                <input type="tel" placeholder="Your DNI" value={updateDni} onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setupdateDni(onlyNumbers);
                                }} />
                            </div>
                            <div className="">
                                <label>Productos</label>
                                <input type="text" placeholder="Productos que provee" value={updateApellido} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setupdateproductItem(onlyLettersAndSpaces);
                                }} />
                            </div>
                            <button onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                            <button className="bg-danger" onClick={handleUpdate}
                                disabled={
                                    !updateName ||
                                    !updateApellido ||
                                    !updateTelefono ||
                                    !updateCorreo ||
                                    !updateDni ||
                                    !updateproductItem
                                }>Actualizar</button>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* TABLA QUE RENDERIZA LO QUE TRAE DEL BACK  */}
                <Row>
                    <table className="bg-warning">
                        <thead>
                            <tr>
                                <th className="">Nombre</th>
                                <th className="">Apellido</th>
                                <th className="">Telefono</th>
                                <th className="">Correo</th>
                                <th className="">N° DNI</th>
                                <th className="">Productos</th>
                                <th className="">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listApi.map((item) => (
                                    <tr key={item._id}>
                                        <td data-titulo="Nombre">{item.name}</td>
                                        <td data-titulo="Apellido">{item.apellido}</td>
                                        <td data-titulo="Telefono">{item.telefono}</td>
                                        <td data-titulo="correo">{item.correo}</td>
                                        <td data-titulo="N° DNI">{item.dni}</td>
                                        <td data-titulo="Productos">{item.productos}</td>
                                        <td data-titulo="Opciones">
                                            <button onClick={() => {
                                                handleDeletePersonal(item._id);
                                            }}>
                                                <i className="bi bi-trash"></i> Eliminar
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setShowUpdateModal(true);
                                                    setupdateId(item._id)
                                                    setupdateName(item.name)
                                                    setupdateApellido(item.apellido)
                                                    setupdateTelefono(item.telefono)
                                                    setupdateCorreo(item.correo)
                                                    setupdateDni(item.dni)
                                                    setupdateproductItem(item.productos)
                                                }}
                                            ><i className="bi bi-pencil-square">Update</i></button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Row>

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

export default CrudProveedores
