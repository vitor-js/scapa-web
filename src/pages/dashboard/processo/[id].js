

import { LayoutDashboardProccess } from '../../../layouts'
import { HeaderPages, WrapperBody, Input, } from '../../../components'
import { MdEditDocument } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useProcces, useAuth, useColors } from '../../../hooks'
import { useEffect, useState } from 'react'
import { Text, Box, Flex, Grid, Button } from '@chakra-ui/react';
import * as yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast';
import { api } from '@/service'
import { queryClient } from '../../../service/queryClient';
import { toCurrencyScreen, naiveToBrlDate, monthDiff, currencyToBackend } from '../../../helpers'


const schemForm = yup.object().shape({
    title: yup.string().required('Campo obrigatório'),
    number_process: yup.string().required('Campo obrigatório'),
    autor: yup.string().required('Campo obrigatório'),
    reu: yup.string().required('Campo obrigatório'),
    // description: yup.string().required('Campo obrigatório'),

})

const schemFormDate = yup.object().shape({

    // end_date: yup.date().required('Campo obrigatório'),
    // start_date: yup.date().required('Campo obrigatório'),
    salary: yup.string().required('Campo obrigatório'),

})


function Index() {

    const { authData } = useAuth()
    const { query, push } = useRouter()
    const { id } = query


    const { query: request } = useProcces(id, authData.id)
    const { data: requestData, isLoading, isFetching, isError, refetch, } = request;
    const [end_date_value, set_end_date_value] = useState()
    const [start_date_value, set_start_date_value] = useState()

    const colors = useColors()

    const {
        register,
        handleSubmit,
        setValue: setValueForm,
        reset,
        formState: { errors, isSubmitting, dirtyFields, },
    } = useForm({
        resolver: yupResolver(schemForm),
    });


    const {
        register: resiterDate,
        handleSubmit: handleSubmitDate,
        setValue: setValueFormData,

        formState: { errors: errorsDate },
    } = useForm({
        resolver: yupResolver(schemFormDate),
    });

    const handleSubmitForm = async (values) => {
        console.log(values)
        try {
            await api.put(`proccess/${id}`, { ...values })
            reset()
            queryClient.invalidateQueries('proccess');

            toast.success('Atualização feita com sucesso!');
        } catch (e) {
            console.log(e)
            toast.error('Algo deu errado, tente novamente.');
        }
    }


    useEffect(() => {

        if (!requestData) return



        // console.log(requestData, 'aaaaaaaaaaddddd')
        setValueForm('title', requestData.data.title)
        setValueForm('number_process', requestData.data.number_process)
        setValueForm('autor', requestData.data.autor)
        setValueForm('reu', requestData.data.reu)
        setValueForm('description', requestData.data.description)
        setValueForm("proccess_time", requestData.data.proccess_time)

        setValueForm("salary", toCurrencyScreen(requestData.data.salary))
        setValueForm("reu_cost", toCurrencyScreen(requestData.data.reu_cost))
        setValueFormData("salary", toCurrencyScreen(requestData.data.salary))
        if (requestData.data.end_date !== "false" && requestData.data.start_date !== "false") {
            console.log(typeof requestData.data.start_date, "asdddfgaaaaaaaaaaaaaaaaaaasss")
            const ParseStartDate = new Date(requestData.data.start_date)
            const ParseEndDate = new Date(requestData.data.end_date)


            set_end_date_value(ParseEndDate.toLocaleString("pt-br", { timeZone: 'UTC' }).substring(0, 10))
            set_start_date_value(ParseStartDate.toLocaleString("pt-br", { timeZone: 'UTC' }).substring(0, 10))

        }
    }, [requestData])


    const handleRemoveProcess = async (e) => {
        e.preventDefault()
        try {
            await api.delete(`/proccess/${id}`,)

            await push("/dashboard")
            queryClient.invalidateQueries('proccess');
            toast.success("Processo removido com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const handleSubmitFormDate = async (v) => {
        console.log(currencyToBackend(v.salary))
        const start = isNaN(v.start_date) ? new Date(requestData.data.start_date) : new Date(v.start_date)
        const end = isNaN(v.end_date) ? new Date(requestData.data.end_date) : new Date(v.end_date)
        const proccess_time_work = monthDiff(start, end)

        try {
            await api.put(`proccess/${id}`, {
                start_date: start.toString(),
                end_date: end.toString(),
                time_worked_months: proccess_time_work,
                salary: currencyToBackend(v.salary)
            })
            reset()
            queryClient.invalidateQueries('proccess');
            refetch()
            toast.success('Atualização feita com sucesso!');
        } catch (e) {
            console.log(e)
            toast.error('Algo deu errado, tente novamente.');
        }
    }



    return (
        <LayoutDashboardProccess>

            <HeaderPages title={`Processo  Nº${requestData ? requestData.data.number_process : ""}`} icon={MdEditDocument} />

            {requestData && (
                <>
                    <WrapperBody>
                        <Flex as='form' mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                            <Text fontWeight="bold" fontSize="2xl" color={colors.text}>Dados do Processo</Text>
                            <Grid mt={5} gridTemplateColumns={['1fr', '1fr 1fr',]} gap={4}>
                                <Input
                                    name='title'
                                    color={colors.text}
                                    error={errors?.title?.message}
                                    {...register("title")}
                                    default
                                    label='Titulo Identificador'
                                />
                                <Input

                                    label='Número do Processo'
                                    name='number_process' error={errors?.number_process?.message} {...register("number_process")}
                                />
                                <Input label='Autor'
                                    name='autor' error={errors?.autor?.message}  {...register("autor")}
                                />


                                <Input label='Tempo do processo'
                                    name='proccess_time' error={errors?.autor?.proccess_time}  {...register("proccess_time")}
                                />
                                <Input label='Réu' name='reu' error={errors?.reu?.message} {...register("reu")} />
                                <Input label='Custo do Réu' mask="currency" name='reu_cost' error={errors?.description?.reu_cost}  {...register("reu_cost")} />




                            </Grid>
                            <Box mt={4}>

                            </Box>

                            <Flex mt={4} alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                                <Button onClick={handleSubmit(handleSubmitForm)} color="#fff" type='submit'>
                                    Atualizar
                                </Button>
                            </Flex>

                        </Flex>

                        <Flex as='form'
                            onSubmit={handleSubmitDate(handleSubmitFormDate)}
                            mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                            <Text fontSize='2xl' fontWeight={600}>
                                Contrato de trabalho
                            </Text>


                            <Text fontSize='1xl' fontWeight={600} mt={3}>
                                Valores já registrados
                            </Text>
                            <Grid mt={1} gridTemplateColumns={['1fr', '1fr 1fr',]} gap={4}>

                                <Flex >
                                    <Flex mt={0} width={'100%'} flexDirection={'column'}>
                                        <Box>
                                            <Text fontSize={15} fontWeight={400} >
                                                Data de início
                                            </Text>
                                        </Box>

                                        <Box >
                                            <Text fontSize={15} fontWeight={400}  >
                                                {start_date_value || "Nenhum valor cadastrado"}
                                            </Text>
                                        </Box>


                                    </Flex>
                                </Flex>


                                <Flex >
                                    <Flex mt={0} width={'100%'} flexDirection={'column'}>
                                        <Box>
                                            <Text fontSize={15} fontWeight={400}  >
                                                Data de fim
                                            </Text>
                                        </Box>

                                        <Box >
                                            <Text fontSize={15} fontWeight={400}  >
                                                {end_date_value || "Nenhum valor cadastrado"}
                                            </Text>
                                        </Box>


                                    </Flex>
                                </Flex>



                            </Grid>

                            <Text mt={5} fontSize='1xl' fontWeight={600}>
                                Selecione novas datas caso deseje editar
                            </Text>
                            <Grid mt={2} gridTemplateColumns={['1fr', '1fr 1fr',]} gap={4}>



                                <Input type='date' name='start_date' label='Data de início do contrato de trabalho' error={errorsDate?.start_date?.message}  {...resiterDate("start_date", { valueAsDate: true })} />


                                <Input type='date' name='end_date' label='Data de fim do contrato de trabalho' error={errorsDate?.end_date?.message}  {...resiterDate("end_date", { valueAsDate: true })} />


                            </Grid>
                            <Grid mt={2} gridTemplateColumns={['2fr',]} gap={4}>
                                <Input mask="currency" name='salary' label='Informe o valor do salário' error={errorsDate?.salary?.message}  {...resiterDate("salary")} />
                            </Grid>

                            <Flex mt={4} alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                                <Button color="#fff" type='submit'>
                                    Atualizar
                                </Button>
                            </Flex>

                        </Flex>



                        <Flex as='form' onSubmit={async (e) => {
                            e.preventDefault()
                            await push(`/dashboard/processo/propostas/${id}`)
                        }
                        } mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                            <Text fontSize='2xl' fontWeight={600}>
                                Deseja criar uma proposta para este processo ?
                            </Text>

                            <Flex
                                flexDirection={'column'}
                                bg={colors.cardBackground} borderRadius={5}
                                justifyContent={"center"}
                            >

                                <Text fontSize={16} fontWeight={400}>
                                    Clique no botão  para criar ou administrar suas propostas
                                </Text>

                                <Flex alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                                    <Button color="#fff" type='submit'>
                                        Ir para propostas
                                    </Button>
                                </Flex>

                            </Flex>

                        </Flex>


                        <Flex as='form' onSubmit={(e) => handleRemoveProcess(e)} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                            <Text fontSize='2xl' fontWeight={600}>
                                Excluir processo
                            </Text>

                            <Flex
                                flexDirection={'column'}
                                bg={colors.cardBackground} borderRadius={5}
                                justifyContent={"center"}
                            >

                                <Text fontSize={16} fontWeight={400}>
                                    Caso queira excluir este processo permanentemente clique no botao ao lado
                                </Text>

                                <Flex alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                                    <Button
                                        _hover={{
                                            background: colors.bgDanger,

                                        }}
                                        color="#fff"
                                        backgroundColor={colors.textDanger} type='submit'>
                                        Excluir Processo
                                    </Button>
                                </Flex>

                            </Flex>

                        </Flex>



                    </WrapperBody>
                </>
            )
            }
        </LayoutDashboardProccess >
    )
}

export default Index