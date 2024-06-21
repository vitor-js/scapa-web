import React, { useEffect } from 'react';
import { LayoutDashboardHome } from '../../layouts'
import { WrapperBody, HeaderPages } from '../../components'
import { Text, Box, Flex } from '@chakra-ui/react';
import { MdEditDocument } from 'react-icons/md'
import { useProccess, useAuth, useColors } from '../../hooks'
import { converteNaiveDate } from '../../helpers'
import Link from 'next/link'


function Index() {
    const { authData } = useAuth()
    const { query } = useProccess(authData.id)
    const colors = useColors()
    const { data, isLoading, isFetching, isError, refetch } = query;

    return (
        <LayoutDashboardHome>

            <HeaderPages title="Seus Processos" icon={MdEditDocument}>

            </HeaderPages>
            <WrapperBody>
                {data?.data.length !== 0 && (
                    <>
                        {data?.data.map(value => (
                            <Box key={value.id} mt={5} width="100%" bg={colors.cardBackground} padding={4} borderRadius={5} >
                                <Text fontSize='lg' fontWeight={600}>
                                    {value.number_process} - {value.title}
                                </Text>

                                <Flex width="100%" borderTopColor={colors.border.color} borderTopStyle={'solid'} borderTopWidth={1} mt={5} paddingTop={5} justifyContent={'space-between'} gap={10} alignContent={"center"} alignItems={"center"} justifyItems={"center"}>
                                    <Flex width="70%" justifyContent={'space-between'} alignContent={"center"} alignItems={"center"} justifyItems={"center"} flexDirection={['row', 'row', 'row']} gap={20} >
                                        <Box>
                                            <Text fontSize='md' fontWeight={'600'}>
                                                Autor
                                            </Text>
                                            <Text fontSize='md'>
                                                {value.autor}
                                            </Text>

                                        </Box>

                                        <Box>
                                            <Text fontSize='md' fontWeight={'600'}>
                                                Réu
                                            </Text>
                                            <Text fontSize='md'>
                                                {value.reu}
                                            </Text>

                                        </Box>

                                        <Box>
                                            <Text fontSize='md' fontWeight={'600'}>
                                                Propostas
                                            </Text>
                                            <Text fontSize='md'>
                                                {value.Proposals.length}
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

                                        <Link href={`/dashboard/processo/${value.id}`} passHref>
                                            <Text fontSize='md' fontWeight={600}>
                                                Clique para inserir dados e montar propostas
                                            </Text>
                                        </Link>



                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </>

                )}

                {data?.data.length === 0 && (
                    <>
                        <WrapperBody>

                            <Flex mt={5} width={'100%'} flexDirection={'column'}>
                                <Text fontSize={'2xl'} fontWeight={600}>
                                    Processos
                                </Text>

                                <Flex
                                    flexDirection={'column'}
                                    bg={colors.cardBackground} padding={4} borderRadius={5} mt={4}>

                                    <Text fontSize={20} fontWeight={400}>
                                        Nenhuma processo foi criada, clique em Adicionar Processo no menu lateral para adicionar seu primeiro processo.
                                    </Text>
                                </Flex>
                            </Flex>
                        </WrapperBody>
                    </>
                )}
            </WrapperBody>
        </LayoutDashboardHome>
    );
}

export default Index;