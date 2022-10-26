import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app";
import styled from "styled-components";
import seta from "../../assets/img/Vector.png"
import check from "../../assets/img/check.png"
import nota from "../../assets/img/teste.png"

const Page = styled.div`
    box-sizing: border-box;
    padding-top: 25px;
    padding-bottom: 34px;
    width: 375px;
    max-height: 667px;
    background: #0E0E13;
    display: flex;
    overflow:auto;
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

const Preco = styled.h1`
    color: #FFFFFF;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin-left: 40px;
    margin-bottom: 34px;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & input{
        background: #FFFFFF;
        border-radius: 8px;
        width: 299px;
        height: 52px;
        border: none;
        margin-bottom: 8px;
    }

`

const Validade = styled.div`
    display: flex;
    gap: 9px;
    & input{
        width:145px;
        height: 52px;
        border: none;
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

function PlanoSelecionado() {

    const [nomeCartao, setNomeCartao] = useState("")
    const [numeroCartao, setNumeroCartao] = useState("")
    const [codigoCard, setCodigoCard] = useState("")
    const [validade, setValidade] = useState("")

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
                        <h1>Benefícios:</h1>
                    </Benefícios>
                    {brindes.map((props, i) => (

                        <Brindes>
                            <h1>{`${i + 1}.` + props.title}</h1>
                        </Brindes>

                    ))}
                    <Benefícios>
                        <img src={nota} alt="nota" />
                        <h1>Preço:</h1>
                    </Benefícios>
                    <Preco>{"R$ " + plano.price + " cobrados mensalmente"}</Preco>
                </div>

            </>

        )
    }

    function CadastroCartao() {



    }

    function Cadastro() {
        navegar("/home")
    }



    if (plano !== undefined) {
        console.log(plano)
        console.log(brindes)
        return (

            <Page>
                <Cards />
                <Form onSubmit={Cadastro}>
                    <input onChange={((e) => setNomeCartao(e.target.value))} placeholder="Nome impresso no cartão"></input>
                    <input onChange={((e) => setNumeroCartao(e.target.value))} placeholder="Dígitos do cartão"></input>
                    <Validade>
                        <input onChange={((e) => setCodigoCard(e.target.value))} placeholder="Código de Segurança" type="text" ></input>
                        <input onChange={((e) => setValidade(e.target.value))} placeholder="Validade"></input>
                    </Validade>
                    <Button type="submit"><p>ENTRAR</p></Button>
                </Form>

            </Page>

        )
    }

}

export default PlanoSelecionado;