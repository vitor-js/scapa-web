

import React, { useEffect, useState } from "react"
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import { useColors, useWizardContext } from '../../../../../../hooks'
import { ScapaRequest } from '../../../../../../components'

const RISK_TABLE = {
    0: "Inexistente",
    10: "Muito Baixo",
    25: "Baixo",
    50: "Médio",
    75: "Alto",
    90: "Muito Alto",
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
                riskSuccess: v.risk_success
            }
        })
        toast.success("Peidos importados com sucesso!")

        setRequests([...requestsParse])
    }, [preRequests])

    return (
        <Box width={'100%'}>
            <Text color={colors.text} fontSize='4xl' fontWeight={600}  >
                Adicione seus pedidos
            </Text>

            <Text color={colors.text} fontSize='lg' fontWeight={400} my={2} w={'100%'}  >
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>

            <Flex w={'100%'} >
                <ScapaRequest requests={requests} setRequests={setRequests} data={data} />
            </Flex>


        </Box>

    )
}

export default Index