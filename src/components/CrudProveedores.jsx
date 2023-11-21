import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudProveedores.module.css"
import { useEffect, useState } from "react";

function CrudProveedores() {
    const mostrarItem = [
        { _id: 1, name: "Rogelio Bermudes", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "frutas" },
        { _id: 2, name: "Sandra Raco", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "frutas" },
        { _id: 3, name: "Carlos Peremulter", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "frutas" },
        { _id: 4, name: "Sabrina Perez", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "frutas" },
        { _id: 5, name: "Octavio Ponce", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "verduras" },
        { _id: 6, name: "Silvina Escupidero", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "verduras" },
        { _id: 7, name: "Roberta Rojo", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "verduras" },
        { _id: 8, name: "Ellen Sanchez", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "verduras" },
        { _id: 9, name: "Sasha Costa", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333, productos: "verduras" }
    ]


    // const [listApi, setlistApi] = useState([])
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
        <div className={Styles['div-de-proveedores']}>
            <Container>
                {/* FORM Y BUTTON PARA CREAR NUEVO ITEM */}
                <Row className="d-flex flex-row flex-column m-1">
                    <Col className={Styles['col-de-proveedores']}>
                        <h2>Proveedores</h2>
                        <button className={Styles['button-de-proveedores']}
                        variant="info"
                        onClick={() => {
                            setshowNuevoProveeForm((prevState) => !prevState);
                    }}
                    > <i className="bi bi-plus-circle-fill"></i>  Agregar nuevo proveedor</button>
                        <form className={`bg-secondary ${Styles["nuevoItem__provee-form"]}`} style={{ display: showNuevoProveeForm ? "flex" : "none", height: showNuevoProveeForm ? "auto" : "10px" }}>
                            <h4>
                                Agregar Nuevo
                            </h4>
                            <div className={Styles['container-div-del-form']}>
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={nameItem}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setnameItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Apellido</label>
                                <input type="text" placeholder="Your Apellido" value={apellidoItem} className={Styles['input-form']} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setapellidoItem(onlyLettersAndSpaces);

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
                                <label>Correo</label>
                                <input type="email" placeholder="correo@example.com" value={correoItem} className={Styles['input-form']} onChange={(e) => setcorreoItem(e.target.value)} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Dni</label>
                                <input type="tel" placeholder="Your DNI" value={dniItem} className={Styles['input-form']} onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setdniItem(onlyNumbers);
                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Productos que provee</label>
                                <input type="text" placeholder="Productos" value={apellidoItem} className={Styles['input-form']} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setproductItem(onlyLettersAndSpaces);

                                }} />
                            </div>
                            <button className={Styles['button-de-proveedores']} onClick={handleSubmit}
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
                {/* <div className={Styles["tabla-de-proveedores"]}> */}
                <div className={`bg-warning ${Styles["contenedor-de-proveedores"]}`}>
                <table className={`bg-warning ${Styles["tabla-de-proveedores"]}`}>
                        <thead>
                            <tr>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Apellido</th>
                                <th className="text-center">Telefono</th>
                                <th className="text-center">Correo</th>
                                <th className="text-center">N° DNI</th>
                                <th className="text-center">Productos</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mostrarItem.map((item) => (
                                    <tr key={item._id}>
                                        <td className="text-center" data-titulo="Nombre">{item.name}</td>
                                        <td className="text-center" data-titulo="Apellido">{item.apellido}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.telefono}</td>
                                        <td className="text-center" data-titulo="correo">{item.correo}</td>
                                        <td className="text-center" data-titulo="N° DNI">{item.dni}</td>
                                        <td className="text-center" data-titulo="Productos">{item.productos}</td>
                                        <td className="text-center" data-titulo="Opciones">
                                            <Button variant='outline-danger' className="m-1" onClick={() => {
                                                handleDeletePersonal(item._id);
                                            }}>
                                                <i className="bi bi-trash-fill" ></i>
                                            </Button>
                                            <Button variant='outline-success' className="m-1" onClick={() => {
                                                    setShowUpdateModal(true);
                                                    setupdateId(item._id)
                                                    setupdateName(item.name)
                                                    setupdateApellido(item.apellido)
                                                    setupdateTelefono(item.telefono)
                                                    setupdateCorreo(item.correo)
                                                    setupdateDni(item.dni)
                                                    setupdateproductItem(item.productos)
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

export default CrudProveedores
