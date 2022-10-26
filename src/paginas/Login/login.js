import styled from "styled-components";
import Logo from "../../assets/img/drivenlogo.png"
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../app";


const Page = styled.form`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    } & p{
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
`

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { setToken } = useContext(UserContext)
    const Api = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login"
    const navegar = useNavigate();

    function CheckLogIn() {

        const user = {
            email: email,
            password: senha
        }

        const promessa = axios.post(Api, user);
        promessa.then((props) => {
            setToken(props.data.token);
            navegar("/subscriptions")
        })
        promessa.catch((props) => {
            alert(props.response.data.message);
        });

    }

    function LogIn(props) {
        props.preventDefault();
        CheckLogIn();
        console.log("oi")
    }


    return (

        <Page onSubmit={LogIn}>
            <img src={Logo} alt="Logo Driven" />
            <input onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" required></input>
            <input onChange={(e) => setSenha(e.target.value)} placeholder="Senha" type="password" required></input>
            <Button type="submit"><p>ENTRAR</p></Button>
            <Link to="/sign-up"><p>Não tem uma conta? Cadastre-se!</p></Link>
        </Page>

    )

}

export default Login;