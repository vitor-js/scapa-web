import React, { useEffect } from "react"
import styled from "styled-components"
import toBRL from '@/helpers/toCurrencyScreen'
import Image from 'next/image'

const Tempalte = ({ data }) => {
    useEffect(() => {
        console.log(data)
    }, [data])
    const checklsit = {
        "aversao_risco": "Aversão a Risco",
        "apetite_risco": "Apetite a Risco",
        "indiferente": "Indiferente a Risco"
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 20 }}>
            <div style={{ marginTop: 10 }}>
                <Image
                    src={require('../../../assets/logo/logo.png')}
                    alt=""
                    width={130}
                />
            </div>

            <div style={{ marginTop: 20, fontSize: 10 }}>
                <p style={{ color: "black" }}>
                    Valor Indicado
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {toBRL(data?.postulated_total_value)}
                </p>

            </div>


            <div style={{ marginTop: 20, fontSize: 10 }}>
                <p style={{ color: "black" }}>
                    Valor Real Apurado
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {toBRL(data?.postulated_total_value)}
                </p>

            </div>


            <div style={{ marginTop: 20, fontSize: 10 }}>
                <p style={{ color: "black" }}>
                    Valor Indicado
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {toBRL(data?.value)}
                </p>

            </div>



            <div style={{ marginTop: 20, fontSize: 10 }}>
                <p style={{ color: "black" }}>
                    Análise de risco
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {checklsit[data.checklist]}
                </p>

            </div>


            <div style={{ marginTop: 20, marginBottom: 20, fontSize: 10 }}>
                <p style={{ color: "black" }}>
                    Qual sua meta de acordo ?
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {data.target}
                </p>

            </div>


            <Table  >
                <tr>
                    <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Tipo</th>
                    <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Total da proposta</th>
                    <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor Total Postulado</th>
                    <th style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>Valor individualizado com  risco</th>
                </tr>

                {data && data?.proposals && data?.proposals.map((value, index) => {
                    return (
                        <tr key={index} id='Table-response-request' >
                            <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{value.type}</td>
                            <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{toBRL(value.total_value)}</td>
                            <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}> {toBRL(value.postulated_total_value)}</td>
                            <td style={{ fontSize: 8, color: '#000', alignItems: 'center', justifyContent: 'center', padding: 5, justifyItems: "center", alignContent: "center", paddingBottom: 8 }}>{toBRL(value.total_value_with_riks)}</td>

                        </tr>
                    )
                })}
            </Table>

        </div>)

}
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


export default Tempalte