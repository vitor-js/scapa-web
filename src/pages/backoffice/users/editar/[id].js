import React, { useEffect, useState } from 'react';
import { LayoutBckofficeUsers } from '../../../../layouts'
import { useColors, useAuth } from '../../../../hooks'
import { WrapperBody, HeaderPages, Input, } from '../../../../components'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Text, Flex, Button } from '@chakra-ui/react';
import { Md3P } from "react-icons/md";

import { useForm } from 'react-hook-form';

import { api } from '@/service';
import { toast } from 'react-hot-toast';

const schemForm = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório'),
})

const formPassWordValidation = yup.object().shape({
    newPass: yup.string().required('Campo obrigatório'),
});



function Index() {
    const colors = useColors()
    const { authData, reload } = useAuth()
    const [status, setStatus] = useState()


    const {
        register,
        handleSubmit,
        setValue: setValueForm,
        formState: { errors, isSubmitting, dirtyFields },
    } = useForm({
        resolver: yupResolver(schemForm),
    });


    const {
        register: registerP,
        handleSubmit: handleSubmitP,
        setValue: setValueFormP,
        formState: { errors: errosP, isSubmitting: isSubmittingP },
    } = useForm({
        resolver: yupResolver(formPassWordValidation),
    });



    const submitBasic = async (values) => {
        try {
            await api.put(`user/${authData.id}`, {
                email: values.email,
                nome: values.name
            })
            toast.success("Cadastro atualizado com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const submitPass = async (values) => {
        try {
            await api.put(`user/update-password-admin/${authData.id}`, {

                password: values.newPass
            })
            toast.success("Senha atualizada com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const handleChangeStatus = async (e) => {
        e.preventDefault()

        try {
            await api.put(`user/${authData.id}`, {
                is_active: !authData.is_active,

            })

            await reload()
            toast.success("Cadastro atualizado com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }
    }



    useEffect(() => {
        if (!authData) return
        setValueForm('name', authData.nome)
        setValueForm('email', authData.email)
        setStatus(authData.is_active ? "Ativado" : "Desativado")
    }, [authData])



    return <LayoutBckofficeUsers>
        <HeaderPages title={`Perfil`} icon={Md3P} />
        <WrapperBody>

            <Flex as='form' onSubmit={(e) => handleChangeStatus(e)} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                <Text fontSize='2xl' fontWeight={600}>
                    Status
                </Text>

                <Flex
                    flexDirection={'column'}
                    bg={colors.cardBackground} borderRadius={5}>

                    <Text fontSize={20} fontWeight={400}>
                        Este usuário esta {status}
                    </Text>
                </Flex>
                <Flex alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                    <Button color="#fff" type='submit'>
                        {status === "Ativado" ? "Desativar" : "Ativar"}
                    </Button>
                </Flex>

            </Flex>

            <Flex onSubmit={handleSubmit(submitBasic)}
                as="form" mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                <Text fontSize='2xl' fontWeight={600}>
                    Informação pessoal
                </Text>
                <Flex mt={4}>
                    <Input
                        name='name'
                        color={colors.text}
                        error={errors?.name?.message}
                        {...register("name")}


                        label='Nome Completo'
                    />
                </Flex>
                <Flex mt={4}>
                    <Input
                        name='email'
                        color={colors.text}
                        error={errors?.email?.message}
                        {...register("email")}


                        label='Email'
                    />
                </Flex>
                <Flex mt={4} alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                    <Button color="#fff" type='submit'>
                        Atualizar
                    </Button>
                </Flex>
            </Flex>



            <Flex as='form' onSubmit={handleSubmitP(submitPass)} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                <Text fontSize='2xl' fontWeight={600}>
                    Senha
                </Text>

                <Flex mt={4}>
                    <Input
                        type={'password'}
                        name='newpassword'
                        color={colors.text}
                        error={errosP?.newPass?.message}
                        {...registerP("newPass")}
                        default
                        label='Nova senha'
                    />
                </Flex>
                <Flex mt={4} alignContent={'flex-end'} justifyContent={'flex-end'} justifyItems={'flex-end'} >
                    <Button color="#fff" type='submit'>
                        Atualizar
                    </Button>
                </Flex>

            </Flex>


        </WrapperBody>
    </LayoutBckofficeUsers>;
}

export default Index;