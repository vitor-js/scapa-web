import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text, Grid, IconButton, ButtonGroup , GridItem  } from "@chakra-ui/react"
import { MdAddCircle, } from "react-icons/md";
import { useColors } from '../../../../../hooks'
import { toCurrencyScreen } from '../../../../../helpers'
import { IoTrashBinOutline } from "react-icons/io5";

import { FaEdit } from "react-icons/fa";
const RISK_TABLE_REVERSE = {
    0: "Inexistente",
    10: "Muito Baixo",
    25: "Baixo",
    50: "Médio",
    75: "Alto",
    90: "Muito Alto",
    100: "Total",
};

function Index({ requests = [], setOpenSelect, setDraftRequest, removeRequest, calcAndSave, custonEdit = false, custonEditFunction, createRequest }) {
    const colors = useColors()

    useEffect(() => {
        console.log(requests, '--------------------=====')
    }, [requests])

    return (
        <Flex w={'100%'} flexDirection={'column'}>

<Flex
                _hover={{
                    background: colors.hoverbackground,
                    borderColor: colors.border.hoverColor,
                }}
                mt={5}

                onClick={() => {
                    if (custonEdit) {
                        setOpenSelect(true)
                        return createRequest()
                    } else {
                        setOpenSelect(true)
                    }

                }}


                cursor={'pointer'}
                bg={colors.cardBackground} padding={4} borderRadius={5} w={'100%'} flexDirection={'row'}>
                <MdAddCircle color={colors.text} size={40} />
                <Text fontSize={18} mt={2} fontWeight={400} ml={3} mr={3} >
                    Clique para adicionar um novo pedido
                </Text>
            </Flex>



            {requests.length !== 0 && requests.map((value, index) => (
                <Flex
                    key={value.risco}
                    bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'column'}>

                    <Flex my={6} width={'100%'} flexDirection={'row'} alignItems={"center"} justifyContent={'space-between'}>
                        <Text fontSize={18} fontWeight={600} ml={3} mr={3} >
                            {value.requestValue}
                        </Text>
                        <Box cursor={"pointer"} >
                            <ButtonGroup gap="2">
                                <IconButton
                                    size="md"
                                    fontSize="lg"
                                    variant="ghost"
                                    backgroundColor={colors.background}
                                    borderColor={colors.border.hoverColor}
                                    borderWidth={1}
                                    onClick={() => {
                                        if (custonEdit) {
                                            return custonEditFunction(value)
                                        } else {
                                            setDraftRequest({ ...value })
                                            setOpenSelect(true)
                                        }

                                    }}
                                    cursor="pointer"
                                    transition="ease all 0.1s"
                                    icon={<FaEdit />}

                                />
                                <IconButton
                                    size="md"
                                    fontSize="lg"
                                    variant="ghost"
                                    backgroundColor={colors.background}
                                    borderColor={colors.border.hoverColor}
                                    borderWidth={1}
                                    cursor="pointer"
                                    transition="ease all 0.1s"
                                    onClick={() => removeRequest(index)}
                                    icon={<IoTrashBinOutline />}
                                    aria-label={`Exit aplication`}
                                />
                            </ButtonGroup>


                        </Box>

                    </Flex>

                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor individual postulado
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {console.log("value.valuePostulate", value)}
                                {toCurrencyScreen(value.valuePostulate)}
                            </Text>
                        </Box>


                    </Flex>

                    <Grid
                        alignItems={"center"}
                        gap={10}
                        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                    >

                        <Flex my={6} width={'100%'} flexDirection={'column'}>
                            <Box>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                    Valor individualizado com gestão de risco
                                </Text>
                            </Box>

                            <Box mt={1}>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                    {toCurrencyScreen(value.valueIndividual)}
                                </Text>
                            </Box>


                        </Flex>


                        <Flex width={'100%'} flexDirection={'column'}>
                            <Box>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                    Risco
                                </Text>
                            </Box>

                            <Box mt={1}>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >

                                    {RISK_TABLE_REVERSE[value.riskSuccess]}
                                </Text>
                            </Box>


                        </Flex>
                        <Flex my={6} width={'100%'} flexDirection={'column'}>
                            <Box>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                    Risco de Exito
                                </Text>
                            </Box>

                            <Box mt={1}>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                    {value.riskSuccess}%
                                </Text>
                            </Box>


                        </Flex>


                    </Grid>

                    <Grid mt={5} templateColumns='repeat(5, 1fr)' gap={6}>
                        {value.reflex && value.reflex.length !== 0 && value.reflex.map((e) => (
                        <GridItem w='100%'  bg='#2d3031' borderRadius={5} >
                             <Flex my={6} width={'100%'} flexDirection={'column'}>
                            <Box>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                   {e.label}
                                </Text>
                            </Box>

                            <Box mt={1}>
                                <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                              R$ {toCurrencyScreen( e.value)}
                                </Text>
                            </Box>


                        </Flex>
                        </GridItem>
                        ))}
 


</Grid>
                </Flex>
            ))}

          
            {!custonEdit && <Flex mt={6} justifyContent={"end"} onClick={() => { calcAndSave() }}>
                <Button color="#fff">
                    Avançar
                </Button>
            </Flex>}

            <Flex marginBottom={450} />

        </Flex>

    );
}

export default Index;