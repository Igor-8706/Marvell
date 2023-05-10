import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages';

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes> {/* для загрузки только одной страницы. без switch(routes) обе страницы загрузятся в одном окне*/}
                        <Route  path="/Marvell" element={<MainPage/>} />  {/* первая страница. exact(для версии 5) - полное совпадение пути*/}
                        <Route  path="Marvell/comics" element={<ComicsPage/>} />  {/* вторая страница*/}
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;