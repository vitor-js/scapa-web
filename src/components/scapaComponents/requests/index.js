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
import { MdArrowBack } from "react-icons/md";


function Index({ requests = [], setRequests, data }) {


    const router = useRouter()
    const { query } = router
    const { id, type, push } = query
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
        } catch (e) {
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

            const RISK_TABLE = {
                Inexistente: 0.0,
                "Muito Baixo": 0.1,
                Baixo: 0.25,
                Médio: 0.5,
                Alto: 0.75,
                "Muito Alto": 0.9,
                Total: 1.0,

            };


            const RISK_TABLE_REVERSE = {
                0: "Inexistente",
                10: "Muito Baixo",
                25: "Baixo",
                50: "Médio",
                75: "Alto",
                90: "Muito Alto",
                100: "Total",
            };

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

            const format_request = requests.map(v => {
                const risk = v.risk
                if (typeof risk === 'number') {
                    return {
                        ...v,
                        valueIndividual: parseFloat(currencyToBackend(v.valueIndividual)),
                        valuePostulate: parseFloat(currencyToBackend(v.valuePostulate)),
                        riskSuccess: RISK_TABLE_REVERSE[risk],
                        risk_success: RISK_TABLE_REVERSE[risk],
                    }
                }
                else {
                    return {
                        ...v,
                        valueIndividual: parseFloat(currencyToBackend(v.valueIndividual)),
                        valuePostulate: parseFloat(currencyToBackend(v.valuePostulate)),
                        riskSuccess: RISK_TABLE[risk],
                        risk_success: RISK_TABLE[risk],
                    }
                }


            })

            const body = {
                postulated_total_value: valotTotalPostulado, total_value_with_riks: valueTotalPostulateIndividual, total_value: valueProposal, interest: 0, process_id: id,
                requests: format_request, type: query.type
            }
            console.log(body, 'bodybody')
            setResult(result)
            await api.post("proposal", body)
            queryClient.invalidateQueries('procces');
            toast.success("Proposta salva com sucesso!")
            setShowResult(true)


        } catch (e) {
            console.log(e)
            toast.error("Algo deu errado, tente novamente!")
        }

    }



    return (<>
        <>
            <Flex flexDirection={'column'} Flex w={'100%'}>

                <Flex alignItems={'center'} onClick={() => { router.push(`/dashboard/processo/propostas/${id}`) }} mb={8} cursor={'pointer'} >
                    <MdArrowBack color={colors.text} size={20} />
                    <Text ml={3} mr={3} >Clique para voltar</Text>
                </Flex>


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
            </Flex>
        </>
    </>);
}

export default Index;