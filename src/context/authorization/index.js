import React, { useMemo, useState, createContext, useCallback, useEffect } from "react";
import { useRouter } from 'next/router'

import { jwtDecode } from "jwt-decode";
import { Flex, Spinner } from '@chakra-ui/react'
import { api } from "../../service"
import { getCookie, setCookie, removeCookies } from 'cookies-next';


const JWT_HASH = "a54f843ea012b3d3e1168b1fd8b566f1c6577e07871819f3e241945731e43d3f"



export const AuthContext = createContext({})

const REDIRECT_USER_HOME = {
    "user": "dashboard",
    "admin": "backoffice"
}

function AuthProvider({ children }) {
    const router = useRouter()

    const [authData, setAuthData] = useState({})

    const logout = useCallback(() => {
        setAuthData({})
        removeCookies('scapa.token');
        removeCookies('scapa.refreshToken');
        router.push('/login')
    }, [router])

    const login = async (tokens) => {
        await getCredenciais(tokens, true)
    }


    useEffect(() => {
        const token = getCookie('scapa.token');
        const refresh = getCookie('scapa.refreshToken');
        if (!token || !refresh) return
        login({ token: String(token), refresh: String(refresh) })
    }, [])


    const getCredenciais = async (tokens, haveRedirect = false) => {
        const { token, refresh } = tokens
        try {
            api.defaults.headers.Authorization = `Bearer ${token}`
            const decoded = jwtDecode(token)

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }

            const { data: dataUser } = await api.get(
                `/user/${decoded.id}`,
                config
            )

            setAuthData({
                email: dataUser.data.email,
                nome: dataUser.data.nome,
                type: dataUser.data.type,
                is_active: dataUser.data.is_active,
                token,
                refresh
            })
            setCookie('scapa.token', token);
            setCookie('scapa.refreshToken', refresh);
            if (haveRedirect) {
                handleRedirect(dataUser.data.type, dataUser.data.is_active)
                return
            }
            return

        } catch {
            router.push("/")
        }

    }

    const handleRedirect = (type, is_active) => {
        if (is_active) {
            router.push("401-not-found")
        }
        const page = REDIRECT_USER_HOME[type]
        router.push(page)
    }

    const authProviderValue = useMemo(
        () => ({
            authData,
            logout,
            login
        }),
        [authData]
    )

    const showLoading =
        !Object.keys(authData).length && router.pathname.startsWith('/backoffice')

    return (
        <AuthContext.Provider value={authProviderValue}>
            {!showLoading ? (
                children
            ) : (
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    height={'100vh'}
                >
                    <Spinner
                        mt={20}
                        thickness="4px"
                        speed="0.65s"
                        color={'#fe761c'}
                        size="xl"
                    />
                    <br />
                    Carregando...
                </Flex>
            )}
        </AuthContext.Provider>
    )

}


export default AuthProvider