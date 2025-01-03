import React, { useEffect } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import Select from '../../../../../form/select'
import Input from '../../../../../form/input'
import { toCurrencyScreen } from '../../../../../../helpers'

const ACTIONS = [
    {
        label: "Percentual",
        value: "percentual"
    },
    {
        label: "Absoluta (valor)",
        value: "absoluta"
    }

]

function Index({ errors, register, data, draftRequest, setValue }) {


    useEffect(() => {
        console.log(draftRequest)
        if (!draftRequest || !data) return
        if (["Diferenças salariais por equiparação salarial",
            "Diferenças salariais por acúmulo de função",
            "Diferenças salariais convencionais",
            "Diferenças reflexas de vantagens salariais",
            "Diferenças salariais (genérico)",].includes(draftRequest.requestValue)) {
            setValue("diff_value_salary", toCurrencyScreen(draftRequest.diference_value))
            setValue("diff_salary_type", draftRequest.diference_type)
        }

    }, [draftRequest, data])

    return (
        <>
            <Box w={'100%'} mt={5}>
                <Select label='Escolha entre o tipo de diferença' options={ACTIONS}
                    {...register('diff_salary_type')}
                    error={errors?.diff_salary_type?.message}
                    name='diff_salary_type'
                />
            </Box>


            <Box w={'100%'} mt={5}>
                <Input mask='currency'
                    {...register('diff_value_salary')}
                    name='diff_value_salary'
                    label='Diferença (Percentual ou valor)' />
            </Box>
        </>
    );
}

export default Index;