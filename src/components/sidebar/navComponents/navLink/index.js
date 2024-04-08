import React, { useState } from 'react'
import {
    Icon,
    Link as ChakraLink,
    Text,
    LinkProps,
    Box,
} from '@chakra-ui/react'
import { ActiveLink } from '../activeLink'

import { useRouter } from 'next/router'
import { useColors } from '../../../../hooks'

export function NavLink({
    shouldMatchExactHref = false,
    icon,
    href,
    children,
    contextPage = 'null',
    isExternalLink,
    notLink,
    ...props
}) {
    const colors = useColors()
    const { asPath } = useRouter()

    const [externalLink] = useState(() => {
        if (isExternalLink) {
            return `${process.env.NEXT_PUBLIC_EXTERNAL_LINK}${href}`
        }
        return
    })

    let isActive = false

    if (
        (shouldMatchExactHref && (asPath === href || asPath === props.as)) ||
        asPath.includes(contextPage)
    ) {
        isActive = true
    }

    return (
        <Box
            w="100%"
            padding="8px 8px"
            borderWidth={1}
            borderColor={colors.background}
            borderRadius={5}
            _hover={{
                background: colors.hoverbackground,
                borderColor: colors.border.hoverColor,
            }}
            bg={isActive ? colors.hoverbackground : colors.background}
            cursor="pointer"
            transition="ease all 0.1s"
        >
            {notLink && (
                <div style={{ cursor: "pointer" }} >
                    <Box display="flex" align="center">
                        <Icon as={icon} fontSize="20px" />

                        <Text ml="4" fontSize="medium">
                            {children}
                        </Text>
                    </Box>
                </div>
            )}

            {!notLink && (
                <ActiveLink href={isExternalLink ? externalLink : href} passHref>
                    <Box display="flex" align="center">
                        <Icon as={icon} fontSize="20px" />

                        <Text ml="4" fontSize="medium">
                            {children}
                        </Text>
                    </Box>
                </ActiveLink>
            )}

        </Box>
    )
}
