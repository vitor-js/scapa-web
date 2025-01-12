import React, { useEffect } from 'react';
import { Box, Flex, Button, Text } from "@chakra-ui/react"
import Select from '../../../../../form/select'
import Input from '../../../../../form/input'
import { toCurrencyScreen } from '../../../../../../helpers'

const options_penalt = [
    {
        label: "Sim",
        value: "Sim"
    },
    {
        label: "Não",
        value: "Não"
    }
]

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


    useEffect(() => {
        console.log(draftRequest)
        if (!draftRequest || !data) return
        if (["Depósitos do FGTS",].includes(draftRequest.requestValue)) {
            setValue("time_fgts", draftRequest.termination_type)
        }

    }, [draftRequest, data])

    return (
        <>

<Box w={'100%'} mt={5}>
<Input mask={"number"} label='Tempo em meses que não foi recolhido o depósito do FGTS ' name='time_fgts' error={errors?.time_fgts?.message}  {...register("time_fgts")} />
            </Box>





        </>
    );
}

export default Index;