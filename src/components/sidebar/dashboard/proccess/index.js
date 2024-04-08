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
                p={0}
            >
                <Flex flexDirection="column">

                    <ReturnLink text="Dashboard" href={'/dashboard/'} />
                    <Flex flexDirection="column" p={5}>

                        <Box mt={15}>
                            <NavLink
                                alignItems="center"
                                notLink={true}

                                icon={MdEditDocument}
                                href="/dashboard/processo/dashboard"
                                shouldMatchExactHref
                            >
                                <span onClick={onOpen}>
                                    Propostas
                                </span>

                            </NavLink>
                        </Box>


                        <Box mt={15}>
                            <NavLink
                                alignItems="center"
                                href="/dashboard/proccess/checkList/"
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
