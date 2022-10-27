import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Icon from "../../assets/img/icon.png"
import axios from "axios"


const Page = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    margin-top: 12px;
    color: #FFFFFF;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 61px;

`

const Button = styled.a`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 299px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    & p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`

const Logo = styled.div`
    margin-top: 32px;
    display: flex;
    width: 310px;
    height: 60px;
    justify-content: space-between;
    & img:nth-child(1) {
        height: 50.866729736328125px;
        width: 74.52371215820312px;


    } & img:nth-child(2){
        height: 32.9375px;
        width: 34px;


    }
`

const Footer = styled.div`
    position: absolute;
    bottom: 12px;
    & button {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;

    }& button:nth-child(1){
        border: none;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        width: 299px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
    } & button:nth-child(2){
        border: none;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        width: 299px;
        height: 52px;
        background: #FF4747;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
    }   

`


function TelaInicial() {

    const user = localStorage.getItem("user");
    const userOBJ = JSON.parse(user);
    const plano = localStorage.getItem("plano");
    const planoOBJ = JSON.parse(plano);

    const navegar = useNavigate();

    function DeletarPlano(){

        const Api = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"

        const autorizacao = {
            headers: {
                Authorization: `Bearer ${userOBJ.token}`
            }
        }

        const promessa = axios.delete(Api, autorizacao);
        promessa.then(() => navegar("/subscriptions"))
        promessa.catch((e) => alert('Error: ' + e.response.data.message))

    }


    if (userOBJ.membership === null) {

        return (
            <Page>
                <Logo>
                    <img src={planoOBJ.image} alt="Logo" />
                    <img src={Icon} alt="Icon" />
                </Logo>
                <Title>{"Olá, " + userOBJ.name}</Title>
                {planoOBJ.perks.map((props, i) => (
                    <Button key={i} href={props.link} target="_blank"><p>{props.title}</p></Button>
                ))}
                <Footer>
                    <button onClick={(() => navegar("/subscriptions"))}><h1>Mudar Plano</h1></button>
                    <button onClick={DeletarPlano}><h1>Cancelar Plano</h1></button>
                </Footer>

            </Page>

        )

    } else {

        return (
            <Page>
                <Logo>
                    <img src={userOBJ.membership.image} alt="Logo" />
                    <img src={Icon} alt="Icon" />
                </Logo>
                <Title>{"Olá, " + userOBJ.name}</Title>
                {userOBJ.membership.perks.map((props, i) => (
                    <Button key={i} href={props.link} target="_blank"><p>{props.title}</p></Button>
                ))}
                <Footer>
                    <button onClick={(() => navegar("/subscriptions"))}><h1>Mudar Plano</h1></button>
                    <button onClick={DeletarPlano}><h1>Cancelar Plano</h1></button>
                </Footer>

            </Page>

        )


    }

}

export default TelaInicial