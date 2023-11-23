import { useEffect, useState } from "react"
import { Accordion, Button, Col, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudStock.module.css"
import { API_URI } from "../common/constantes";


function StockCrud() {
    const [allDataProduct, setAllDataProduct] = useState([])
    const [allDataStock, setAllDataStock] = useState([])


    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)
    const [showNuevoStockForm, setshowNuevoStockForm] = useState(false)
    // const [showUpdateProductModal, setShowUpdateProductModal] = useState(false)
    // const [showUpdateStockModal, setShowUpdateStockModal] = useState(false)

    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)
    const [showDeleteStockModal, setShowDeleteStockModal] = useState(false)

    const [showSuccessModal, setShowSuccessModal] = useState(false)


    //Const de Producto
    const [nameProduct, setnameProduct] = useState([])
    const [tipoItem, settipoItem] = useState([])
    //Const de Stock
    const [dataProduct, setdataProduct] = useState([])
    const [cantStock, setcantStock] = useState([])

    const [deleteIdProduct, setDeleteIdProduct] = useState("");
    const [deleteIdStock, setDeleteIdStock] = useState("");


    const getListProduct = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const response = await fetch(API_URI + "/productos/get", requestOptions)
            if (!response.ok) {
                console.error("Error fetching data:", response.statusText);
                return;
            }
            const result = await response.json();
            if (Array.isArray(result)) {
                console.log("Data received:", result);
                setAllDataProduct(result);
            } else {
                console.error("Error: Unexpected response format - expected an array", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const getListStock = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/stock/get", requestOptions)

            if (!response.ok) {
                console.error("Error fetching data:", response.statusText);
                return;
            }
            const result = await response.json();
            if (Array.isArray(result)) {
                console.log("Data received:", result);
                setAllDataStock(result);
            } else {
                console.error("Error: Unexpected response format - expected an array", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const nuevoProduct = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                name: nameProduct,
                tipo: tipoItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/productos/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el Empleado");
            setnameProduct("")
            settipoItem("")
            setshowNuevoPedidoForm(true);
            setShowSuccessModal(false);
            await getListProduct();
        } catch (error) {
            console.error(error);
        }
    }
    const nuevoStock = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                ProductoId: dataProduct,
                Cantidad: cantStock
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/stock/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el Empleado");
            setdataProduct("")
            setcantStock("")
            setshowNuevoStockForm(true);
            setShowSuccessModal(false);
            await getListStock();
        } catch (error) {
            console.error(error);
        }
    }
    const deleteProduct = async () => {
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/productos/delete/" + deleteIdProduct, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el empleado")
            setDeleteIdProduct("");
            setShowSuccessModal(true);
            setShowDeleteProductModal(false);
            await getListProduct()

        } catch (error) {
            console.error(error);
        }
    }
    const deleteStock = async () => {
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/stock/delete/" + deleteIdStock, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el empleado")
            setDeleteIdStock("");
            setShowSuccessModal(true);
            setShowDeleteStockModal(false);
            await getListStock()

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmitProduct = async () => {
        await nuevoProduct()
    }
    const handleSubmitStock = async () => {
        await nuevoStock()
    }
    // const handleUpdate = async () => {
    //     await updateItem();
    // };
    const handleDeleteProduct = async (id) => {
        setDeleteIdProduct(id);
        setShowDeleteProductModal(true);
    }
    const handleDeleteStock = async (id) => {
        setDeleteIdStock(id);
        setShowDeleteStockModal(true);
    }
    const handleConfirmDeleteProduct = async () => {
        await deleteProduct(deleteIdProduct);
    }
    const handleConfirmDeleteStock = async () => {
        await deleteStock(deleteIdStock);
    }
    useEffect(() => {
        getListProduct()
        getListStock()
    }, [])
    return (
        <>
            <div className={Styles['div-de-acreedores']}>
                <Row className="d-flex flex-row flex-column m-1">
                    <Col className={Styles['col-de-acreedores']}>
                        <h2>Productos</h2>
                        <Button className={`m-2 ${Styles['button-de-pedidos']}`}
                            variant="info"
                            onClick={() => {
                                setshowNuevoPedidoForm((prevState) => !prevState);

                            }}
                        >Nuevo</Button>
                        <form className={`bg-secondary ${Styles["nuevoItem__pedidos-form"]}`} style={{ display: showNuevoPedidoForm ? "flex" : "none", height: showNuevoPedidoForm ? "auto" : "10px" }}>
                            <h4>
                                Nuevo Pedido
                            </h4>
                            <div className={Styles['container-div-del-form']}>
                                <label>Producto</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del producto"
                                    value={nameProduct}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setnameProduct(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Tipó</label>
                                <input
                                    type="text"
                                    placeholder="Tipo de producto"
                                    value={tipoItem}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        settipoItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <button className={Styles['button-de-proveedores']} onClick={handleSubmitProduct}
                                disabled={
                                    !nameProduct ||
                                    !tipoItem
                                }>Agregar</button>
                        </form>
                    </Col>

                    <Col className="d-flex">
                        <table className={`bg-warning ${Styles["tabla-de-acreedores"]}`}>
                            <thead>
                                <tr>
                                    <th className="text-center px-2">ID</th>
                                    <th className="text-center px-2">Producto</th>
                                    <th className="text-center px-2">Tipo</th>                                    <th className="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allDataProduct.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center px-3" data-titulo="ID">{item.id}</td>
                                            <td className="text-center px-3" data-titulo="Producto">{item.name}</td>
                                            <td className="text-center px-3" data-titulo="ProdTipoucto">{item.tipo}</td>
                                            <td data-titulo="Opciones">
                                                <Button variant='outline-danger' className="m-1"
                                                    onClick={() =>
                                                        handleDeleteProduct(item.id)}>
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
                    {/* ----STOCK ---- */}
                    <Col className={Styles['col-de-acreedores']}>
                        <h2>Stock Disponible</h2>
                        <Button className={`m-2 ${Styles['button-de-pedidos']}`}
                            variant="info"
                            onClick={() => {
                                setshowNuevoStockForm((prevState) => !prevState);

                            }}
                        >Nuevo</Button>
                        <form className={`bg-secondary ${Styles["nuevoItem__pedidos-form"]}`} style={{ display: showNuevoStockForm ? "flex" : "none", height: showNuevoStockForm ? "auto" : "10px" }}>
                            <h4>
                                Registrar Cantidad
                            </h4>
                            <div className={Styles['container-div-del-form']}>
                                <label>ID Producto</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del producto"
                                    value={dataProduct}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setdataProduct(onlyNumbers);
                                    }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Cantidad</label>
                                <input
                                    type="text"
                                    placeholder="Tipo de producto"
                                    value={cantStock}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setcantStock(onlyNumbers);
                                    }} />
                            </div>
                            <button className={Styles['button-de-proveedores']} onClick={handleSubmitStock}
                                disabled={
                                    !dataProduct ||
                                    !cantStock
                                }>Agregar</button>
                        </form>
                    </Col>
                    <Col className={Styles['col-de-acreedores-2']}>
                        <h2 className={Styles['titulo-de-acreedores']}></h2>
                        <table className={Styles['tabla-de-acreedores']}>
                            <thead>
                                <tr className={Styles['bordes-blancos']}>
                                    <th className="text-center px-2">ID Producto</th>
                                    <th className="text-center px-2">Nombre</th>
                                    <th className="text-center px-2">Cantidad</th>
                                    <th className="text-center px-2">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allDataStock.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center px-2" data-titulo="ID Producto">{item.ProductoId}</td>
                                            <td className="text-center px-2" data-titulo="Nombre">{item.productName}</td>
                                            <td className="text-center px-2" data-titulo="Cantidad">{item.Cantidad}</td>
                                            <td data-titulo="Opciones">
                                                <Button variant='outline-danger' className="m-1"
                                                onClick={() =>
                                                    handleDeleteStock(item.id)}>
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
                <Modal show={showDeleteProductModal} onHide={() => setShowDeleteProductModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">
                            Confirmar eliminación
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-monospace ">
                        ¿Estás seguro de que deseas eliminar este elemento?
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setShowDeleteProductModal(false)}>Cancelar</button>
                        <button
                            onClick={handleConfirmDeleteProduct}>Si</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDeleteStockModal} onHide={() => setShowDeleteStockModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">
                            Confirmar eliminación
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-monospace ">
                        ¿Estás seguro de que deseas eliminar este elemento?
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setShowDeleteStockModal(false)}>Cancelar</button>
                        <button
                            onClick={handleConfirmDeleteStock}>Si</button>
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
        </>
    )
}

export default StockCrud
