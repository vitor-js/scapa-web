import React from 'react';
import { LayoutDashboardHome } from '../../layouts'
import { WrapperBody } from '../../components'
import { Text } from '@chakra-ui/react';

function Index() {
    return (
        <LayoutDashboardHome>
            <WrapperBody>
                <Text fontSize='lg' fontWeight={600}>
                    Olá, aqui vamos ter o dashboard
                </Text>
            </WrapperBody>
        </LayoutDashboardHome>
    );
}

export default Index;