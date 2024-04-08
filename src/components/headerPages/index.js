import { Box, Text, Flex, Icon, Tooltip } from '@chakra-ui/react'
import { useColors } from '../../hooks'




function Index({ title, icon, children, tooltipMsg }) {
    const colors = useColors()

    return (
        <Box
            width="100%"
            p={5}
            bg={colors.background}
            borderColor={colors.border.color}
            borderBottomWidth={1}
        >
            <Flex
                maxWidth={colors.size.maxWidth}
                marginLeft="auto"
                marginRight="auto"
                flexDirection="column"
            >
                {
                    title && icon &&
                    <Flex alignItems={'center'} mt={5}>
                        {icon && <Icon as={icon} fontSize={35} />}
                        <Text ml={3} fontWeight="bold" fontSize="4xl" color={colors.text}>
                            <Tooltip label={tooltipMsg}>
                                {title && title}
                            </Tooltip>
                        </Text>
                    </Flex>
                }

                <Box w={'100%'}>{children}</Box>
            </Flex>
        </Box>
    )
}

export default Index
