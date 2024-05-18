import { Box, useColorMode } from "@chakra-ui/react"
import { useColors } from '../../../hooks'
import Body from '../../wrapperBody'
import Image from 'next/image'
function Index() {
    const { colorMode } = useColorMode()
    const colors = useColors()

    return <Box width={'100%'} height={90} bg={colors.cardBackground} borderColor={colors.border} borderBottomWidth={1}>
        <Body center>
            {colorMode === 'light' && (
                <Image
                    src={require('../../../../assets/logo/logo.png')}
                    alt=""
                    width={130}
                />
            )}

            {colorMode === 'dark' && (
                <Image
                    src={require('../../../../assets/logo/logowhite.png')}
                    alt=""
                    width={130}
                />
            )}
        </Body>
    </Box>
}

export default Index