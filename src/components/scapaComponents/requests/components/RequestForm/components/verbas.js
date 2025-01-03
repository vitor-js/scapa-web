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
        if (["Verbas Rescisórias",].includes(draftRequest.requestValue)) {
            setValue("have_vacation", draftRequest.have_vacation ? "Sim" : "Não")
            setValue("termination_type", draftRequest.termination_type)
            setValue("have_penalt",  draftRequest.have_penalt ? "Sim" : "Não")
        }

    }, [draftRequest, data])

    return (
        <>

<Box w={'100%'} mt={5}>
                <Select label='Deseja adicionar a multa do art. 477' options={options_penalt}
                    {...register('have_penalt')}
                    error={errors?.have_penalt?.message}
                    name='have_penalt'
                />
            </Box>


            <Box w={'100%'} mt={5}>
                <Select label='Clique para selecionar a forma de rescisão' options={ACTIONS}
                    {...register('termination_type')}
                    error={errors?.termination_type?.message}
                    name='termination_type'
                />
            </Box>



        </>
    );
}

export default Index;