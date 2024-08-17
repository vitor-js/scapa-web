/* eslint-disable react-hooks/rules-of-hooks */

import { extendTheme } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';


export const globalTheme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    maxWidth: '1200px',
    styles: {
        global: () => ({
            body: {
                backgroundColor: useColorModeValue('#f1f3f5', '#0c0d0e'),
                text: useColorModeValue('#f1f3f5', '#f1f3f5'),
                scrollBehavior: "smooth",
            },
        }),
    },
    components: {
        Button: {
            baseStyle: {
                backgroundColor: "#2253A0 !important",
                borderRadius: '5px !important',
                color: "#fff !important"
            }
        },
    },
    colors: {
        blue: {
            50: "#2253A0",
            100: "#6683B1"
        },
        white: {
            50: "#f1f3f5",
            100: "#ecedee",
            150: "#F8F9FA",
        },
        black: {
            50: "#909090",
            100: "#323C4B",
            150: "#151718"
        }
    }
});
