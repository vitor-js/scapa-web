
import { ChakraProvider } from '@chakra-ui/react'
import { globalTheme } from '../styles/globalthemeConfig'
import AppProvider from '../context'
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from '../service/queryClient.js'
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {

  return (<>

    <AppProvider> <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={globalTheme}>
        <Toaster position="center-top" />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
    </AppProvider>

  </>);
}
