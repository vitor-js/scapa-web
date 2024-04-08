
import { forwardRef } from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text
} from '@chakra-ui/react'
import { useColors } from '../../../hooks'
import React from 'react'
import masks from './masks'


const Index = (
    { name, label, error = null, mask = 'defauldValue', ...props },
    ref
) => {
    function applyMask(event) {
        masks[mask](event)
    }

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

            <Input
                mt={1}
                borderColor={"black.50"}
                id={name}
                onInput={applyMask}
                name={name}
                borderRadius={5}
                fontSize="sm"
                color={color.text}
                ref={ref}
                size="md"

                {...props}
            />

            {error && <FormErrorMessage color={color.textDanger}>{error}</FormErrorMessage>}
        </FormControl>
    )
}

export default forwardRef(Index)
