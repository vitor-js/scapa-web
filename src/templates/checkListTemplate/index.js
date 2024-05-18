import React, { useEffect } from "react"
import styled from "styled-components"
import toBRL from '@/helpers/toCurrencyScreen'
import Image from 'next/image'

const Tempalte = ({ data }) => {

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
                    Valor Real Aplicado
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {toBRL(data?.sum_total_value_with_risk)}
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


            <div style={{ marginTop: 20, fontSize: 10 }}>
                <p style={{ color: "black" }}>
                    Objetivo
                </p>

                <p style={{ color: "black", fontSize: 10 }}>
                    {data.target}
                </p>

            </div>

        </div>)

}

export default Tempalte