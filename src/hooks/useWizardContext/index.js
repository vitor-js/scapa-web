import { useContext } from 'react'
import { WizardContext } from './../../../src/components/wizard'

function useWizardContext() {
    const context = useContext(WizardContext)
    return context
}
export default useWizardContext
