import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../../app"

const Page = styled.div`
width: 375px;
height: 667px;
background: #0E0E13;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

const Title = styled.h1`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;
    margin-bottom: 24px;
`

const BoxPlanos = styled.div`
    box-sizing: border-box;
    padding: 0px 16px;
    display: flex;
    width: 290px;
    height: 180px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-between;
    & img {
        width: 139.38px;
        height: 95.13px;
    } & p{
        color: #FFFFFF;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }


`

function Planos() {

    const [plans, setPlans] = useState([]);
    const navegar = useNavigate();

    const dadosUserSTR = localStorage.getItem("user");
    const dadosUserOBJ = JSON.parse(dadosUserSTR);


    useEffect(() => {

        const Api = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships"

        const autorizacao = {
            headers: {
                Authorization: `Bearer ${dadosUserOBJ.token}`
            }
        }

        const promessa = axios.get(Api, autorizacao);
        promessa.then((props) => {
            setPlans(props.data);

        })

        promessa.catch((e) => {
            alert('Error: ' + e.response.data.message);
            navegar("/");
            window.location.reload();
        });


    }, [])

    if (plans !== undefined) {
        return (

            <Page>
                <Title>Escolha seu Plano</Title>
                {plans.map((props) => (
                    <Link to={`/subscription/${props.id}`}>
                        <BoxPlanos key={props.id} id={props.id}>
                            <img src={props.image} alt="Group1" />
                            <p>{"R$" + props.price}</p>
                        </BoxPlanos >
                    </Link>

                ))}
            </Page>

        )
    }
    return (

        <>
        </>

    )
}

export default Planos