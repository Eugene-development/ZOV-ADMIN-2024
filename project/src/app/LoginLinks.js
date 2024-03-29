'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="fixed top-0 right-0 px-6 py-4 sm:block">
            {user ? (
                <Link
                    href="/dashboard"
                    className="ml-4 text-sm text-gray-100 bg-gray-700 px-3 py-1 rounded-xl">
                    Главная
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm text-gray-100 bg-gray-700 px-3 py-1 rounded-xl">
                        Вход
                    </Link>

                    <Link
                        href="/register"
                        className="ml-4 text-sm text-gray-100 bg-gray-700 px-3 py-1 rounded-xl">
                        Регистрация
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
