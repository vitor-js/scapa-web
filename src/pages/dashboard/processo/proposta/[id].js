import React, { useEffect, useState } from 'react';
import { LayoutDashboardProccess } from '../../../../layouts'
import { HeaderPages, WrapperBody, Input, } from '../../../../components'
import { useRouter } from 'next/router'
import { useProposal } from '../../../../hooks'
import { MdEditDocument } from 'react-icons/md'
import Result from '../../../../components/scapaComponents/requests/components/requestResult'
import { api } from '@/service';
import { queryClient } from '../../../../service/queryClient';
import List from './components/list'
import { toast } from 'react-hot-toast';

import RequestForm from '../../../../components/scapaComponents/requests/components/RequestForm/index'
import { useColors, useAuth, useProcces } from '../../../../hooks'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Flex,
    Text,

} from '@chakra-ui/react'
import { Suspense } from 'react';
import { currencyToBackend } from '@/helpers';
import { MdArrowBack } from "react-icons/md";


const RISK_TABLE = {
    Inexistente: 0.0,
    "Muito Baixo": 0.165,
    Baixo: 0.33,
    Médio: 0.5,
    Alto: 0.665,
    "Muito Alto": 0.83,
    Total: 1.0,
};


function Index() {
    const { query, push } = useRouter()
    const { id, proccess_id } = query
    const { authData } = useAuth()


    const colors = useColors()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { query: request } = useProposal(id)
    const { data: requestData, isLoading, isFetching, isError, refetch } = request;
    const [result, setResult] = useState()
    const [requestsValue, setRequestsValue] = useState([])
    const [openSelect, setOpenSelect] = useState(false)
    const [draftRequest, setDraftRequest] = useState()

    const { query: requestProcess } = useProcces(proccess_id, authData.id)
    const { data: requestDataProcess, isLoading: isLoadingProcess, isFetching: isFetchingProcess, isError: isErrorProcess, refetch: refetchProcess } = requestProcess;
    const removeRequest = async (index) => {
        try {
            const request = requestsValue[index]
            const { proposal_id, id } = request
            await api.delete(`/proposal/request/${id}/${proposal_id}`)
            queryClient.invalidateQueries('proposal');
            toast.success("Pedido Removido com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const calcAndSave = () => {

    }


    useEffect(() => {
        if (!requestData) return
        const { Requests, Process, postulated_total_value, total_value, total_value_with_riks, type } = requestData.data

        const formatRequest = Requests.map(v => ({
            requestValue: v.type,
            valuePostulate: v.postulated_individual,
            valueIndividual: v.postulated_individual_value,
            risk: RISK_TABLE[v.risk_success],
            riskSuccess: Number.isInteger(v.risk_success) ? v.risk_success : v.risk_success * 100,
            ...v

        }))

        setRequestsValue([...formatRequest])

        setResult({
            type: type,
            valotTotalPostulado: postulated_total_value,
            valueTotalPostulateIndividual: total_value_with_riks,
            valueProposal: total_value,
            requests: formatRequest,
            reu: Process.reu,
            proccess_time: Process.proccess_time,
            title: Process.title,
            description: Process.description,
            autor: Process.autor,
            number_process: Process.number_process,
            custo_reu: Process.reu_cost
        })
    }, [requestData])

    const editRequest = (value) => {
        console.log(value, 'aaaa')
        setDraftRequest({ ...value })
        setOpenSelect(true)
    }

    const createRequest = () => {
        onOpen()
    }

    const handleAddNewRequest = async (params) => {
        let postulated_individual_value = parseFloat(currencyToBackend(params.valueIndividual))
        if (typeof individualValue === 'string' && params.valueIndividual.includes("$")) {
            const split = params.valueIndividual.split("$")
            const value = split[1].trim()
            postulated_individual_value = parseFloat(currencyToBackend(value))
            console.log("-------------------------------------------------------------------ttttttttttt--------------------------------------------")
        }
        const newObject = {
            type: params.requestValue,
            risk: RISK_TABLE[params.risk] * 100,
            risk_success: RISK_TABLE[params.risk] * 100,
            postulated_individual_value: postulated_individual_value,
            postulated_individual: parseFloat(currencyToBackend(params.valuePostulate)),
            proposal_id: id,
            ...params
        }

        try {

            await api.post(`/proposal/request/${id}`, newObject)
            queryClient.invalidateQueries('proposal');
            queryClient.invalidateQueries('procces')
            setOpenSelect(false)
            toast.success("Pedido adicionado com sucesso")
        } catch (e) {
            console.log(e, 'aaaaaaaatttttttttttttttttrpppppppp')
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const handleUpdateRequest = async (params) => {
        console.log(params, '---------------')
        const newObject = {
            type: params.requestValue,
            risk: RISK_TABLE[params.risk] * 100,
            risk_success: RISK_TABLE[params.risk] * 100,
            postulated_individual_value: parseFloat(currencyToBackend(params.valueIndividual)),
            postulated_individual: parseFloat(currencyToBackend(params.valuePostulate)),
            ...params
        }

        console.log(newObject, 'newObjectnewObjectnewObject')

        try {

            const { proposal_id, id } = draftRequest
            await api.put(`/proposal/request/${id}/${proposal_id}`, newObject)
            queryClient.invalidateQueries('proposal');
            setOpenSelect(false)
            setDraftRequest(undefined)
            toast.success("Pedido atualizado com sucesso")
        } catch (e) {
            console.log(e, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssspppppppp')
            toast.error("Algo deu errado, tente novamente!")
        }


    }

    useEffect(() => {
        console.log(requestData, 'requestDatarequestDatarequestDatarequestData')
        console.log(requestDataProcess, 'requestDataProcessrequestDataProcessrequestDataProcessrequestDataProcessrequestDataProcess')
    }, [requestDataProcess, requestData])

    return (

        <>

            <LayoutDashboardProccess>

                <HeaderPages title={`Proposta  ${requestData ? requestData.data.type : ""}`} icon={MdEditDocument} />
                <>

                    <WrapperBody>
                        <Flex width={"100%"} onClick={() => { push(`/dashboard/processo/propostas/${proccess_id}`) }} mb={8} cursor={'pointer'} >
                            <MdArrowBack color={colors.text} size={20} />
                            <Text ml={3} mr={3} >Clique para voltar</Text>
                        </Flex>
                        {openSelect && (

                            <Flex flexDirection={"column"} w='100%'>
                                <Text color={colors.text} fontSize='4xl' fontWeight={600}  >

                                </Text>
                                <RequestForm data={{ data: requestData?.data?.Process }} handleAddNewRequest={handleAddNewRequest} handleUpdateRequest={handleUpdateRequest} setOpenSelect={setOpenSelect} draftRequest={draftRequest} />
                            </Flex>
                        )}

                        {requestsValue.length !== 0 && openSelect === false && <>
                            <Result result={result} hasReturn={false} />
                            <List createRequest={createRequest} custonEditFunction={editRequest} requests={requestsValue} setOpenSelect={setOpenSelect} setDraftRequest={setDraftRequest} removeRequest={removeRequest} calcAndSave={calcAndSave} />
                        </>}

                    </WrapperBody>
                </>

            </LayoutDashboardProccess>
        </>
    )
}


const ModalRequest = ({ isOpen, onClose, requestData, handleAddNewRequest, handleUpdateRequest, setOpenSelect, draftRequest }) => {

    const colors = useColors()

    return (
        <Modal preserveScrollBarGap size='xl' isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as='form' borderRadius={5} bg={colors.background} >
                <ModalHeader> </ModalHeader>
                <ModalCloseButton />
                <Suspense>
                    <Flex flexDirection={"column"} w='100%' p={5}>
                        {requestData && <RequestForm data={requestData} handleAddNewRequest={handleAddNewRequest} handleUpdateRequest={handleUpdateRequest} setOpenSelect={setOpenSelect} draftRequest={draftRequest} />}
                    </Flex>
                    <Box mt={4} />
                </Suspense>

            </ModalContent>

        </Modal>
    )
}


export default Index;