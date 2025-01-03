import React, { useEffect, useRef } from 'react';
import { useColors } from '../../../../../hooks'
import { Box, Flex, Button, Text, Grid } from "@chakra-ui/react"
import { toCurrencyScreen } from '../../../../../helpers'
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import ReportTemplate from '../../../../../templates/index.js'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast';

function Index({ result, hasReturn = true }) {
    const colors = useColors()
    const reportTemplateRef = useRef(null);
    const router = useRouter()
    const { query } = router
    const { id } = query

    const exportPDF = async () => {
        try {
            const doc = new jsPDF({
                format: 'a4',
                unit: 'px',
            });

            // Adding the fonts.
            doc.setFont('Inter-Regular', 'normal');

            doc.html(reportTemplateRef.current, {
                async callback(doc) {
                    await doc.save(`Proposta - ${id}`);
                    toast.success('Download feito com sucesso!');
                },
            });
        } catch (e) {
            toast.error('Algo deu errado, tente novamente.');
        }

    };


    return (
        <>
            <Flex
                bg={colors.cardBackground} padding={4} borderRadius={5} mt={4} w={'100%'} flexDirection={'column'}>

                <Flex mb={0} width={'100%'} flexDirection={'row'} alignItems={"center"} justifyContent={'space-between'}>
                    <Text fontSize={18} fontWeight={600} ml={3} mr={3} >
                        {result && result.title} -  {result && result.number_process}
                    </Text>
                </Flex>

                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                    <Box>
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            Autor
                        </Text>
                    </Box>

                    <Box >
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            {result && result.autor}
                        </Text>
                    </Box>


                </Flex>

                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                    <Box>
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            Réu
                        </Text>
                    </Box>

                    <Box >
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            {result && result.reu}
                        </Text>
                    </Box>
                </Flex>



                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                    <Box>
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            Tipo de proposta
                        </Text>
                    </Box>

                    <Box>
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            {result && result.type}
                        </Text>
                    </Box>
                </Flex>

                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                    <Box>
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            Tempo estimado de duração do processo (em meses)
                        </Text>
                    </Box>

                    <Box >
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            {result && result.proccess_time}
                        </Text>
                    </Box>
                </Flex>


                <Flex mt={4} width={'100%'} flexDirection={'column'}>
                    <Box>
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            Custo do Réu
                        </Text>
                    </Box>

                    <Box >
                        <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                            {result && toCurrencyScreen(Math.round(result.custo_reu))}
                        </Text>
                    </Box>
                </Flex>


                <Grid
                    alignItems={"center"}
                    gap={10}
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                >


                    <Flex width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor Total Postulado
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {result && toCurrencyScreen(result.valotTotalPostulado)}
                            </Text>
                        </Box>


                    </Flex>





                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor Total individualizado com gestão de risco
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {result && toCurrencyScreen(result.valueTotalPostulateIndividual)}
                            </Text>
                        </Box>


                    </Flex>


                    <Flex my={6} width={'100%'} flexDirection={'column'}>
                        <Box>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                Valor Total da proposta
                            </Text>
                        </Box>

                        <Box mt={1}>
                            <Text fontSize={15} fontWeight={400} ml={3} mr={3} >
                                {result && toCurrencyScreen(result.valueProposal)}
                            </Text>
                        </Box>


                    </Flex>


                </Grid>

                <Flex>
                    <Text onClick={() => { exportPDF() }} fontSize={15} fontWeight={600} color={colors.text} cursor={'pointer'}>
                        Clique para baixar modelo PDF da sua proposta
                    </Text>
                </Flex>


            </Flex>
            {hasReturn && <Flex width={'100%'} textAlign={'center'} alignItems={'center'} justifyContent={'center'} mt={10}>
                <Text textAlign={'center'} onClick={() => router.back()} fontSize={15} fontWeight={400} color={colors.text} cursor={'pointer'}>
                    Clique para voltar ou criar nova proposta
                </Text>

            </Flex>}


            <div style={{ opacity: 0, position: 'absolute', zIndex: -10 }}  >
                <div ref={reportTemplateRef}>
                    <ReportTemplate result={result} />
                </div>
            </div>
        </>
    );
}

export default Index;