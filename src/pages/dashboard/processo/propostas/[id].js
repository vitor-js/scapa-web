import { useState, useEffect } from 'react'
import { LayoutDashboardProccess } from '../../../../layouts'
import { HeaderPages, WrapperBody, Input, } from '../../../../components'

import { useRouter } from 'next/router'
import { useProcces, useAuth, useColors } from '../../../../hooks'
import { toCurrencyScreen } from '../../../../helpers'
import { Text, Box, Flex, Grid, Button, IconButton, ButtonGroup } from '@chakra-ui/react';
import * as yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { FaEye } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { api } from '@/service'


const schemForm = yup.object().shape({
    title: yup.string().required('Campo obrigatório'),
    number_process: yup.string().required('Campo obrigatório'),
    autor: yup.string().required('Campo obrigatório'),
    reu: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
})


function Index() {

    const { authData } = useAuth()
    const { query } = useRouter()
    const { id } = query


    const { query: request } = useProcces(id, authData.id)
    const { data: requestData, isLoading, isFetching, isError, refetch } = request;


    const colors = useColors()
    const router = useRouter()

    const [haveNeutraProposal, setHaveNeutraProposal] = useState(false)


    useEffect(() => {

        requestBuildDataView()
    }, [requestData])

    const requestBuildDataView = () => {
        const haveNeutra = requestData?.data?.Proposals.find(e => e.type === "Neutra")

        if (requestData?.data?.Proposals.length !== 0 && !haveNeutra) return

        if (haveNeutra) setHaveNeutraProposal(true)
    }

    const removeProposal = async (id) => {
        try {
            await api.delete(`proposal/${id}`)
            await refetch()
            requestBuildDataView()
        } catch {

        }

    }



    const ClickCreateProposal = ({ type }) => {
        return (
            <Box onClick={() => {
                router.push(`/dashboard/processo/nova-proposta/${id}?type=${type}`)
            }} mt={5} width={'100%'}>
                <Text fontSize={'2xl'} fontWeight={600}>
                    Proposta {type}
                </Text>
                <Box _hover={{
                    background: colors.hoverbackground,
                    borderColor: colors.border.hoverColor,
                }} bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                    <Text fontSize={'1xl'} fontWeight={400}>
                        Clique para criar a proposta
                    </Text>
                </Box>
            </Box>
        )
    }

    const ModelProposal = ({ value, type }) => {
        return (
            <Box mt={5} width={'100%'}>
                <Text fontSize={'2xl'} fontWeight={600}>
                    Proposta {type}
                </Text>

                <Grid bg={colors.cardBackground} padding={4}


                    borderRadius={5} mt={4} cursor={'pointer'} alignItems={"center"}
                    gap={10}
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}>

                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor Total Postulado
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {toCurrencyScreen(value.postulated_total_value)}
                            </Text>
                        </Box>


                    </Flex>
                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor individualizado com  risco
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {toCurrencyScreen(value.total_value_with_riks)}
                            </Text>
                        </Box>


                    </Flex>

                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor Total da proposta
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {toCurrencyScreen(value.total_value)}
                            </Text>
                        </Box>


                    </Flex>





                    <Flex my={6} width={'100%'} flexDirection={'column'} alignItems={'flex-end'}>



                        <ButtonGroup gap="2">
                            <IconButton
                                size="md"
                                fontSize="lg"
                                variant="ghost"
                                backgroundColor={colors.background}
                                borderColor={colors.border.hoverColor}
                                borderWidth={1}
                                cursor="pointer"
                                transition="ease all 0.1s"
                                onClick={() => {
                                    router.push(`/dashboard/processo/proposta/${value.id}?proccess_id=${id}`)
                                }}
                                icon={<FaEye />}

                            />
                            <IconButton
                                size="md"
                                fontSize="lg"
                                variant="ghost"
                                backgroundColor={colors.background}
                                borderColor={colors.border.hoverColor}
                                borderWidth={1}
                                cursor="pointer"
                                transition="ease all 0.1s"
                                onClick={() => { removeProposal(value.id) }}
                                icon={<FaTrash />}
                                aria-label={`Exit aplication`}
                            />
                        </ButtonGroup>



                    </Flex>
                </Grid>
            </Box>
        )
    }


    const findProposal = (type) => {
        const item = requestData?.data?.Proposals.find(e => e.type === type)
        if (!item) return (<ClickCreateProposal type={type} />)
        return (<ModelProposal value={item} type={type} />)
    }


    return (
        <LayoutDashboardProccess>


            {requestData && (
                <>
                    <HeaderPages title={`Processo  Nº${requestData ? requestData?.data?.number_process : ""}`} icon={MdEditDocument} />

                    {console.log(haveNeutraProposal)}
                    {console.log(haveNeutraProposal)}

                    {requestData?.data?.Proposals.length !== 0 && (
                        <>
                            <WrapperBody>

                                {findProposal("Neutra")}
                                {findProposal("Otimista")}
                                {findProposal("Pessimista")}

                                {/* <Box onClick={() => {
                                    router.push(`/dashboard/processo/nova-proposta/${id}?type=Neutra`)
                                }} mt={5} width={'100%'}>
                                    <Text fontSize={'2xl'} fontWeight={600}>
                                        Modelo de proposta Neutra
                                    </Text>

                                    <Box _hover={{
                                        background: colors.hoverbackground,
                                        borderColor: colors.border.hoverColor,
                                    }} bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                        <Text fontSize={'1xl'} fontWeight={400}>
                                            Clique para criar modelo de proposta
                                        </Text>
                                    </Box>
                                </Box>


                                <Box onClick={() => {
                                    router.push(`/dashboard/processo/nova-proposta/${id}?type=Otimista`)
                                }} mt={5} width={'100%'}>
                                    <Text fontSize={'2xl'} fontWeight={600}>
                                        Modelo de proposta otimista
                                    </Text>
                                    <Box _hover={{
                                        background: colors.hoverbackground,
                                        borderColor: colors.border.hoverColor,
                                    }} bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                        <Text fontSize={'1xl'} fontWeight={400}>
                                            Clique para criar modelo de proposta
                                        </Text>
                                    </Box>
                                </Box>


                                <Box onClick={() => {
                                    router.push(`/dashboard/processo/nova-proposta/${id}?type=Pessimista`)
                                }} mt={5} width={'100%'}>
                                    <Text fontSize={'2xl'} fontWeight={600}>
                                        Modelo de proposta Pessimista
                                    </Text>

                                    <Box _hover={{
                                        background: colors.hoverbackground,
                                        borderColor: colors.border.hoverColor,
                                    }} bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                        <Text fontSize={'1xl'} fontWeight={400}>
                                            Clique para criar modelo de proposta
                                        </Text>
                                    </Box>
                                </Box> */}
                            </WrapperBody>
                        </>
                    )}


                    {requestData?.data?.Proposals.length === 0 && (<>

                        <WrapperBody>

                            <Box bg={colors.cardBackground} w={'100%'} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                <Text fontSize={'1xl'} fontWeight={400}>
                                    Para iniciar, desenvolva sua primeira proposta utilizando o modelo neutro disponível.
                                </Text>
                            </Box>

                            <Box onClick={() => {
                                router.push(`/dashboard/processo/nova-proposta/${id}?type=Neutra`)
                            }} mt={5} width={'100%'}>
                                <Text fontSize={'2xl'} fontWeight={600}>
                                    Proposta Neutra
                                </Text>

                                <Box _hover={{
                                    background: colors.hoverbackground,
                                    borderColor: colors.border.hoverColor,
                                }} bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                    <Text fontSize={'1xl'} fontWeight={400}>
                                        Clique para criar a proposta
                                    </Text>
                                </Box>
                            </Box>


                            <Box opacity={0.4} mt={5} width={'100%'} cursor={"not-allowed"}>
                                <Text fontSize={'2xl'} fontWeight={600}>
                                    Proposta otimista
                                </Text>
                                <Box
                                    cursor={"not-allowed"}
                                    bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} >
                                    <Text fontSize={'1xl'} fontWeight={400}>
                                        Clique para criar a proposta
                                    </Text>
                                </Box>
                            </Box>


                            <Box opacity={0.4} mt={5} width={'100%'} cursor={"not-allowed"}>
                                <Text fontSize={'2xl'} fontWeight={600}>
                                    Proposta Pessimista
                                </Text>

                                <Box bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={"not-allowed"} >
                                    <Text fontSize={'1xl'} fontWeight={400}>
                                        Clique para criar a proposta
                                    </Text>
                                </Box>
                            </Box>
                        </WrapperBody>




                    </>)}



                </>
            )}
        </LayoutDashboardProccess>
    )
}

export default Index