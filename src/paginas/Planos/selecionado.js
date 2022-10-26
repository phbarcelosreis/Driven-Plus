import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app";
import styled from "styled-components";
import seta from "../../assets/img/Vector.png"
import check from "../../assets/img/check.png"

const Page = styled.div`
    box-sizing: border-box;
    padding-top: 25px;
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    & > :first-child{
        margin-left: 20px;
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

const Brindes = styled.div`
    display: flex;
    flex-direction:column;
    margin-left: 40px;
    & h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    } & img{
        width: 139px;
        height: 95px;
    }

`

const Benefícios = styled.div`  
    margin-left: 40px;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    gap: 5px;
    & h1{
        color: #FFFFFF;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }
`

function PlanoSelecionado() {

    const [brindes, setBrindes] = useState([])

    const params = useParams();
    const { token, plano, setPlano } = useContext(UserContext)
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
            setPlano(props.data);
            setBrindes(props.data.perks)
        });

        promessa.catch((props) => {
            alert('Error: ' + props.response.data.message);
            navegar("/");
            window.location.reload();
        });
    }, []);

    function Cards() {
        return (

            <>
                <Link to="/subscriptions">
                    <div>
                        <img src={seta} alt="Voltar" />
                    </div>
                </Link>
                <Logo>
                    <img src={plano.image} alt="Logo" />
                    <h1>Driven Plus</h1>
                </Logo>
                <div>
                    <Benefícios>
                        <img src={check} alt="Check" />
                        <h1>Benefícios</h1>
                    </Benefícios>
                    {brindes.map((props, i) => (

                        <Brindes>
                            <h1>{`${i + 1}.` + props.title}</h1>
                        </Brindes>

                    ))}
                </div>
            </>

        )
    }


    if (plano !== undefined) {
        console.log(plano)
        console.log(brindes)
        return (

            <Page>
                <Cards/>
            </Page>

        )
    }

}

export default PlanoSelecionado;