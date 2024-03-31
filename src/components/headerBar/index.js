import React from 'react'
import { useAuth } from './../../hooks'


import Image from 'next/image'
import {
    useColorMode,
    useColorModeValue,

    IconButton,
    ButtonGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    Box,
    Flex,
    Spacer,
    Text,
    Icon
} from '@chakra-ui/react'

import { MdExitToApp, MdKeyboardArrowDown } from 'react-icons/md'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useColors } from '../../hooks'

export default function Index() {
    const { logout, authData } = useAuth()
    const { toggleColorMode, colorMode } = useColorMode()
    const colors = useColors()

    const SwitchIcon = useColorModeValue(FaMoon, FaSun)

    return (
        <>
            <Flex
                bg={colors.background}
                borderColor={colors.border.color}
                borderBottomWidth={1}
                w="100%"
                px={10}
                py={3}
                alignItems="center"
                justifyContent="center"
                color="white"
            >
                <Flex alignItems="center" justifyContent="center">
                    {console.log(colorMode)}
                    {colorMode === 'light' && (
                        <Image
                            src={require('../../../assets/logo/logo.png')}
                            alt=""
                            width={130}
                        />
                    )}

                    {colorMode === 'dark' && (
                        <Image
                            src={require('../../../assets/logo/logowhite.png')}
                            alt=""
                            width={130}
                        />
                    )}




                    <Popover>
                        <PopoverTrigger>
                            <Flex
                                _hover={{
                                    background: colors.hoverbackground,
                                    borderColor: colors.border.hoverColor,
                                }}
                                backgroundColor={colors.background}
                                cursor="pointer"
                                transition="ease all 0.1s"
                                marginLeft={5}
                                borderWidth={1}
                                padding="8px 8px"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={5}
                            >

                                <Box marginLeft={3}>
                                    <Text fontWeight="semi" fontSize="sm" color={colors.text}
                                    >
                                        {authData.nome || authData.nome}
                                    </Text>
                                </Box>
                                <Box marginLeft={2}

                                >
                                    <Icon as={MdKeyboardArrowDown} color={colors.text} />

                                </Box>
                            </Flex>
                        </PopoverTrigger>
                        <PopoverContent
                            zIndex={1000}

                            bg={colors.background}
                            borderColor={colors.border.color}
                            borderBottomWidth={1}

                        >
                            <Icon as={PopoverCloseButton} color={colors.text} fontSize={9} />

                            <PopoverHeader color={colors.text}>
                                <Text fontWeight="bold" fontSize="sm"
                                    color={colors.text}
                                >
                                    Dados do Usuário
                                </Text>
                            </PopoverHeader>
                            <PopoverBody>
                                <Box>
                                    <Text color={colors.text} fontWeight="bold" fontSize="sm"

                                    >
                                        Email:
                                    </Text>
                                    <Text color={colors.text} fontSize="sm" >

                                        {authData.email || authData.email}
                                    </Text>
                                </Box>

                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>

                <Spacer />
                <ButtonGroup gap="2">
                    <IconButton
                        size="md"
                        fontSize="lg"
                        variant="ghost"
                        backgroundColor={colors.background}
                        borderColor={colors.border.hoverColor}
                        borderWidth={1}
                        cursor="pointer"
                        transition="ease all 0.1s"
                        onClick={toggleColorMode}
                        icon={<SwitchIcon />}

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
                        onClick={logout}
                        icon={<MdExitToApp />}
                        aria-label={`Exit aplication`}
                    />
                </ButtonGroup>
            </Flex>
        </>
    )
}
