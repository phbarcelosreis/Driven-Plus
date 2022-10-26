import styled from "styled-components"

const Page = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const Button = styled.a`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18px 122px;
    gap: 10px;
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


function TelaInicial(){

    return(
        <Page>
            <Button href="https://www.youtube.com/" target="_blank"><p>Teste</p></Button>
            <Button href="https://www.twitter.com/" target="_blank"><p>TESTES</p></Button>

        </Page>

    )

}   

export default TelaInicial