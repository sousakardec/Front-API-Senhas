import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Atendimento from "./pages/Atendimento";

import Titulo from "./Titulo";
import SubTitulo from "./SubTitulo";

function App() {
  return (
    <div className="">
      <div className="m-8 p-8 rounded-sm border-1 ">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Atendimento" element={<Atendimento />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );

  // return com varios itens deve estar dentro de uma tag <div>
  // no primeiro titulo estamos passando um exemplo de props que são propriedades passada na chamado do componete, para ser usada pelo componente
}

export default App;
