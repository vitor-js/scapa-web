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

const Index = () => {
    const colors = useColors()

    return (
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
                    Dashboard
                </NavLink>

                <Box mt={15}>
                    <NavLink
                        alignItems="center"
                        href="/dashboard/nova-solicitacao"
                        icon={MdAddBox}
                        shouldMatchExactHref
                    >
                        Nova solicitacao
                    </NavLink>
                </Box>


                <Box mt={15}>
                    <NavLink
                        alignItems="center"
                        href="/dashboard/propostas"
                        icon={MdContactMail}
                        shouldMatchExactHref
                    >
                        Minhas Propostas
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
    )
}

export default Index
