import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Page = styled.form`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & img{
        width: 299px;
        height: 49px;
        margin-top: 135px;
        margin-bottom: 100px;
    } & input{
        width: 299px;
        height: 52px;
        background: #FFFFFF;
        border-radius: 8px;
        border: none;
        margin-bottom: 16px;
    }& p{
        color: #FFFFFF;
        cursor: pointer;
    }

`

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18px 122px;
    gap: 10px;
    width: 298px;
    height: 52px;
    background: #FF4791;
    margin-top: 5px;
    border-radius: 8px;
    border: none;
    margin-bottom: 20px;
    cursor: pointer;
    & p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`


function Cadastro() {

    const [CPF, setCPF] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navegar = useNavigate();
    const Api = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"

    function Cadastrando(){
        const user = {
            email: email,
            name: nome,
            cpf: CPF,
            password: senha
        }
        console.log(CPF)

        const promessa = axios.post(Api, user);
        promessa.then(() => navegar("/"));
        promessa.catch((props) => alert(props.response.data.message));
    }


    function Cadastrar(props){
        props.preventDefault();
        Cadastrando();
    }

    return (
        <Page onSubmit={Cadastrar}>
            <input onChange={(e) => setNome(e.target.value)} placeholder="Nome" type="text" required></input>
            <input onChange={(e) => setCPF(e.target.value)} placeholder="CPF" type="text" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Digite um CPF no formato: xxx.xxx.xxx-xx" required></input>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" required></input>
            <input onChange={(e) => setSenha(e.target.value)} placeholder="Senha" type="password" required></input>
            <Button type="submit"><p>CADASTRAR</p></Button>
            <Link to="/"><p>Já possui uma conta? Entre!</p></Link>
        </Page>
    )

}

export default Cadastro;