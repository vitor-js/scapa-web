import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, Text, Grid, IconButton, ButtonGroup } from "@chakra-ui/react"
import { MdAddCircle, } from "react-icons/md";
import { useColors } from '../../../../../hooks'
import { toCurrencyScreen } from '../../../../../helpers'
import { IoTrashBinOutline } from "react-icons/io5";

import { FaEdit } from "react-icons/fa";


function Index({ requests = [], setOpenSelect, setDraftRequest, removeRequest, calcAndSave }) {
    const colors = useColors()



    return (
        <Flex w={'100%'} flexDirection={'column'}>
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
                                        setDraftRequest({ ...value })
                                        setOpenSelect(true)
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
                                    Valor individualizado
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
                                    {value.risk}
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
                </Flex>
            ))}

            <Flex
                _hover={{
                    background: colors.hoverbackground,
                    borderColor: colors.border.hoverColor,
                }}
                mt={5}
                onClick={() => {
                    setOpenSelect(true)
                }}
                cursor={'pointer'}
                bg={colors.cardBackground} padding={4} borderRadius={5} w={'100%'} flexDirection={'row'}>
                <MdAddCircle color={colors.text} size={40} />
                <Text fontSize={18} mt={2} fontWeight={400} ml={3} mr={3} >
                    Clique para adicionar um novo pedido
                </Text>
            </Flex>


            <Flex mt={6} justifyContent={"end"} onClick={() => { calcAndSave() }}>
                <Button color="#fff">
                    Avançar
                </Button>
            </Flex>
        </Flex>

    );
}

export default Index;