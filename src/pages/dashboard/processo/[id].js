import { LayoutDashboardProccess } from '../../../layouts'
import { HeaderPages, WrapperBody, Input, } from '../../../components'
import { MdEditDocument } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useProcces, useAuth, useColors } from '../../../hooks'
import { useEffect } from 'react'
import { Text, Box, Flex, Grid, Button } from '@chakra-ui/react';
import * as yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast';
import { api } from '@/service'
import { queryClient } from '../../../service/queryClient';
import { toCurrencyScreen } from '../../../helpers'

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
    const { data: requestData, isLoading, isFetching, isError, refetch, } = request;


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

    const handleSubmitForm = async (values) => {
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
        setValueForm('title', requestData.data.title)
        setValueForm('number_process', requestData.data.number_process)
        setValueForm('autor', requestData.data.autor)
        setValueForm('reu', requestData.data.reu)
        setValueForm('description', requestData.data.description)
        setValueForm("proccess_time", requestData.data.proccess_time)
        setValueForm("reu_cost", toCurrencyScreen(requestData.data.reu_cost))
    }, [requestData])





    return (
        <LayoutDashboardProccess>

            <HeaderPages title={`Processo  Nº${requestData ? requestData.data.number_process : ""}`} icon={MdEditDocument} />

            {requestData && (
                <>
                    <WrapperBody>
                        <Flex as='form' onSubmit={handleSubmit(handleSubmitForm)} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                            <Text fontWeight="bold" fontSize="2xl" color={colors.text}>Informações Básicas do Processo</Text>
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
                                <Input label='Réu' name='reu' error={errors?.reu?.message} {...register("reu")} />

                                <Input label='Tempo do processo'
                                    name='proccess_time' error={errors?.autor?.proccess_time}  {...register("proccess_time")}
                                />
                                <Input label='Réu' name='reu' error={errors?.reu?.message} {...register("reu")} />
                            </Grid>
                            <Box mt={4}>
                                <Input label='Custo do Réu' name='reu_cost' error={errors?.description?.reu_cost}  {...register("reu_cost")} />
                            </Box>

                            <Flex mt={4} alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                                <Button type='submit'>
                                    Atualizar
                                </Button>
                            </Flex>

                        </Flex>
                    </WrapperBody>
                </>
            )}
        </LayoutDashboardProccess>
    )
}

export default Index