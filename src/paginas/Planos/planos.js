import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../../app"
import Group1 from "../../assets/img/group1.png"
import Group2 from "../../assets/img/group2.png"
import Group3 from "../../assets/img/group3.png"

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
    const Api = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships"


    const { token } = useContext(UserContext)

    useEffect(() => {

        const autorizacao = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promessa = axios.get(Api, autorizacao)
        promessa.then((props) => {
            setPlans(props.data);
        })



        promessa.catch((e) => {
            alert('Error: ' + e.response.data.message);
            navegar("/");
            window.location.reload();
        });


    }, [navegar, token])




    return (

        <Page>
            <Title>Escolha seu Plano</Title>
            {plans.map((props) => {
                <BoxPlanos>
                    <img src={props.image} alt="Group1" />
                    <p>{props.price}</p>
                </BoxPlanos >

            })}
        </Page>

    )
}

export default Planos