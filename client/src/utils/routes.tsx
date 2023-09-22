import { Routes, Route, Navigate } from 'react-router-dom'
import { HeroesPage } from 'pages/HeroesPage'
import { HeroDetailPage } from 'pages/HeroDetailPage'
import { AddNewHeroPage } from 'pages/AddNewHeroPage'

export const useRoutes = () => {

    return (
        <Routes>
            <Route
                path='/heroes'
                element={<HeroesPage />}
            />
            <Route
                path='/heroes/:id'
                element={<HeroDetailPage />}
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
}