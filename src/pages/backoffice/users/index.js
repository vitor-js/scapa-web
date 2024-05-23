import React, { useState, useEffect } from 'react';

import { LayoutBackoffice } from '../../../layouts/';
import { HeaderPages, WrapperBody, } from '../../../components'
import { Text, Flex, Button, Box } from '@chakra-ui/react';
import { MdPeople } from 'react-icons/md'
import { useUsers, useColors } from '../../../hooks'
import { converteNaiveDate } from '../../../helpers'
import Link from 'next/link'

function Index() {

    const colors = useColors()
    const { query: request } = useUsers()
    const { data: requestData, isLoading, isFetching, isError, refetch, } = request;

    const [users, setUsers] = useState()
    const [usersSum, setUsersSum] = useState()


    useEffect(() => {
        if (!requestData) return
        setUsers(requestData.data)
        setUsersSum(requestData.data.length)
    }, [requestData])



    return <LayoutBackoffice>
        <HeaderPages title={`Usuários`} icon={MdPeople} >
            <Text fontSize='2xl' fontWeight={600} my={3} >
                {usersSum && usersSum} usuários até o momento!
            </Text>
        </HeaderPages>

        <WrapperBody>
            {users && users.length != 0 && (
                <>
                    {users.map((value, index) => (
                        <Box key={value.id} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} >
                            <Text fontSize='lg' fontWeight={600}>
                                {value.id} - {value.nome}
                            </Text>

                            <Flex width="100%" borderTopColor={colors.border.color} borderTopStyle={'solid'} borderTopWidth={1} mt={5} paddingTop={5} justifyContent={'space-between'} gap={10} alignContent={"center"} alignItems={"center"} justifyItems={"center"}>
                                <Flex width="70%" justifyContent={'space-between'} alignContent={"center"} alignItems={"center"} justifyItems={"center"} flexDirection={['row', 'row', 'row']} gap={20} >
                                    <Box>
                                        <Text fontSize='md' fontWeight={'600'}>
                                            Email
                                        </Text>
                                        <Text fontSize='md'>
                                            {value.email}
                                        </Text>

                                    </Box>

                                    <Box>
                                        <Text fontSize='md' fontWeight={'600'}>
                                            Tipo
                                        </Text>
                                        <Text fontSize='md'>
                                            {value.type}
                                        </Text>

                                    </Box>

                                    <Box>
                                        <Text fontSize='md' fontWeight={'600'}>
                                            Status
                                        </Text>
                                        <Text fontSize='md'>
                                            {value.is_active ? "Ativo" : "Nao ativo "}
                                        </Text>

                                    </Box>


                                    <Box>
                                        <Text fontSize='md' fontWeight={'600'}>
                                            Data de criacao
                                        </Text>
                                        {console.log(value)}
                                        <Text fontSize='md'>
                                            {converteNaiveDate(value.createdAt)}
                                        </Text>

                                    </Box>
                                </Flex>
                                <Flex cursor={"pointer"}>

                                    <Link href={`/backoffice/users/editar/${value.id}`} passHref>
                                        <Text fontSize='md' fontWeight={600}>
                                            Clique para editar
                                        </Text>
                                    </Link>
                                </Flex>
                            </Flex>
                        </Box>
                    ))}
                </>

            )}
        </WrapperBody>
    </LayoutBackoffice>;
}

export default Index;