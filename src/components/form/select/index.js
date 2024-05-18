
import { forwardRef, useEffect } from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text
} from '@chakra-ui/react'
import { useColors } from '../../../hooks'
import React from 'react'

import { Select } from '@chakra-ui/react'

const Index = (
    { name, label, error = null, options, ...props },
    ref
) => {


    const color = useColors()


    return (
        <FormControl isInvalid={!!error}>
            {label && (
                <FormLabel
                    m={0}
                    htmlFor={name}
                    fontSize="sm"
                    color={"black.100"}
                    fontWeight="normal"
                >
                    <Text color={color.text}>
                        {label}
                    </Text>

                </FormLabel>
            )}

            <Select
                mt={1}
                borderColor={"black.50"}
                id={name}

                name={name}
                borderRadius={5}
                fontSize="sm"
                color={color.text}
                ref={ref}
                size="md"
                placeholder='Selecione uma opcao'
                {...props}
            >

                {options && options.map(v => {
                    return (<option key={v.value} value={v.value}>{v.label}</option>)
                })}
            </Select>

            {error && <FormErrorMessage color={color.textDanger}>{error}</FormErrorMessage>}
        </FormControl>
    )
}

export default forwardRef(Index)
