import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useColors } from '.././../hooks'

function Index({ center, children }) {
    const colors = useColors()
    return (<Flex maxWidth={colors.size.maxWidth} flexDirection={"column"} margin={'auto'} width="100%" style={{ height: "100%" }} padding={4}>
        <Flex flexDirection={'column'} width={'100%'} height={'100%'} alignItems={center ? "center" : "flex-start"} justifyContent={center ? "center" : "flex-start"}>
            {children}
        </Flex>
    </Flex>);
}

export default Index;