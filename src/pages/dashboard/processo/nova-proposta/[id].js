import React, { useState } from "react"
import { Wizard } from '../../../../components'
import { Text } from "@chakra-ui/react"
import { useColors, useAuth, useProcces } from '../../../../hooks'
import { Box, Flex, Button } from "@chakra-ui/react"
import Alert from './components/alert'
import FirstStep from './components/firstStep'
import { useRouter } from 'next/router'

function Index() {
    const colors = useColors()
    const { authData } = useAuth()
    const { query } = useRouter()
    const { id } = query


    const { query: request } = useProcces(id, authData.id)
    const { data: requestData, isLoading, isFetching, isError, refetch } = request;

    const [preRequests, setPrerequests] = useState([])

    return <>
        <Wizard>
            <Alert data={requestData} setPrerequests={setPrerequests} />
            <FirstStep data={requestData} preRequests={preRequests} />


        </Wizard>
    </>
}


export default Index