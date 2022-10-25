import { useState } from "react"
import styled from "styled-components"
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

function Planos(){

    

    return (

        <Page>
            <Title>Escolha seu Plano</Title>
            <BoxPlanos >
                <img src={Group1} alt="Group1" />
                <p>R$39,99</p>
            </BoxPlanos >
            <BoxPlanos >
                <img src={Group2} alt="Group1" />
                <p>R$69,99</p>
            </BoxPlanos>
            <BoxPlanos >
                <img src={Group3} alt="Group1" />
                <p>R$99,99</p>
            </BoxPlanos>
        </Page>

    )
}

export default Planos