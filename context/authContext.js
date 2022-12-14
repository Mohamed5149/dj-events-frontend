import { createContext, useState, useEffect } from 'react';
import { NEXT_URL } from '../config/index'
import { useRouter } from 'next/router'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [error, setError] = useState(null)

    const router = useRouter();

    useEffect(() => { checkUserLoggedIn() }, [])

    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        setUser(data)
        router.push('/account/dashboard')
    }

    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })
        const data = await res.json()
        setUser(data)
        router.push('/account/dashboard')
    }

    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: "POST"
        })
        if (res.ok) {
            setUser(null)
            router.push('/')
        }
    }

    const checkUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json();
        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;