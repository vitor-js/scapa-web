
import { ChakraProvider } from '@chakra-ui/react'
import { globalTheme } from '../styles/globalthemeConfig'
import AppProvider from '../context'

export default function App({ Component, pageProps }) {
  return (<>
    <AppProvider>
      <ChakraProvider theme={globalTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  </>);
}
