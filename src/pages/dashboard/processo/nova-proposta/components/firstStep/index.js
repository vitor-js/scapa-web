

import React, { useEffect, useState } from "react"
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import { useColors, useWizardContext } from '../../../../../../hooks'
import { ScapaRequest } from '../../../../../../components'

const RISK_TABLE = {
    0: "Inexistente",
    16.5: "Muito Baixo",
    10: "Muito Baixo",
    25: "Baixo",
    33: "Baixo",
    50: "Médio",
    75: "Alto",
    66.5: "Alto",
    90: "Muito Alto",
    83: "Muito Alto",
    100: "Total",
};
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast';

function Index({ data, preRequests }) {
    const colors = useColors()
    const { actions } = useWizardContext()
    const router = useRouter()
    const { query } = router
    const { id } = query
    const [requests, setRequests] = useState([])



    useEffect(() => {
        if (!preRequests || preRequests.length === 0) return
        if (requests.length !== 0) return

        const requestsParse = preRequests.map(v => {
            return {
                requestValue: v.type,
                valuePostulate: v.postulated_individual,
                valueIndividual: v.postulated_individual_value,
                risk: RISK_TABLE[v.risk_success],
                riskSuccess: Number.isInteger(v.risk_success) ? v.risk_success : v.risk_success * 100,
                ...(v.diference_type ? { diference_type: v.diference_type } : {}),
                ...(v.diference_value ? { diference_value: v.diference_value } : {}),
                ...(v.insalubridade_grau ? { insalubridade_grau: v.insalubridade_grau } : {}),
                ...(v.insalubridade_salario ? { insalubridade_salario: v.insalubridade_salario?.data } : {}),
                ...v
            }
        })
        toast.success("Pedidos importados com sucesso!")

        setRequests([...requestsParse])
    }, [preRequests])

    return (
        <Box width={'100%'}>



            <Flex w={'100%'} >
                <ScapaRequest requests={requests} setRequests={setRequests} data={data} />
            </Flex>


        </Box>

    )
}

export default Index