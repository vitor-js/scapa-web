import { Grid, GridItem } from '@chakra-ui/react'
import { BackofficeHeaderBar, ToolSideBar, DashboardProccess } from '../../../components'
import { HeaderBar, DashboardHomeMenu, Input } from '../../../components'

export default function Index({ children }) {
    return (
        <Grid
            templateAreas={`"nav main" "nav main"`}
            gridTemplateRows={'auto 1fr'}
            gridTemplateColumns={'260px 1fr'}
            h="100vh"
            gap="0"
        >

            <GridItem area={'nav'}>
                <DashboardProccess />
            </GridItem>
            <GridItem area={'main'}>{children}</GridItem>
        </Grid>
    )
}
