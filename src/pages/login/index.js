import React, { useState } from 'react';

import { Flex, Button, Box, Text } from '@chakra-ui/react';
import { Input } from '../../components'

import { useAuth } from '../../hooks'
import { api } from '../../service'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


function Index() {
    const { login } = useAuth()
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
                "email": "vitorgabriel1998@hotmail.com",
                "password": "vitorgabriel1998@hotmail.com"
            })
            login({ token: data.data.token, refresh: data.data.refreshToken })
            console.log(data)
            setLoading(false)
        } catch {
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
                <Text fontSize={"1xl"} fontWeight={400} color={"black.50"} >
                    simply dummy text of the printing<br />and typesetting industry.
                </Text>
                <Flex width={'100%'} marginY={4} >
                    <Input
                        {...register('email')}
                        error={errors.email} label='Email' />
                </Flex>

                <Flex width={'100%'} marginY={4} >
                    <Input     {...register('password')} error={errors.password} label='Password' type='password' />
                </Flex>
                <Flex width={'100%'}>
                    <Button type="submit" width={'100%'} >Entrar</Button>
                </Flex>

            </Box>

        </Flex>
    </>);
}

export default Index;   