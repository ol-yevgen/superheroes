import { Routes, Route, Navigate } from 'react-router-dom'
import { HeroesPage } from 'pages/HeroesPage'
import { HeroDetailPage } from 'pages/HeroDetailPage'
import { AddNewHeroPage } from 'pages/AddNewHeroPage'
import { AuthorizationPage } from 'pages/AuthorizationPage'
import { useAppSelector } from 'redux/store'
import { memo } from 'react'

export const ProtectedRoutes = memo(() => {
    const { accessToken } = useAppSelector((state) => state.authState)

    if (!!accessToken) {
        return (
            <Routes>
                <Route
                    path='/heroes'
                    element={<HeroesPage />}
                />
                <Route
                    path='/heroes/:id'
                    element={<HeroDetailPage/>}
                />
                <Route
                    path='/add'
                    element={<AddNewHeroPage />}
                />
                <Route
                    path='*'
                    element={<Navigate to="/heroes" replace />}
                />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route
                    path='/heroes'
                    element={<HeroesPage />}
                />
                <Route
                    path='/login'
                    element={<AuthorizationPage />}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/login" />}
                />
            </Routes>
        )
    }
})