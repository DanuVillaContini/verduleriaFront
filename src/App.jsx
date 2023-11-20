
import AuthRouter from "./routes/AuthRouter";
import Screenlogin from "./screen/Screenlogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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