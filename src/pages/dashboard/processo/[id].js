import { LayoutDashboardProccess } from '../../../layouts'
import { HeaderPages } from '../../../components'
import { MdEditDocument } from 'react-icons/md'

function Index() {



    return (
        <LayoutDashboardProccess>
            <HeaderPages title={'Propostas'} icon={MdEditDocument} />
        </LayoutDashboardProccess>
    )
}

export default Index