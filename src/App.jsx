import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./routes/AuthRouter";
import Screenlogin from "./screen/Screenlogin";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Screenlogin/>}/>
          <Route path="/auth/*" element={<AuthRouter/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
