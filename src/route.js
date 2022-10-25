import { Routes, Route } from "react-router-dom";
import Login from "./paginas/Login/login";
import Cadastro from "./paginas/Cadastro/cadastro"


function Rotas() {

    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Cadastro />} />
{/*             <Route path="/subscriptions" element={<Planos />} />
            <Route path="/subscriptions/" element={<Planos />} />
            <Route path="/home" element={<TelaInicial />} /> */}
        </Routes>

    )

}

export default Rotas;