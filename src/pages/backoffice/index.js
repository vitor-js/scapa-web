import React, { useEffect, useState } from 'react';
import { LayoutBackoffice } from '../../layouts'
import { HeaderPages, WrapperBody, } from '../../components'
import { MdEditDocument } from 'react-icons/md'
import { useAllProccess, useColors } from '../../hooks'
import { converteNaiveDate } from '../../helpers'
import { Text, Flex, Button, Box } from '@chakra-ui/react';
import Link from 'next/link'

function Index() {
    const colors = useColors()
    const { query: request } = useAllProccess()
    const { data: requestData, isLoading, isFetching, isError, refetch, } = request;

    const [process, setProcess] = useState()
    const [processSum, setProcessSum] = useState()


    useEffect(() => {
        if (!requestData) return
        setProcess(requestData.data)
        setProcessSum(requestData.data.length)
    }, [requestData])



    return <LayoutBackoffice>
        <HeaderPages title={`Processo`} icon={MdEditDocument} >
            <Text fontSize='2xl' fontWeight={600} my={3} >
                {processSum && processSum} processos foram criados até o momento!
            </Text>
        </HeaderPages>

        <WrapperBody>
            {process && process.length != 0 && (
                <>
                    {process.map((value, index) => (
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
                                {/* <Flex cursor={"pointer"}>

                           <Link href={`/dashboard/processo/${value.id}`} passHref>
                               <Text fontSize='md' fontWeight={600}>
                                   Clique para ver mais
                               </Text>
                           </Link>



                       </Flex> */}
                            </Flex>
                        </Box>
                    ))}
                </>

            )}
        </WrapperBody>
    </LayoutBackoffice>;
}

export default Index;