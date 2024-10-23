import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import Select from '../../../../../form/select'
import Input from '../../../../../form/input'
import { currencyToBackend, toCurrencyScreen } from '../../../../../../helpers'
import { MdAddCircle } from "react-icons/md";
import { useColors } from '../../../../../../hooks'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaTrash } from "react-icons/fa";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
    , useDisclosure
} from '@chakra-ui/react'
import * as yup from 'yup'
import { toast } from 'react-hot-toast';
const GRAU_VALUES = [
    {
        label: "Grau mínimo",
        value: "Grau mínimo"
    },
    {
        label: "Grau médio",
        value: "Grau médio"
    },

    {
        label: "Grau máximo",
        value: "Grau máximo"
    },

];



function Index({ errors, register, data, draftRequest, setValue, insalubridadeSalary, setInsalubridadeSalary }) {
    const colors = useColors()
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        console.log(draftRequest)
        if (!draftRequest || !data) return
        if (["Adicional de Insalubridade",].includes(draftRequest.requestValue)) {
            setValue("insalubridade_grau", toCurrencyScreen(draftRequest.insalubridade_grau))
            setInsalubridadeSalary([...draftRequest.insalubridade_salario?.data])

        }
    }, [draftRequest, data])

    const schema = yup.object().shape({
        time: yup.string().required('Campo obrigatório'),
        value: yup.string().required('Campo obrigatório'),

    })


    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        formState: { errors: errosModal },
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    const handleSubmitForm = async (values) => {
        const { time, value } = values
        setInsalubridadeSalary((oldValue) => {
            const newOb = {
                time: parseInt(time),
                value: currencyToBackend(value)
            }
            const draft = oldValue
            draft.push(newOb)
            return [...draft]

        })
        onClose()
    }

    return (
        <>
            <Modal position='absolute' size='xl' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as='form' borderRadius={5} bg={colors.background} >
                    <ModalHeader>  </ModalHeader>
                    <ModalCloseButton />
                    <Box pl={5} pr={5}>
                        <Input
                            name='time'
                            color={colors.text}
                            mask={"number"}
                            error={errosModal?.time?.message}
                            {...registerModal("time")}
                            label='Tempo em meses' />
                    </Box>

                    <Box mt={4} />
                    <Box pl={5} pr={5}>
                        <Input mask="currency" label='Valor do salário mínimo' name='value'
                            error={errosModal?.value?.message} {...registerModal("value")} />
                    </Box>
                    <ModalFooter>
                        <Button onClick={handleSubmitModal(handleSubmitForm)} color="#fff" colorScheme='blue' type='submit'>
                            <Text color={"#fff"}>
                                Salvar
                            </Text>

                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>


            <Box w={'100%'} mt={5}>
                <Select label='Seleciona o grau de insalubridade' options={GRAU_VALUES}
                    {...register('insalubridade_grau')}
                    error={errors?.insalubridade_grau?.message}
                    name='insalubridade_grau'
                />
            </Box>

            {insalubridadeSalary.length === 0 &&
                <Flex
                    _hover={{
                        background: colors.hoverbackground,
                        borderColor: colors.border.hoverColor,
                    }}
                    onClick={() => {
                        onOpen()
                    }}
                    cursor={'pointer'}
                    bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'row'} alignItems={'center'}>
                    <MdAddCircle color={colors.text} size={20} />
                    <Text fontSize={22} fontWeight={800} ml={3} mr={3} >

                        Clique para informar o salário mínimo e os períodos correspondentes
                    </Text>
                </Flex>
            }

            {insalubridadeSalary.length !== 0 &&
                <>
                    <Flex
                        _hover={{
                            background: colors.hoverbackground,
                            borderColor: colors.border.hoverColor,
                        }}
                        onClick={() => {
                            onOpen()
                        }}
                        cursor={'pointer'}
                        bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'row'} alignItems={'center'}>
                        <MdAddCircle color={colors.text} size={20} />
                        <Text fontSize={14} fontWeight={400} ml={3} mr={3} >

                            Clique para adicionar um novo
                        </Text>
                    </Flex>
                    {insalubridadeSalary.map((e, index) => (<>
                        <Box
                            _hover={{
                                background: colors.hoverbackground,
                                borderColor: colors.border.hoverColor,
                            }}

                            cursor={'pointer'}
                            bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'row'} alignItems={'center'}>
                            <Flex onClick={() => {
                                setInsalubridadeSalary((old) => {
                                    let draft = old
                                    draft.splice(index, 1)
                                    return [...draft]
                                })
                                reset()
                                onClose()
                            }}
                                justifyContent={'end'} cursor={'pointer'} textAlign={"end"} w={'100%'} >
                                <FaTrash size={20} bg={colors.text} />
                            </Flex>

                            <Flex>
                                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                                    <Box>
                                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                            Périodo (em meses)
                                        </Text>
                                    </Box>

                                    <Box >
                                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                            {e.time}
                                        </Text>
                                    </Box>


                                </Flex>

                                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                                    <Box>
                                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                            Valor
                                        </Text>
                                    </Box>

                                    <Box >
                                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                            R$  {toCurrencyScreen(e.value)}
                                        </Text>
                                    </Box>


                                </Flex>
                            </Flex>


                        </Box>
                    </>))}



                </>
            }


        </>
    );
}

export default Index;