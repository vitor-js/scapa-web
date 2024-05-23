import React from 'react';

import { Grid, GridItem, Flex } from '@chakra-ui/react'
import { HeaderBar, SideBarBackofficeIndex, Input } from '../../../components'
import { useDisclosure } from '@chakra-ui/react'
import { useColors, useAuth } from '../../../hooks'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Box
} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { currencyToBackend } from '../../../helpers'
import { api } from '../../../service';
import { useRouter } from 'next/router'
import { queryClient } from '../../../service/queryClient';
import { toast } from 'react-hot-toast';

function Index({ children }) {
    const { authData } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const colors = useColors()
    const router = useRouter()



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
                <SideBarBackofficeIndex />
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