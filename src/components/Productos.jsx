import { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import Styles from "../styles/crudStock.module.css"
import { API_URI } from "../common/constantes";

function Productos() {
    const [allDataProduct, setAllDataProduct] = useState([])
    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)
    //Const de Producto
    const [nameProduct, setnameProduct] = useState([])
    const [tipoItem, settipoItem] = useState([])
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
    useEffect(() => {
        getListProduct()
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Productos
