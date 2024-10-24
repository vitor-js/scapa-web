import React, { useEffect } from 'react';
import { Box, Flex, Button, Text, useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import Select from '../../../../../form/select'
import Input from '../../../../../form/input'
import { toCurrencyScreen } from '../../../../../../helpers'
import { MdAddCircle } from "react-icons/md";
import { useColors } from '../../../../../../hooks'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaTrash } from "react-icons/fa";


const ACTIONS = [
    {
        label: "Limite semanal de 44h",
        value: "Limite semanal de 44h"
    },
    {
        label: "Limite semanal de 40h",
        value: "Limite semanal de 40h"
    },
    {
        label: "Limite semanal de 36h",
        value: "Limite semanal de 36h"
    },


]

const ACTIONS_DAYS = [
    {
        label: "1",
        value: "1"
    },
    {
        label: "2",
        value: "2"
    },
    {
        label: "3",
        value: "3"
    },
    {
        label: "4",
        value: "4"
    },
    {
        label: "5",
        value: "5"
    },
    {
        label: "6",
        value: "6"
    },
    {
        label: "7",
        value: "7"
    },
]



function Index({ errors, register, data, draftRequest, setValue, watch, extraHour, setExtraHour }) {

    const colors = useColors()
    const { isOpen, onOpen, onClose } = useDisclosure()



    const extra_hour_variation_value = watch('extra_hour_variation')

    const schema = yup.object().shape({

    })

    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        formState: { errors: errosModal },
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        console.log(draftRequest, '----------draft------------')
        if (!draftRequest || !data) return
        if (["Horas Extras",].includes(draftRequest.requestValue)) {
            setValue("extra_hour_variation", draftRequest.extra_hour_variation ? "Sim" : "Não")
            setValue("week_limit", draftRequest.week_limit)

            if (draftRequest.extra_hour_variation !== true) {
                const dates = draftRequest.extra_hour_object?.data[0]

                setValue("days_working_week", dates.days_working_week)
                setValue("hora_inicio_jornada", dates.hora_inicio_jornada)
                setValue("hora_fim_jornada", dates.hora_fim_jornada)
                setValue("hora_inicio_intervalo", dates.hora_inicio_intervalo)
                setValue("hora_fim_intervalo", dates.hora_fim_intervalo)
            } else {
                setExtraHour([...draftRequest.extra_hour_object?.data])
            }

        }

    }, [draftRequest, data])


    const handleSubmitForm = async (values) => {

        const { day_worked, hora_inicio_jornada, hora_fim_jornada, hora_inicio_intervalo, hora_fim_intervalo } = values
        setExtraHour((oldValue) => {
            const newOb = {
                day_worked, hora_inicio_jornada, hora_fim_jornada, hora_inicio_intervalo, hora_fim_intervalo
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
                    <ModalHeader>Cadastrar variação  </ModalHeader>
                    <ModalCloseButton />
                    <Box w={'100%'} mt={5} px={5}>
                        <Select label='Clique para selecionar o dia' options={[
                            {
                                label: "segunda-feira",
                                value: "segunda-feira"
                            },
                            {
                                label: "terça-feira",
                                value: "terça-feira"
                            },
                            {
                                label: "quarta-feira",
                                value: "quarta-feira"
                            },
                            {
                                label: "quinta-feira",
                                value: "quinta-feira"
                            },
                            {
                                label: "sexta-feira",
                                value: "sexta-feira"
                            },
                            {
                                label: "sábado",
                                value: "sábado"
                            },
                            {
                                label: "domingo",
                                value: "domingo"
                            }
                        ]}
                            {...registerModal('day_worked')}
                            error={errosModal?.day_worked?.message}
                            name='day_worked'
                        />

                        <Box w={'100%'} mt={5}>
                            <Input
                                type={"time"}
                                {...registerModal('hora_inicio_jornada')}
                                error={errosModal?.hora_inicio_jornada?.message}
                                name='hora_inicio_jornada'
                                label='Horário de início da jornada' />
                        </Box>

                        <Box w={'100%'} mt={5}>
                            <Input
                                type={"time"}
                                {...registerModal('hora_fim_jornada')}
                                error={errosModal?.hora_fim_jornada?.message}
                                name='hora_fim_jornada'
                                label='Horário de término da jornada' />
                        </Box>


                        <Box w={'100%'} mt={5}>
                            <Input
                                type={"time"}
                                {...registerModal('hora_inicio_intervalo')}
                                error={errosModal?.hora_inicio_intervalo?.message}
                                name='hora_inicio_intervalo'
                                label='Horário de início do intervalo' />
                        </Box>

                        <Box w={'100%'} mt={5}>
                            <Input
                                type={"time"}
                                {...registerModal('hora_fim_intervalo')}
                                error={errosModal?.hora_fim_intervalo?.message}
                                name='hora_fim_intervalo'
                                label='Horário de fim do intervalo' />
                        </Box>
                    </Box>

                    <Box mt={4} />

                    <ModalFooter>
                        <Button color="#fff" colorScheme='blue' onClick={handleSubmitModal(handleSubmitForm)}>
                            <Text color={"#fff"}>
                                Salvar
                            </Text>

                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
            <Box w={'100%'} mt={5}>
                <Select label='No horário de início e término da jornada havia variação ?' options={[
                    {
                        label: "Sim",
                        value: "Sim"
                    },
                    {
                        label: "Não",
                        value: "Não"
                    }
                ]}
                    {...register('extra_hour_variation')}
                    error={errors?.extra_hour_variation?.message}
                    name='extra_hour_variation'
                />
            </Box>

            <Box w={'100%'} mt={5}>
                <Select label='Seleciona o limite semanal' options={ACTIONS}
                    {...register('week_limit')}
                    error={errors?.week_limit?.message}
                    name='week_limit'
                />
            </Box>

            {extra_hour_variation_value !== "Sim" && <>
                <Box w={'100%'} mt={5}>
                    <Select label='Seleciona a quantidade de dias trabalhados na semana' options={ACTIONS_DAYS}
                        {...register('days_working_week')}
                        error={errors?.days_working_week?.message}
                        name='days_working_week'
                    />
                </Box>

                <Box w={'100%'} mt={5}>
                    <Input
                        type={"time"}
                        {...register('hora_inicio_jornada')}
                        error={errors?.hora_inicio_jornada?.message}
                        name='hora_inicio_jornada'
                        label='Horário de início da jornada' />
                </Box>

                <Box w={'100%'} mt={5}>
                    <Input
                        type={"time"}
                        {...register('hora_fim_jornada')}
                        error={errors?.hora_fim_jornada?.message}
                        name='hora_fim_jornada'
                        label='Horário de término da jornada' />
                </Box>


                <Box w={'100%'} mt={5}>
                    <Input
                        type={"time"}
                        {...register('hora_inicio_intervalo')}
                        error={errors?.hora_inicio_intervalo?.message}
                        name='hora_inicio_intervalo'
                        label='Horário de início do intervalo' />
                </Box>

                <Box w={'100%'} mt={5}>
                    <Input
                        type={"time"}
                        {...register('hora_fim_intervalo')}
                        error={errors?.hora_fim_intervalo?.message}
                        name='hora_fim_intervalo'
                        label='Horário de fim do intervalo' />
                </Box>

            </>}

            {extra_hour_variation_value === "Sim" && <>


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

                        Clique para adicionar uma variação
                    </Text>
                </Flex>

                {extraHour.map((e, index) => (<>


                    <Flex
                        _hover={{
                            background: colors.hoverbackground,
                            borderColor: colors.border.hoverColor,
                        }}

                        cursor={'pointer'}
                        bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'column'} alignItems={'center'}>

                        <Flex onClick={() => {
                            setExtraHour((old) => {
                                let draft = old
                                draft.splice(index, 1)
                                return [...draft]
                            })
                            onClose()
                        }}
                            justifyContent={'end'} cursor={'pointer'} textAlign={"end"} w={'100%'} >
                            <FaTrash size={20} bg={colors.text} />
                        </Flex>
                        <Text w={'100%'} fontSize={15} fontWeight={400} ml={3} mr={3} my={0} >
                            {e.day_worked}
                        </Text>
                        {console.log(e)}
                        <Flex mt={4} width={'100%'} flexDirection={'row'}>
                            <Flex mt={4} width={'100%'} flexDirection={'column'}>
                                <Box>
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        Início da jornada
                                    </Text>
                                </Box>

                                <Box >
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        {e.hora_inicio_jornada}
                                    </Text>
                                </Box>


                            </Flex>

                            <Flex mt={4} width={'100%'} flexDirection={'column'}>
                                <Box>
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        Fim da jornada
                                    </Text>
                                </Box>

                                <Box >
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        {e.hora_fim_jornada}
                                    </Text>
                                </Box>


                            </Flex>

                            <Flex mt={4} width={'100%'} flexDirection={'column'}>
                                <Box>
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        Início do intervalo
                                    </Text>
                                </Box>

                                <Box >
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        {e.hora_inicio_intervalo}
                                    </Text>
                                </Box>


                            </Flex>


                            <Flex mt={4} width={'100%'} flexDirection={'column'}>
                                <Box>
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        Fim do intervalo
                                    </Text>
                                </Box>

                                <Box >
                                    <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                        {e.hora_fim_intervalo}
                                    </Text>
                                </Box>


                            </Flex>
                        </Flex>
                    </Flex>
                </>))}


            </>}

        </>
    );
}

export default Index;