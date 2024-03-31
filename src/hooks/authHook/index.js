import { useContext } from 'react'

import { AuthContext } from '../../context/authorization'

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export default useAuth
