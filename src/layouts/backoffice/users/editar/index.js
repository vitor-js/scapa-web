import React from 'react';

import { Grid, GridItem, Flex } from '@chakra-ui/react'
import { HeaderBar, SideBarBackofficeEditarUser, Input } from '../../../../components'

import { queryClient } from '../../../../service/queryClient';
import { toast } from 'react-hot-toast';

function Index({ children }) {



    return (
        <Grid
            templateAreas={`"header header" "nav main"`}
            gridTemplateRows={'auto 1fr'}
            gridTemplateColumns={'260px 1fr'}
            h="100vh"
            overflow={"hidden"}
            gap="0"
        >


            <GridItem area={'header'}>
                <HeaderBar />
            </GridItem>
            <GridItem area={'nav'}>
                <SideBarBackofficeEditarUser />
            </GridItem>
            <GridItem overflow={'auto'} area={'main'}>
                <Flex overflow='overlay' height='100%' align={'center'} flexDirection={"column"}>
                    {children}
                </Flex>
            </GridItem>
        </Grid>
    );
}

export default Index;