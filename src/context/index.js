import AuthProvider from './authorization'


const Index = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default Index