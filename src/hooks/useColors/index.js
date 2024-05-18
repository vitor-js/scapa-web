import { useColorModeValue } from '@chakra-ui/react';


function useColors() {
    return {
        background: useColorModeValue('white.100', 'black.150'),
        cardBackground: useColorModeValue('#ecedee  ', '#26292b'),
        text: useColorModeValue('black.100', 'white.100'),
        textButton: useColorModeValue('#ecedee', '#ecedee'),
        bgDanger: '#FC8181',
        textDanger: "#721c24",

        hoverbackground: useColorModeValue('#f1f3f5', '#313538'),
        border: {
            color: useColorModeValue('#dfe3e6', '#313538'),
            hoverColor: useColorModeValue('#d7dbdf', '#313538'),
            colorAlert: "#ffeeba",
            colorInfo: "#b8daff",
            radius: 5
        },
        size: {
            maxWidth: 1248
        },
    }
}

export default useColors