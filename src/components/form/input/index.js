
import { forwardRef } from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import React from 'react'
import masks from './masks'


const Index = (
    { name, label, error = null, mask = 'defauldValue', ...props },
    ref
) => {
    function applyMask(event) {
        masks[mask](event)
    }

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
                    {label}
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
                ref={ref}
                size="md"
                color={"black.100"}
                {...props}
            />

            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    )
}

export default forwardRef(Index)
