import { useColorModeValue } from '@chakra-ui/react';


function useColors() {
    return {
        background: useColorModeValue('white.100', 'black.150'),
        text: useColorModeValue('black.100', 'white.100'),
        hoverbackground: useColorModeValue('#f1f3f5', '#26292b'),
        border: {
            color: useColorModeValue('#dfe3e6', '#313538'),
            hoverColor: useColorModeValue('#d7dbdf', '#3a3f42'),
            colorAlert: "#ffeeba",
            colorInfo: "#b8daff",
            radius: 5
        },
    }
}

export default useColors