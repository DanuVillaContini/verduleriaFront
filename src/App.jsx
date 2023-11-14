import Form from "./components/Login";
import logo from './assets/img/logo.png'
import './styles/LoginEstilo.css';

function App() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-green-700">      
        <Form />    
      </div>
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center bg-yellow-400">
        <div>
          <img src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;