import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import logo from "../assets/papas_hermanosss.png";
import Styles from "../styles/SideBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SideBar = () => {
  return (
    <div className={Styles["flex"]}>
      <div className={Styles["sidebar"]}>
        <div className={Styles["logoVerdu"]}>
          <img src={logo} alt="" />
        </div>


        <ul>
          <li>
            <Link to="/auth/stock" className="btn btn-warning">
              <i className="bi bi-database-check"></i> STOCK
            </Link>
          </li>
          <li>
            <Link to="/auth/pedidos" className="btn btn-warning">
              <i className="bi bi-cart4"></i> PEDIDOS
            </Link>
          </li>
          <li>
            <Link to="/auth/proveedores" className="btn btn-warning">
              <i className="bi bi-box-seam"></i> PROVEEDORES
            </Link>
          </li>
          <li>
            <Link to="/auth/acreedores" className="btn btn-warning">
              <i className="bi bi-person"></i> ACREEDORES
            </Link>
          </li>
          <li>
            <Link to="/auth/" className="btn btn-warning">
              <i className="bi bi-person"></i> EMPLEADOS
            </Link>
          </li>
        </ul>
      </div>
      <div className={Styles["dropdown"]}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <i className="bi bi-list"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className={Styles["dropdown-box"]}>
            <Dropdown.Item href="#" className={Styles["dropdown-box"]}>
              <Link to="">STOCK</Link>
            </Dropdown.Item>
            <Dropdown.Item href="#">
              <Link to="/proveedores">PROVEEDORES</Link>
            </Dropdown.Item>
            <Dropdown.Item href="#">
              <Link to="">PEDIDOS</Link>
            </Dropdown.Item>
            <Dropdown.Item href="#">
              <Link to="">EMPLEADOS</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default SideBar;
