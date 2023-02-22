import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserListPage from '../components/UserListPage'
import { routes } from './routes'

const CreateUserPage = lazy(() => import('../components/CreateUserPage'))

export const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route path={routes.userList} element={<UserListPage />} />
                    <Route path={routes.createUser} element={<CreateUserPage />} />
                    <Route path='/' element={<Navigate to={routes.userList} replace />} />
                </Routes>
            </Suspense>
        </Router>
    )
}