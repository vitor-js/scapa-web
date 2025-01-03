import React, { useEffect } from "react"
import styled from "styled-components"
import { toCurrencyScreen } from '../helpers'
const RISK_TABLE_REVERSE = {
    "0": "Inexistente",
    "0.1": "Muito Baixo",
    "0.165": "Muito Baixo",
    "0.25": "Baixo",
    "0.33": "Baixo",
    "0.5": "Médio",
    "0.665": "Alto",
    "0.75": "Alto",
    "0.90": "Muito Alto",
    "0.83": "Muito Alto",
    "1": "Total",
    0: "Inexistente",
    16.5: "Muito Baixo",
    1650: "Muito Baixo",
    10: "Muito Baixo",
    100: "Muito Baixo",
    25: "Baixo",
    250: "Baixo",
    33: "Baixo",
    333: "Baixo",
    50: "Médio",
    500: "Médio",
    75: "Alto",
    750: "Alto",
    66.5: "Alto",
    665: "Alto",
    6650: "Alto",
    90: "Muito Alto",
    900: "Muito Alto",
    83: "Muito Alto",
    830: "Muito Alto",
    100: "Total",
    1000: "Total",
};
import Image from 'next/image'

const Tempalte = ({ result }) => {

    useEffect(() => {
        result?.requests.map(v => console.log(v.risk_success, "risk_successrisk_successrisk_successrisk_success", v.risk))
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

            <div style={{ "marginTop": "10px", color: 'red', width: 400, overflow: "hidden" }}>
                <Table style={{ "fontFamily": "arial, sans-serif", width: 400 }}>
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

        
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20, width: 400 }}>
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

            <div style={{ "marginTop": "10px", color: '#000' ,  width: 400 }}>
                <Table style={{ width: 400}} >
                    <tr>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>ID</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Pedido</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Individual Postulado</th>

                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Risco de Êxito</th>
                        <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor individualizado</th>
                    </tr>

                    {result && result?.requests && result?.requests.map((value, index) => {
                        return (
                            <tr key={index} id='Table-response-request' >
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}> {index + 1}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{value.requestValue}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {value.valuePostulate}</td>
                                {console.log(value.risk_success, "value.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_successvalue.risk_success")}
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{RISK_TABLE_REVERSE[value.risk_success ? value.risk_success : value.risk]}</td>
                                <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>R$ {value.valueIndividual}</td>
                            </tr>
                        )
                    })}
                </Table>
            </div>





            <div style={{  width: "100%" ,"textAlign": "left", "marginTop": "10px", fontSize: "10px", color: 'red', "fontWeight": "600" }}>
                <Table style={{ maxWidth: "100%"}} >
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

          
                {finalResult()}
         
        </div>)

}

export default Tempalte