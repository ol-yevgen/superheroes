import { Routes, Route, Navigate } from 'react-router-dom'
// import { RegistrationPage } from '../pages/RegistrationPage'
// import { LoginPage } from '../pages/LoginPage'
import { HeroesPage } from 'pages/HeroesPage'
import { HeroDetailPage } from 'pages/HeroDetailPage'
import { AddNewHeroPage } from 'pages/AddNewHeroPage'
// import { ProfilePage } from '../pages/ProfilePage'

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
            {/* <Route
            path='/profile'
            element={<ProfilePage />}
        /> */}
            <Route
                path='*'
                element={<Navigate to="/heroes" replace />}
            />
        </Routes>
    )

    // if (!!isLoggedIn) {
    //     return (
    //         <Routes>
    //             <Route
    //                 path='/heroes'
    //                 element={<HeroesPage />}
    //             />
    //             <Route
    //                 path='/heroes/:id'
    //                 element={<HeroDetailPage />}
    //             />
    //             <Route
    //                 path='/add'
    //                 element={<AddNewHeroPage />}
    //             />
    //             {/* <Route
    //         path='/profile'
    //         element={<ProfilePage />}
    //     /> */}
    //             <Route
    //                 path='/'
    //                 element={<Navigate replace to="/heroes" />}
    //             />
    //         </Routes>
    //     )
    // } else {
    //     return (
    //         <Routes>
    //             <Route
    //                 path='/'
    //                 element={<LoginPage />}
    //             />
    //             <Route
    //                 path='/registration'
    //                 element={<RegistrationPage />}
    //             />
    //             <Route
    //                 path="*"
    //                 element={<Navigate replace to="/" />}
    //             />
    //         </Routes>
    //     )
    // }
}