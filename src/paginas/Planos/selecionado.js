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

const Confirmacao = styled.div`
    display: ${props => props.clicado === false ? "none" : "flex"};
    justify-content: center;
    align-items: center;
    top: 0px;
    position: absolute;
    width: 375px;
    height: 667px;
    z-index: 2;
    opacity: 0.5;
    background-color: black;
    & p{
        color: #FFFF;
    }
`

const CardConfirmacao = styled.div`
    display: ${props => props.clicado === false ? "none" : "flex"};
    position: absolute;
    width: 248px;
    height: 210px;
    left: 55px;
    top: 229px;
    background: #FFFFFF;
    border-radius: 12px;
    z-index: 3;
    flex-direction: column;
    align-items: center;

    & > h1{
        width:204px;
        height: 67px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        margin-top: 33px;
    }
`

const Buttons = styled.div`
    margin-left: 10px;
    margin-top: 47px;
    & button:nth-child(1){
        width: 95px;
        height: 52px;
        background: #CECECE;
        border-radius: 8px;
        margin-right: 14px;
        border: none;
        cursor: pointer;
    } & button:nth-child(2){
        width: 95px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        margin-right: 14px;
        border: none;
        cursor: pointer;
    } & h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;

    }

`


function PlanoSelecionado() {

    const [nomeCartao, setNomeCartao] = useState("")
    const [numeroCartao, setNumeroCartao] = useState("")
    const [codigoCard, setCodigoCard] = useState("")
    const [validade, setValidade] = useState("")
    const [clicado, setClicado] = useState(false)

    const [brindes, setBrindes] = useState([])

    const params = useParams();
    const { plano, setPlano } = useContext(UserContext);
    const navegar = useNavigate();
    const dadosUserSTR = localStorage.getItem("user");
    const dadosUserOBJ = JSON.parse(dadosUserSTR)

    useEffect(() => {

        const autorizacao = {
            headers: {
                Authorization: `Bearer ${dadosUserOBJ.token}`
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

    function Cadastrar() {

        navegar("/home")

    }



    function Teste(){

        if (plano !== undefined) {

            return (
    
                <>
                    <Page>
    
                        <Cards />
                        <Form onSubmit={(() => setClicado(true))}>
                            <input onChange={((e) => setNomeCartao(e.target.value))} placeholder="Nome impresso no cartão"></input>
                            <input onChange={((e) => setNumeroCartao(e.target.value))} placeholder="Dígitos do cartão"></input>
                            <Validade>
                                <input onChange={((e) => setCodigoCard(e.target.value))} placeholder="Código de Segurança" type="text" ></input>
                                <input onChange={((e) => setValidade(e.target.value))} placeholder="Validade"></input>
                            </Validade>
                            <Button type="submit"><p>ENTRAR</p></Button>
                        </Form>
    
                    </Page>
    
    
    
                </>
    
            )
        }


    }

    return (
        <>
            <Teste></Teste>
            <Confirmacao clicado={clicado} />
            <CardConfirmacao clicado={clicado}>
                <h1>Tem certeza que deseja assinar o plano Driven Plus(R$ {plano.price})?</h1>
                <Buttons>
                    <button onClick={(() => setClicado(false))}><h1>Não</h1></button>
                    <button onClick={Cadastrar}><h1>SIM</h1></button>
                </Buttons>
            </CardConfirmacao>

        </>

    )

}

export default PlanoSelecionado;