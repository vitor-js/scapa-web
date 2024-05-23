import { Box, Flex } from '@chakra-ui/react'
import { ReturnLink } from '../../../navComponents/returnLink'
import { useColors } from '../../../../../hooks'
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

const Index = () => {
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
                    <ReturnLink text="Home" href={'/backoffice/users/'} />

                </Flex>
            </Box>



        </>
    )
}

export default Index
