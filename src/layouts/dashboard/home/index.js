import React from 'react';

import { Grid, GridItem, Flex } from '@chakra-ui/react'
import { HeaderBar, DashboardHomeMenu, Input } from '../../../components'
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
        // salary: yup.string().required('Campo obrigatório'),
        // start_date: yup.date().required('Campo obrigatório'),
        // end_date: yup.date().required('Campo obrigatório'),
    })



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    const handleSubmitForm = async (values) => {
        try {
            // console.log(values)
            // // const proccess_time_work = monthDiff(values.start_date, values.end_date)
            // console.log(proccess_time_work)
            const { data } = await api.post("proccess", {
                ...values, reu_cost: currencyToBackend(values.reu_cost), user_id: authData.id,
                // start_date: values.start_date.toString(),
                // end_date: values.end_date.toString(),
                time_worked_months: 0,
                description: "",
                salary: 0

            })

            reset()
            queryClient.invalidateQueries('proccess');
            onClose()

            router.push(`/dashboard/processo/${data.data?.id}`)





            toast.success("Cadastro realizado com sucesso")
        } catch (e) {
            console.log(e)
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
                                <Input mask={"number"} label='Se não quiser incluir CÁLCULO DE JUROS coloque 0 (ZERO) no Tempo de Duração do Processo' name='proccess_time' error={errors?.proccess_time?.message}  {...register("proccess_time")} />
                            </Box>

                            {/* <Box my='5'>
                                <Input mask="currency" label='Valor so salário ou a média dos salários' name='salary' error={errors?.salary?.message} {...register("salary")} />
                            </Box>


                            <Box my='5'>
                                <Input type='date' name='start_date' label='Data de início do contrato de trabalho' error={errors?.start_date?.message}  {...register("start_date")} />
                            </Box>

                            <Box my='5'>
                                <Input type='date' name='end_date' label='Data de início do contrato de trabalho' error={errors?.end_date?.message}  {...register("end_date")} />
                            </Box> */}


                            <Box my='5'>
                                <Input label='Réu' name='reu' error={errors?.reu?.message} {...register("reu")} />
                            </Box>
                            <Box my='5'>
                                <Input mask="currency" label='Custo do Réu' name='reu_cost' error={errors?.reu_cost?.message} {...register("reu_cost")} />
                            </Box>


                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="#fff" colorScheme='blue' mr={3} type='submit'>
                            <Text color={colors.text}>
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