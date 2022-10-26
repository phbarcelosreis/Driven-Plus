import { Routes, Route } from "react-router-dom";
import Login from "./paginas/Login/login";
import Cadastro from "./paginas/Cadastro/cadastro"
import Planos from "./paginas/Planos/planos";
import PlanoSelecionado from "./paginas/Planos/selecionado";
import TelaInicial from "./paginas/TelaInicial/home";


function Rotas() {

    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Cadastro />} />
            <Route path="/subscriptions" element={<Planos />} />
            <Route path="/subscription/:id" element={< PlanoSelecionado/>} />
            <Route path="/home" element={<TelaInicial />} /> 
        </Routes>

    )

}

export default Rotas;