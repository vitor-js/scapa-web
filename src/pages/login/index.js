import React, { useState } from 'react';

import { Flex, Button, Box, Text } from '@chakra-ui/react';
import { Input } from '../../components'

import { useAuth } from '../../hooks'
import { api } from '../../service'
import { Spinner } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-hot-toast';
import { useColors } from '../../hooks'

function Index() {
    const { login } = useAuth()
    const colors = useColors()
    const [loading, setLoading] = useState(false)
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Email Inválido')
            .required('Este campo é origatório'),
        password: yup.string().required('Este campo é origatório'),
    })


    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const submit = async (values) => {
        try {
            setLoading(true)
            const { data } = await api.post('/login', {
                "email": values.email,
                "password": values.password
            })
            login({ token: data.data.token, refresh: data.data.refreshToken }, true)

            setLoading(false)
        } catch {
            toast.error("Algo deu errado, tente novamente!")
            setLoading(false)
        }

    }

    return (<>
        <Flex style={{ width: "100%", minHeight: "100vh" }} align={"center"} justify={"center"}>
            <Box onSubmit={handleSubmit(submit)}
                as="form" maxWidth={500} textAlign={"center"} width={500} padding={4} border={'solid 1px'} borderColor={"black.50"} borderRadius={5}>
                <Text fontSize={"3xl"} fontWeight={600} >
                    Seja bem vindo
                </Text>

                <Flex width={'100%'} marginY={4} >
                    <Input
                        {...register('email')}
                        error={errors?.email?.message} label='Email' />
                </Flex>

                <Flex width={'100%'} marginY={4} >
                    <Input     {...register('password')} error={errors?.password?.message} label='Password' type='password' />
                </Flex>
                <Flex width={'100%'}>
                    <Button color="#fff" type="submit" width={'100%'} >Entrar {loading && (
                        <>
                            <Spinner color={colors.text} />
                        </>
                    )}</Button>
                </Flex>

            </Box>

        </Flex>
    </>);
}

export default Index;   