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
import { api } from '../../../service';
import { useRouter } from 'next/router'
import { queryClient } from '../../../service/queryClient';


function Index({ children }) {
    const { authData } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const colors = useColors()
    const router = useRouter()
    const schema = yup.object().shape({
        title: yup.string().required('Campo obrigatório'),
        number_process: yup.string().required('Campo obrigatório'),
        autor: yup.string().required('Campo obrigatório'),
        reu: yup.string().required('Campo obrigatório'),
        description: yup.string().required('Campo obrigatório'),
    })



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    const handleSubmitForm = async (values) => {
        try {
            await api.post("proccess", { ...values, user_id: authData.id })
            reset()
            queryClient.invalidateQueries('proccess');
            onClose()
        } catch {

        }
    }

    return (
        <Grid
            templateAreas={`"header header" "nav main"`}
            gridTemplateRows={'auto 1fr'}
            gridTemplateColumns={'260px 1fr'}
            h="100vh"

            gap="0"
        >
            <Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>

                <ModalContent as='form' onSubmit={handleSubmit(handleSubmitForm)} borderRadius={5} bg={colors.background}>
                    <ModalHeader>Cadastrar novo processo    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box >
                            <Box my='5'>
                                <Input name='title' color={colors.text} error={errors?.title?.message} {...register("title")} label='Título' />
                            </Box>

                            <Box my='5'>
                                <Input name='number_process' error={errors?.number_process?.message} {...register("number_process")} label='Número do Processo' />
                            </Box>
                            <Box my='5'>
                                <Input label='Autor' name='autor' error={errors?.autor?.message}  {...register("autor")} />
                            </Box>
                            <Box my='5'>
                                <Input label='Réu' name='reu' error={errors?.reu?.message} {...register("reu")} />
                            </Box>

                            <Box my='5'>
                                <Input label='Descricao' name='description' error={errors?.description?.message}  {...register("description")} />
                            </Box>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit'>
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
            <GridItem area={'main'}>
                <Flex align={'center'} flexDirection={"column"}>
                    {children}
                </Flex>
            </GridItem>
        </Grid>
    );
}

export default Index;