import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useColors } from '.././../hooks'

function Index({ children }) {
    const colors = useColors()
    return (<Flex maxWidth={colors.size.maxWidth} flexDirection={"column-reverse"} width="100%" style={{ height: "100%" }} padding={4} >
        {children}
    </Flex>);
}

export default Index;