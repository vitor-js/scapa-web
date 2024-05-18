import { Box, Flex } from '@chakra-ui/react'
import { NavLink } from '../../navComponents/navLink'
import { ReturnLink } from '../../navComponents/returnLink'
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
    MdCheckCircle,
    MdEditDocument
} from 'react-icons/md'
import { MdFilePresent } from "react-icons/md";
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
import { useRouter } from 'next/router'

const Index = ({ onOpen }) => {
    const colors = useColors()

    const { query } = useRouter()
    const { id } = query
    return (
        <>
            <Box
                bg={colors.background}
                borderColor={colors.border.color}
                borderBottomWidth={1}
                borderRightWidth={1}
                w="100%"
                h="100%"
                p={0}
            >
                <Flex flexDirection="column">

                    <ReturnLink text="Dashboard" href={'/dashboard/'} />
                    <Flex flexDirection="column" p={5}>

                        <Box mt={15}>
                            <NavLink
                                alignItems="center"


                                icon={MdEditDocument}
                                href={`/dashboard/processo/${id}`}
                                shouldMatchExactHref
                            >
                                <span onClick={onOpen}>
                                    Informações Básicas
                                </span>

                            </NavLink>
                        </Box>

                        <Box mt={15}>
                            <NavLink
                                alignItems="center"
                                href={`/dashboard/processo/propostas/${id}`}

                                icon={MdFilePresent}
                                shouldMatchExactHref
                            >

                                Propostas
                            </NavLink>
                        </Box>


                        <Box mt={15}>
                            <NavLink
                                alignItems="center"
                                href={`/dashboard/processo/checkList/${id}`}

                                icon={MdCheckCircle}
                                shouldMatchExactHref
                            >

                                Check List
                            </NavLink>
                        </Box>
                    </Flex>
                </Flex>
            </Box>



        </>
    )
}

export default Index
