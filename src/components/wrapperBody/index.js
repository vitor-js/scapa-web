import React from 'react';
import { Flex } from '@chakra-ui/react';
function Index({ children }) {
    return (<Flex style={{ width: "100%", height: "100%" }} padding={6} >
        {children}
    </Flex>);
}

export default Index;