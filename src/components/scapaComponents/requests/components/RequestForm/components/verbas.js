import React, { useEffect } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import Select from '../../../../../form/select'
import Input from '../../../../../form/input'
import { toCurrencyScreen } from '../../../../../../helpers'

const ACTIONS = [
    {
        label: "Dispensa imotivada ou rescisão indireta",
        value: "Dispensa imotivada ou rescisão indireta"
    },
    {
        label: "Pedido de demissão",
        value: "Pedido de demissão"
    },
    {
        label: "Comum acordo",
        value: "Comum acordo"
    },
    {
        label: "Dispensa motivada (justa causa)",
        value: "Dispensa motivada (justa causa)"
    }

]



function Index({ errors, register, data, draftRequest, setValue }) {


    // useEffect(() => {
    //     console.log(draftRequest)
    //     if (!draftRequest || !data) return
    //     if (["Diferenças salariais por equiparação salarial",
    //         "Diferenças salariais por acúmulo de função",
    //         "Diferenças salariais convencionais",
    //         "Diferenças reflexas de vantagens salariais",
    //         "Diferenças salariais (genérico)",].includes(draftRequest.requestValue)) {
    //         setValue("diff_value_salary", toCurrencyScreen(draftRequest.diference_value))
    //         setValue("diff_salary_type", draftRequest.diference_type)
    //     }

    // }, [draftRequest, data])

    return (
        <>
            <Box w={'100%'} mt={5}>
                <Select label='Clique para selecionar a forma de rescisão' options={ACTIONS}
                    {...register('termination_type')}
                    error={errors?.termination_type?.message}
                    name='termination_type'
                />
            </Box>


            <Box w={'100%'} mt={5}>
                <Select label='Existem férias vencidas ?' options={[
                    {
                        label: "Sim",
                        value: true
                    },
                    {
                        label: "Não",
                        value: false
                    }
                ]}
                    {...register('have_vacation')}
                    error={errors?.have_vacation?.message}
                    name='have_vacation'
                />
            </Box>
        </>
    );
}

export default Index;