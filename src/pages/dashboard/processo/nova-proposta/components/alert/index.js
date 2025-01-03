

import React, { useEffect, useState } from "react"
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import { useColors, useWizardContext } from '../../../../../../hooks'
import { useRouter } from 'next/router'
import { converteNaiveDate } from '../../../../../../helpers'
import { MdArrowBack } from "react-icons/md";
import { color } from "framer-motion"
import { Select } from '../../../../../../components'
import { api } from "@/service"
import toBRL from "@/helpers/toCurrencyScreen"



function Index({ data, setPrerequests }) {

    const colors = useColors()
    const { actions } = useWizardContext()
    const { query, push } = useRouter()
    const { type, id } = query
    const [options, setOptions] = useState([])
    const [select, setSelect] = useState()









    useEffect(() => {
        if (!data) return
        if (data?.data?.Proposals.length !== 0) {
            const requests = data?.data?.Proposals.map(v => {
                return {
                    value: v.id,
                    label: v.type
                }
            })

            setOptions([...requests])
        }
    }, [data])

    const onSubmit = async () => {
        if (!select || select === "") return actions.goNextPage()
        try {
            const { data: data } = await api.get(`proposal/${select}`)
            console.log(data, "data import")
            const formatRequests = data?.data?.Requests.map((v => ({
                ...v,
                risk: v.risk_success ? v.risk_success : v.risk
            })))
            setPrerequests([...formatRequests])
            return actions.goNextPage()
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <Box width={'100%'}>


            {/* <Flex alignItems={'center'} onClick={() => { push(`/dashboard/processo/${id}`) }} mb={8} cursor={'pointer'} >
                <MdArrowBack color={colors.text} size={20} />
                <Text ml={3} mr={3} >Clique para voltar</Text>
            </Flex> */}

            <Text color={colors.text} fontSize='4xl' fontWeight={600}  >
                Alguns avisos importantes
            </Text>

            <Text color={colors.text} fontSize='lg' fontWeight={400} my={2} w={'100%'}  >
                Antes de prosseguirmos, é fundamental que dediquemos um momento para conscientemente reconhecer e internalizar a premissa subjacente de que a proposta em discussão é iniciada sob a seguinte perspectiva:
            </Text>

            <Box my={2} width={'100%'} px={5} py={2} borderRadius={5} bg={colors.cardBackground} w={'100%'} borderColor={colors.border} borderWidth={1}  >
                <Text color={colors.text} fontSize='lg' fontWeight={600} my={2}>
                    {type}
                </Text>
            </Box>

            <Text color={colors.text} fontSize='lg' py={2} fontWeight={600}  >
                Importante lembrar que as informacoes basicas usadas para esta proposta sao:
            </Text>




            {/* <Text color={colors.text} fontSize='md' fontWeight={400} my={2} w={'100%'}  >
                Data de inicio
            </Text> */}

            {/* <Box my={2} width={'100%'} px={5} py={2} borderRadius={5} bg={colors.cardBackground} w={'100%'} borderColor={colors.border} borderWidth={1}  >
                <Text color={colors.text} fontSize='md' fontWeight={600} my={2}>
                    {converteNaiveDate(data.data.start_date)}
                </Text>
            </Box>

            <Text color={colors.text} fontSize='md' fontWeight={400} my={2} w={'100%'}  >
                Data de Fim
            </Text>

            <Box my={2} width={'100%'} px={5} py={2} borderRadius={5} bg={colors.cardBackground} w={'100%'} borderColor={colors.border} borderWidth={1}  >
                <Text color={colors.text} fontSize='md' fontWeight={600} my={2}>
                    {converteNaiveDate(data.data.end_date)}
                </Text>
            </Box>
 */}


            <Text color={colors.text} fontSize='md' fontWeight={400} my={2} w={'100%'}  >
                Custo do Reu
            </Text>

            <Box my={2} width={'100%'} px={5} py={2} borderRadius={5} bg={colors.cardBackground} w={'100%'} borderColor={colors.border} borderWidth={1}  >
                <Text color={colors.text} fontSize='md' fontWeight={600} my={2}>
                    {toBRL(data?.data?.reu_cost)}
                </Text>
            </Box>

            {data?.data?.Proposals.length !== 0 && (<>

                <Text color={colors.text} fontSize='lg' py={2} fontWeight={600}  >
                    Deseja aproveitar pedidos de propostas a anteriores, seleciona a proposta que gostaria de usar
                </Text>

                <Select options={options}

                    onChange={(e) => setSelect(e.target.value)}
                    name='pedido'
                />


            </>)}



            <Flex w={'100%'} mt={6} alignItems={"flex-end"} justifyContent={'flex-end'} >
                <Button color="#fff" onClick={() => onSubmit()} >
                    <Text color={"#fff"} fontSize='lg' fontWeight={400} my={2}>
                        Continuar
                    </Text>
                </Button>
            </Flex>
        </Box>

    )
}

export default Index