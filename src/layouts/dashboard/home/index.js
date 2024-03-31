import React from 'react';

import { Grid, GridItem, Flex } from '@chakra-ui/react'
import { HeaderBar, DashboardHomeMenu } from '../../../components'


function Index({ children }) {
    return (
        <Grid
            templateAreas={`"header header" "nav main"`}
            gridTemplateRows={'auto 1fr'}
            gridTemplateColumns={'260px 1fr'}
            h="100vh"
            gap="0"
        >
            <GridItem area={'header'}>
                <HeaderBar />
            </GridItem>
            <GridItem area={'nav'}>
                <DashboardHomeMenu />
            </GridItem>
            <GridItem area={'main'}>
                <Flex align={'center'} p={10}>
                    {children}
                </Flex>
            </GridItem>
        </Grid>
    );
}

export default Index;