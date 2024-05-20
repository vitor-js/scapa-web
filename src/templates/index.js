import React, { useEffect } from "react"
import styled from "styled-components"
import { toCurrencyScreen } from '../helpers'
const RISK_TABLE_REVERSE = {
    0: "Inexistente",
    10: "Muito Baixo",
    25: "Baixo",
    50: "Médio",
    75: "Alto",
    90: "Muito Alto",
    100: "Total",
};
import Image from 'next/image'

const Tempalte = ({ result }) => {

    useEffect(() => {
        console.log(result)
    }, [result])


    const Table = styled.table`
    font-family: arial, sans-serif;
          border-collapse: collapse;
            width: 90%;
          td, th {
          border: 1px solid #dddddd ;
       
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
    `






    const finalResult = () => {
        return (

            <div style={{ "marginTop": "10px", color: '#000' }}>
                <Table style={{ "fontFamily": "arial, sans-serif", "borderCollapse": "collapse", }}>
                    <tr>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Total Postulado</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Total individualizado com gestão de risco</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Total da proposta</th>

                    </tr>
                    <tr>
                        <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {result && result.valotTotalPostulado}</td>
                        <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {result && result.valueTotalPostulateIndividual}</td>
                        <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {result && result.valueProposal}</td>
                    </tr>
                </Table>
            </div>
        )
    }


    return (
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20 }}>
            <div style={{ marginTop: 10 }}>
                <Image
                    src={require('../../assets/logo/logo.png')}
                    alt=""
                    width={130}
                    objectFit="cover"
                />
            </div>

            <div style={{ "textAlign": "left", "marginTop": "50px", "fontSize": "10px", "fontWeight": "600", color: '#000' }}>
                Responsável pela proposta
            </div >

            <div style={{ "marginTop": "0px", fontSize: "10px", color: '#000' }}>
                {result && result.autor} teste
            </div>

            {/*  --------------------------------- */}

            <div style={{ "textAlign": "left", "marginTop": "10px", fontSize: "10px", color: '#000', "fontWeight": "600" }}>
                Estimativa de duração (em meses)
            </div>

            <div style={{ "marginTop": "0px", fontSize: "10px", color: '#000' }}>
                {result && result.time}  Meses
            </div>

            {/*  --------------------------------- */}

            <div style={{ "textAlign": "left", "marginTop": "10px", fontSize: "10px", color: '#000', "fontWeight": "600" }}>
                Avaliação
            </div>


            <div style={{ "marginTop": "0px", fontSize: "10px", color: '#000' }}>
                {result && result.type}
            </div>


            {/*  --------------------------------- */}


            <div style={{ "textAlign": "left", "marginTop": "10px", fontSize: "10px", color: '#000', "fontWeight": "400" }}>
                Pedidos
            </div>

            <div style={{ "marginTop": "10px", color: '#000' }}>
                <Table  >
                    <tr>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>ID</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Pedido</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Individual Postulado</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Risco</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Risco de Êxito</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor individualizado</th>
                    </tr>

                    {result && result?.requests && result?.requests.map((value, index) => {
                        return (
                            <tr key={index} id='Table-response-request' >
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}> {index + 1}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{value.requestValue}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {value.valuePostulate}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{value.risk_success} %</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{RISK_TABLE_REVERSE[value.risk_success]}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {value.valueIndividual}</td>
                            </tr>
                        )
                    })}
                </Table>
            </div>





            <div style={{ "textAlign": "left", "marginTop": "10px", fontSize: "10px", color: '#000', "fontWeight": "600" }}>
                <Table  >
                    <tr>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Custo do Réu</th>
                    </tr>
                    <tr id='Table-response-request' >
                        <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {result && result.custo_reu}</td>
                    </tr>
                </Table>
            </div>




            <div style={{ "textAlign": "left", "marginTop": "10px", fontSize: "10px", color: '#000', "fontWeight": "400" }}>
                Resultados
            </div>

            <div style={{ "marginTop": "0px", fontSize: "10px", color: '#000' }}>
                {finalResult()}
            </div>
        </div>)

}

export default Tempalte