import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import { MdAddCircle } from "react-icons/md";
import { currencyToBackend } from '../../../helpers'
import { useColors } from '../../../hooks'
import Request from './components'
import { useRouter } from 'next/router'
import { api } from '../../../service'
import { queryClient } from '../../../service/queryClient';
import { toast } from 'react-hot-toast';

function Index({ requests = [], setRequests, data }) {


    const router = useRouter()
    const { query } = router
    const { id, type } = query
    const colors = useColors()
    const [openSelect, setOpenSelect] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState()
    const [draftRequest, setDraftRequest] = useState()

    useEffect(() => {

        if (!data) return router.push(`/dashboard/processo/propostas/${id}`)
    }, [data])

    const handleAddNewRequest = (values) => {
        try {
            setRequests((oldValue) => {
                const draft = oldValue
                draft.push(values)
                return [...draft]
            })
            setOpenSelect(false)
            setDraftRequest(undefined)
            toast.success("Pedido adicionado com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const removeRequest = (id) => {
        try {
            setRequests((oldValue) => {
                const draft = oldValue
                draft.splice(id, 1)
                return [...draft]
            })
            setDraftRequest(undefined)
            toast.success("Pedido removido com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const handleUpdateRequest = (params) => {
        try {
            setRequests((oldValue) => {
                const indexOldValue = oldValue.findIndex(v => v.requestValue === params.requestValue)
                const draft = oldValue
                draft[indexOldValue] = params
                return [...draft]
            })
            setDraftRequest(undefined)
            setOpenSelect(false)
            toast.success("Pedido atualizado com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }



    }

    const calcAndSave = async () => {
        try {
            const valotTotalPostulado = requests.reduce(
                (accumulator, currentValue) =>
                (accumulator += parseFloat(
                    currencyToBackend(currentValue.valuePostulate)
                )),
                0
            );


            const valueTotalPostulateIndividual = requests.reduce(
                (accumulator, currentValue) =>
                (accumulator += parseFloat(
                    currencyToBackend(currentValue.valueIndividual)
                )),
                0
            );

            const valueProposal =
                valueTotalPostulateIndividual + parseFloat(currencyToBackend(data?.data?.reu_cost));

            const result = {
                type: query.type,
                valotTotalPostulado,
                valueTotalPostulateIndividual,
                valueProposal,
                requests,
                reu: data?.data?.reu,
                proccess_time: data?.data?.proccess_time,
                title: data?.data?.title,
                description: data?.data?.description,
                autor: data?.data?.autor,
                number_process: data.data.number_process,
                custo_reu: data.data.reu_cost
            }

            const body = {
                postulated_total_value: valotTotalPostulado, total_value_with_riks: valueTotalPostulateIndividual, total_value: valueProposal, interest: 0, process_id: id, requests: requests.map(v => ({
                    ...v,
                    valueIndividual: parseFloat(currencyToBackend(v.valueIndividual)),
                    valuePostulate: parseFloat(currencyToBackend(v.valuePostulate)),
                })), type: query.type
            }

            setResult(result)
            await api.post("proposal", body)
            queryClient.invalidateQueries('procces');
            toast.success("Proposta salva com sucesso!")
            setShowResult(true)


        } catch {
            toast.error("Algo deu erradom, tente novamente!")
        }

    }



    return (<>
        <Flex w={'100%'} >
            {requests.length === 0 && openSelect === false && showResult === false &&
                <>
                    <Flex flexDirection={"column"} w='100%'>
                        <Text color={colors.text} fontSize='4xl' fontWeight={600}  >
                            {type !== "Neutra" ? "Ajuste o nível de risco para essa modalidade de proposta" : "Gerencie seus pedidos"}

                        </Text>
                        <Request.default setOpenSelect={setOpenSelect} />
                    </Flex>
                </>

            }
            {openSelect && (

                <Flex flexDirection={"column"} w='100%'>
                    <Text color={colors.text} fontSize='4xl' fontWeight={600}  >
                        {type !== "Neutra" ? "Ajuste o nível de risco para essa modalidade de proposta" : "Gerencie seus pedidos"}
                    </Text>
                    <Request.requestForm data={data} handleAddNewRequest={handleAddNewRequest} handleUpdateRequest={handleUpdateRequest} setOpenSelect={setOpenSelect} draftRequest={draftRequest} />
                </Flex>
            )}
            {requests.length !== 0 && openSelect === false && showResult === false && (

                <>

                    <Flex flexDirection={"column"} w='100%'>
                        <Text color={colors.text} fontSize='4xl' fontWeight={600}  >
                            {type !== "Neutra" ? "Ajuste o nível de risco para essa modalidade de proposta" : "Gerencie seus pedidos"}
                        </Text>
                        <Request.requestList
                            requests={requests}
                            setDraftRequest={setDraftRequest}
                            removeRequest={removeRequest}
                            setOpenSelect={setOpenSelect}

                            calcAndSave={calcAndSave}

                        />
                    </Flex>




                </>

            )}
            {showResult === true && openSelect === false && <>
                <div style={{ opacity: 1 }} >
                    <Text color={colors.text} fontSize='4xl' fontWeight={600}  >
                        Proposta adicionada com sucesso!
                    </Text>

                    <Request.requestResult result={result} />
                </div>
            </>}
        </Flex>
    </>);
}

export default Index;