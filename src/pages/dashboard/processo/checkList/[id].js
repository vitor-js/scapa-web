import { LayoutDashboardProccess } from '../../../../layouts'
import { HeaderPages, WrapperBody, Input } from '../../../../components'
import { MdEditDocument } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useProcces, useAuth, useColors } from '../../../../hooks'
import { useEffect, useState, useRef } from 'react'
import { Text, Box, Flex, Grid, Button, ButtonGroup, IconButton, Checkbox, CheckboxGroup, Stack, Textarea } from '@chakra-ui/react';
import jsPDF from "jspdf";
import { MdOutlineSmartToy } from "react-icons/md";
import toBRL from '@/helpers/toCurrencyScreen'
import { api } from '@/service'
import CheckListTemplate from '../../../../templates/checkListTemplate/index.js'
import { queryClient } from '../../../../service/queryClient';
import { toast } from 'react-hot-toast';
import { currencyToBackend } from '@/helpers'


function Index() {
    const colors = useColors()
    const { authData } = useAuth()
    const { query } = useRouter()
    const { id } = query

    const { query: request } = useProcces(id, authData.id)
    const { data: requestData, isLoading, isFetching, isError, refetch } = request;

    const [data, setData] = useState({})
    const [checkedItems, setCheckedItems] = useState([])
    const [target, setTarget] = useState("")
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)


    const checkListTemplateRef = useRef(null);


    useEffect(() => {
        if (!requestData || requestData?.data?.Proposals.length < 3) return

        const { postulated_total_value } = requestData?.data?.Proposals[0]
        const sum_total_value_with_risk = requestData?.data?.Proposals.reduce(
            (accumulator, currentValue) => accumulator + currentValue.total_value_with_riks,
            0,
        );
        const proposals = requestData?.data?.Proposals
        setData({
            postulated_total_value,
            sum_total_value_with_risk, proposals
        })
        if (requestData?.data?.Checklist) {
            setTarget(requestData?.data?.Checklist?.target)
            setCheckedItems([requestData?.data?.Checklist?.type_client])
            setValue(requestData?.data?.Checklist?.value)
            return setData({
                postulated_total_value,
                sum_total_value_with_risk, proposals,
                requestData,
                target: requestData?.data?.Checklist?.target,
                checklist: requestData?.data?.Checklist?.type_client,
                value: requestData?.data?.Checklist?.value,


            })
        }

        return setData({
            postulated_total_value,
            sum_total_value_with_risk, proposals
        })

    }, [requestData])


    const handleSetItem = (e) => {
        setError(false)
        const newItem = [e]
        setCheckedItems([...newItem])
    }


    const handleSubmit = () => {
        try {
            if (target === "" || checkedItems.length === 0 || value === "") return setError(true)
            if (requestData?.data?.Checklist) {
                api.put(`checklist/${requestData?.data?.Checklist?.id}`, { type_client: checkedItems[0], target: target, value: parseFloat(currencyToBackend(value)) })

                toast.success("Atualização feita com sucesso")
            } else {
                api.post(`checklist`, { process_id: id, type_client: checkedItems[0], target: target, value: parseFloat(currencyToBackend(value)) })
                toast.success("Checklist cadastrado com sucesso")
            }
            queryClient.invalidateQueries('procces');

        } catch {

        }

    }

    const exportPDF = () => {
        try {
            const doc = new jsPDF({
                format: 'a4',
                unit: 'px',
            });

            // Adding the fonts.
            doc.setFont('Inter-Regular', 'normal');

            doc.html(checkListTemplateRef.current, {
                async callback(doc) {
                    await doc.save(`Check-List - ${id}`);
                    toast.success('Download feito com sucesso!');
                },
            });
        } catch (e) {
            toast.error('Algo deu errado, tente novamente.');
        }
    }




    return (
        <LayoutDashboardProccess>

            <HeaderPages title={`Processo  Nº${requestData ? requestData.data.number_process : ""}`} icon={MdEditDocument} />
            {requestData && requestData?.data?.Proposals.length === 3 && (
                <>
                    <WrapperBody>

                        <Flex mt={5} width={'100%'} flexDirection={'column'}>
                            <Text fontSize={'2xl'} fontWeight={600}>
                                Checklist
                            </Text>
                            {requestData?.data?.Checklist &&
                                <Text mt={3} cursor={'pointer'} onClick={() => { exportPDF() }} fontSize={15} fontWeight={600} color={colors.text} >
                                    Clique para baixar Checklist                            </Text>
                            }

                        </Flex>



                        <Box mt={5} width={'100%'}>
                            <Text fontSize={'2xl'} fontWeight={600}>
                                Valor Real Apurado
                            </Text>
                            <Box _hover={{
                                background: colors.hoverbackground,
                                borderColor: colors.border.hoverColor,
                            }} bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                <Text fontSize={'1xl'} fontWeight={400}>
                                    {toBRL(data?.postulated_total_value)}
                                </Text>
                            </Box>
                        </Box>



                        <Box mt={5} width={'100%'}>
                            <Text fontSize={'2xl'} fontWeight={600}>
                                Propostas
                            </Text>
                            {data.proposals && data.proposals.map((value, index) => (
                                <Grid key={index} bg={colors.cardBackground} padding={4}


                                    borderRadius={5} mt={4} cursor={'pointer'} alignItems={"center"}
                                    gap={10}
                                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}>

                                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                                        <Box>
                                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                                Tipo
                                            </Text>
                                        </Box>

                                        <Box mt={1}>
                                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                                {value.type}
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
                                                {toBRL(value.total_value)}
                                            </Text>
                                        </Box>


                                    </Flex>

                                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                                        <Box>
                                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                                Valor Total Postulado
                                            </Text>
                                        </Box>

                                        <Box mt={1}>
                                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                                {toBRL(value.postulated_total_value)}
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
                                                {toBRL(value.total_value_with_riks)}
                                            </Text>
                                        </Box>


                                    </Flex>

                                </Grid>
                            ))}
                        </Box>




                        <Box mt={5} width={'100%'}>
                            <Text fontSize={'2xl'} fontWeight={600}>
                                Estratégia
                            </Text>
                            <Box bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} cursor={'pointer'} >
                                <Text mb={5} fontSize={'1xl'} fontWeight={600}>
                                    Análise de risco
                                </Text>

                                <Input
                                    value={value} onChange={(e) => {
                                        setError(false)
                                        setValue(e.target.value)
                                    }}

                                    mb={3} label='Valor indicado' mask='currency' />


                                <CheckboxGroup mt={3} colorScheme='green' value={checkedItems} defaultValue={checkedItems}>
                                    <Stack mt={3} spacing={[1, 5]} direction={['column', 'column']}>
                                        <Checkbox onChange={(e) => handleSetItem(e.target.value)} value='aversao_risco'>Aversão a Risco</Checkbox>
                                        <Checkbox onChange={(e) => handleSetItem(e.target.value)} value='apetite_risco'>Apetite a Risco</Checkbox>
                                        <Checkbox onChange={(e) => handleSetItem(e.target.value)} value='indiferente'>Indiferente a Risco</Checkbox>
                                    </Stack>
                                </CheckboxGroup>

                                <Text mt={5} fontSize={'1xl'} fontWeight={600}>
                                    Qual sua meta de acordo
                                </Text>

                                <Textarea value={target} onChange={(e) => {
                                    setError(false)
                                    setTarget(e.target.value)
                                }} mt={3} placeholder='Descreva sua meta de acordo' />

                                {error &&
                                    <Box onClick={() => setError(false)} background={colors.bgDanger} mt={3} p={3} borderRadius={colors.border.radius} >
                                        <Text color={colors.textDanger} fontWeight={600}>
                                            Todos os campos acima precisam estar prenchidos
                                        </Text>
                                    </Box>
                                }

                                <Flex mt={3} alignItems={'center'} justifyContent={'flex-end'}>
                                    <Button color="#fff" onClick={() => handleSubmit()} >Salvar</Button>
                                </Flex>
                            </Box>




                        </Box>


                        <div style={{ opacity: 0 }} >
                            <div ref={checkListTemplateRef}>
                                <CheckListTemplate data={data} />
                            </div>
                        </div>
                    </WrapperBody>
                </>
            )}
            {requestData && requestData?.data?.Proposals.length < 3 && (
                <>
                    <WrapperBody>

                        <Flex mt={5} width={'100%'} flexDirection={'column'}>
                            <Text fontSize={'2xl'} fontWeight={600}>
                                Checklist
                            </Text>

                            <Flex
                                flexDirection={'column'}
                                bg={colors.cardBackground} padding={4} borderRadius={5} mt={4}>
                                <MdOutlineSmartToy color={colors.text} size={40} />
                                <Text fontSize={20} mt={2} fontWeight={400}>
                                    Para criar seu ticket é necessário que todos os modelos de proposta estejam preenchidas
                                </Text>
                            </Flex>
                        </Flex>
                    </WrapperBody>

                </>
            )}
        </LayoutDashboardProccess>
    )
}

export default Index