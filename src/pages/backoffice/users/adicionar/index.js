import React, { useEffect } from 'react';
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
    password: yup.string().required('Campo obrigatório'),
    newPass: yup.string().required('Campo obrigatório'),
});



function Index() {
    const colors = useColors()
    const { authData } = useAuth()



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
        const data = {
            data: {
                buyer: {
                    email: values.email.trim(),
                    name: values.name.trim()
                }
            },
            event: "PURCHASE_APPROVED"

        }
        try {
            await api.post(`hotmart/product`, data)
            toast.success("Cadastro criado com sucesso")
        } catch (e) {
            console.log(e)
            toast.error("Algo deu errado, tente novamente!")
        }

    }

    const submitPass = async (values) => {
        try {
            await api.put(`user/update-password/${authData.id}`, {
                password: values.password,
                newPassword: values.newPass
            })
            toast.success("Senha atualizada com sucesso")
        } catch {
            toast.error("Algo deu errado, tente novamente!")
        }

    }







    return <LayoutBckofficeUsers>
        <HeaderPages title={`Adicionar novo usuário `} icon={Md3P} />
        <WrapperBody>
            <Flex onSubmit={handleSubmit(submitBasic)}
                as="form" mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                <Text fontSize='2xl' fontWeight={600}>
                    Informação básica
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
                        Criar
                    </Button>
                </Flex>
            </Flex>

            {/* <Flex as='form' onSubmit={handleSubmitP(submitPass)} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} flexDirection={'column'}>
                <Text fontSize='2xl' fontWeight={600}>
                    Senha
                </Text>
                <Flex mt={4}>
                    <Input
                        name='password'
                        color={colors.text}
                        error={errosP?.password?.message}
                        {...registerP("password")}
                        default
                        type={'password'}
                        label='Senha antiga'
                    />
                </Flex>
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
                    <Button type='submit'>
                        Atualizar
                    </Button>
                </Flex>

            </Flex> */}


        </WrapperBody>
    </LayoutBckofficeUsers>;
}

export default Index;