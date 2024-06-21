import { Box, Flex } from '@chakra-ui/react'
import { NavLink } from '../../navComponents/navLink'
import { useColors } from '../../../../hooks'
import {
    MdHome,
    MdBuildCircle,
    MdOutlineRemoveCircle,
    MdAddBox,
    MdAccountBalance,
    MdPeople,
    MdDomain,
    MdContactMail,
    MdBalance,
} from 'react-icons/md'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Lorem,
    Button,
    useDisclosure
} from '@chakra-ui/react'

const Index = ({ onOpen }) => {
    const colors = useColors()


    return (
        <>
            <Box
                bg={colors.background}
                borderColor={colors.border.color}
                borderBottomWidth={1}
                borderRightWidth={1}
                w="100%"
                h="100%"
                p={5}
            >
                <Flex flexDirection="column">
                    <NavLink
                        alignItems="center"
                        href="/dashboard"
                        icon={MdHome}
                        shouldMatchExactHref
                    >
                        Processos
                    </NavLink>

                    <Box mt={15}>
                        <NavLink
                            alignItems="center"
                            notLink={true}

                            icon={MdAddBox}
                            href=""
                            shouldMatchExactHref
                        >
                            <span onClick={onOpen}>
                                Novo Processo
                            </span>

                        </NavLink>
                    </Box>


                    <Box mt={15}>
                        <NavLink
                            alignItems="center"
                            href="/dashboard/perfil"
                            icon={MdBuildCircle}
                            shouldMatchExactHref
                        >

                            Meu Perfil
                        </NavLink>
                    </Box>

                </Flex>
            </Box>



        </>
    )
}

export default Index
