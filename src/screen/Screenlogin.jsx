import Login from "../components/Login";
import logo from '../assets/img/logo.png'

function Screenlogin() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2 bg-[#3D5653]">
                <Login />
            </div>
            <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-[#D6A218]">
                <div>
                    <img src={logo} alt="Imagen Las papas Hermanos Logo" />
                </div>
            </div>
        </div>
    )
}

export default Screenlogin
