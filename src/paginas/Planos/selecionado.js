import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app";
import styled from "styled-components";
import seta from "../../assets/img/Vector.png"

const Page = styled.div`
    box-sizing: border-box;
    padding-top: 25px;
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    & :first-child{
        margin-left: 22px;
    }
`

const Logo = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    width: 100%;
    margin-top: 35px;
    & h1{
        color: #FFFFFF;
        margin-top: 12px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
    } & img{
        width: 139px;
        height: 95px;
    }

`

function PlanoSelecionado() {

    const params = useParams();
    const { token } = useContext(UserContext)
    const [teste, setTeste] = useState([])
    const navegar = useNavigate();

    useEffect(() => {

        const autorizacao = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const Api = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.id}`;

        const promessa = axios.get(Api, autorizacao);
        promessa.then((props) => {
            setTeste(props.data);
            console.log(teste.image)
        });

        promessa.catch((props) => {
            alert('Error: ' + props.response.data.message);
            navegar("/");
            window.location.reload();
        });
    }, []);


    if (teste !== undefined) {
        return (

            <Page>
                <div>
                    <img src={seta} alt="Voltar" />
                </div>
                <Logo>
                    <img src={teste.image} alt="Logo" />
                    <h1>Driven Plus</h1>
                </Logo>
            </Page>

        )
    }

}

export default PlanoSelecionado;