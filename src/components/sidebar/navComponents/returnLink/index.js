import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Flex, Text } from '@chakra-ui/react'
import { useColors } from '../../../../hooks'
import Link from 'next/link'


export function ReturnLink({ text, href }) {
    const colors = useColors()
    return (
        <Link href={href}>
            <Flex
                p={5}
                w="100%"
                _hover={{
                    background: colors.hoverbackground,
                    borderColor: colors.border.hoverColor,
                }}
                cursor="pointer"
                transition="ease all 0.1s"
                borderBottomWidth={1}
                borderBottomColor={colors.border.color}
                align="center"
            >
                <MdArrowBack />
                <Text ml="4" fontSize="medium">
                    {text}
                </Text>
            </Flex>
        </Link>
    )
}
