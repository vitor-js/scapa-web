import React from 'react';

import { Grid, GridItem, Flex } from '@chakra-ui/react'
import { HeaderBar, DashboardHomeMenu, Input, Select } from '../../../components'
import { useDisclosure } from '@chakra-ui/react'
import { useColors, useAuth } from '../../../hooks'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Box
} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { currencyToBackend, monthDiff } from '../../../helpers'
import { api } from '../../../service';
import { useRouter } from 'next/router'
import { queryClient } from '../../../service/queryClient';
import { toast } from 'react-hot-toast';

function Index({ children }) {
    const { authData } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const colors = useColors()
    const router = useRouter()
    const schema = yup.object().shape({
        title: yup.string().required('Campo obrigatório'),
        number_process: yup.string().required('Campo obrigatório'),
        proccess_time: yup.string().required('Campo obrigatório'),
        autor: yup.string().required('Campo obrigatório'),
        reu: yup.string().required('Campo obrigatório'),
        end_date: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string();
        }),
        start_date: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
        salary: yup.lazy((value) => {
            if (value !== undefined && value !== "") {
                return yup.string().required('Este campo é origatório');
            }
            return yup.string().nullable().optional();
        }),
        have_calc: yup.string().required('Campo obrigatório'),
    })



    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    const have_calc_value = watch('have_calc')

    const handleSubmitForm = async (values) => {
        try {

            let idredirect = 0
            if (have_calc_value === "Sim") {
                // console.log(values)
                const proccess_time_work = monthDiff(new Date(values.start_date), new Date(values.end_date))
                // console.log(proccess_time_work)

                const { data } = await api.post("proccess", {
                    ...values, reu_cost: currencyToBackend(values.reu_cost), user_id: authData.id,
                    start_date: values.start_date.toString(),
                    end_date: values.end_date.toString(),
                    description: "",
                    salary: currencyToBackend(values.salary),
                    time_worked_months: proccess_time_work,
                    have_calc: true

                })
                idredirect = data.data?.id
            } else {
                const { data } = await api.post("proccess", {
                    ...values, reu_cost: currencyToBackend(values.reu_cost), user_id: authData.id,
                    // start_date: values.start_date.toString(),
                    // end_date: values.end_date.toString(),
                    time_worked_months: 0,
                    description: "",
                    salary: 0,
                    have_calc: false

                })
                idredirect = data.data?.id
            }


            reset()
            queryClient.invalidateQueries('proccess');
            onClose()

            router.push(`/dashboard/processo/${idredirect}`)





            toast.success("Cadastro realizado com sucesso")
        } catch (e) {
            console.log(e, 'a')
            toast.error("Algo deu errado, tente novamente!")
        }
    }

    return (
        <Grid
            templateAreas={`"header header" "nav main"`}
            gridTemplateRows={'auto 1fr'}
            gridTemplateColumns={'260px 1fr'}
            h="100vh"
            overflow={"hidden"}
            gap="0"
        >
            <Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as='form' onSubmit={handleSubmit(handleSubmitForm)} borderRadius={5} bg={colors.background}>

                    <ModalHeader>Cadastrar novo processo    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box >
                            <Box my='5'>
                                <Input
                                    name='title'
                                    color={colors.text}
                                    error={errors?.title?.message}
                                    {...register("title")}
                                    label='Identificador do processo' />
                            </Box>

                            <Box my='5'>
                                <Input mask={"number"} name='number_process' error={errors?.number_process?.message} {...register("number_process")} label='Número do Processo' />
                            </Box>


                            <Box my='5'>
                                <Input label='Autor' name='autor' error={errors?.autor?.message}  {...register("autor")} />
                            </Box>

                            <Box my='5'>
                                <Input label='Réu' name='reu' error={errors?.reu?.message} {...register("reu")} />
                            </Box>
                            <Box my='5'>
                                <Input mask="currency" label='Custo do Réu' name='reu_cost' error={errors?.reu_cost?.message} {...register("reu_cost")} />
                            </Box>

                            <Box my='5'>
                                <Input mask={"number"} label='Tempo de duração do procecesso (em meses) - Se não quiser incluir CÁLCULO DE JUROS coloque 0 (ZERO) no Tempo de Duração do Processo' name='proccess_time' error={errors?.proccess_time?.message}  {...register("proccess_time")} />
                            </Box>


                            <Box w={'100%'} mt={5}>
                                <Select label='Deseja usar o módulo de cálculo ?' options={[
                                    {
                                        label: "Sim",
                                        value: "Sim"
                                    },
                                    {
                                        label: "Não",
                                        value: "Não"
                                    }
                                ]}
                                    {...register('have_calc')}
                                    error={errors?.have_calc?.message}
                                    name='have_calc'
                                />
                            </Box>

                            {have_calc_value === "Sim" && <>
                                <Box my='5'>
                                    <Input mask="currency" label='Valor do salário ou a média dos salários' name='salary' error={errors?.salary?.message} {...register("salary")} />
                                </Box>


                                <Box my='5'>
                                    <Input type='date' name='start_date' label='Data de início do contrato de trabalho' error={errors?.start_date?.message}  {...register("start_date")} />
                                </Box>

                                <Box my='5'>
                                    <Input type='date' name='end_date' label='Data de término do contrato de trabalho' error={errors?.end_date?.message}  {...register("end_date")} />
                                </Box>
                            </>}



                        


                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="#fff" colorScheme='blue' mr={3} type='submit'>
                            <Text color="#fff">
                                Salvar
                            </Text>

                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <GridItem area={'header'}>
                <HeaderBar />
            </GridItem>
            <GridItem area={'nav'}>
                <DashboardHomeMenu onOpen={onOpen} />
            </GridItem>
            <GridItem overflow={'auto'} area={'main'}>
                <Flex overflow='overlay' height='100%' align={'center'} flexDirection={"column"}>
                    {children}
                </Flex>
            </GridItem>
        </Grid>
    );
}

export default Index;