import { FC } from "react"
import { Provider } from "react-redux"
import { store } from 'redux/store';
import { MainLayout } from "layouts/MainLayout";
import { BrowserRouter as Router } from 'react-router-dom'

export const App: FC = () => {
    return (

        <Provider store={store}>
            <Router>
                <MainLayout/>
            </Router>
        </Provider>
    )
}
