import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';
// для работы ленивой загрузки нужен экпорт по умолчанию, а он в файле 404, а не в pages. Все динамичесские импорты после статических
const Page404 = lazy (() => import ('../pages/404'));
const MainPage = lazy (() => import ('../pages/MainPage'));
const ComicsPage = lazy (() => import ('../pages/ComicsPage'));
const SingleComicPage = lazy (() => import ('../pages/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}> {/* компонент реакта, нужен для использования динамического импорта (lazy)*/}
                    <Routes> {/* для загрузки только одной страницы. без switch(routes) обе страницы загрузятся в одном окне*/}
                        <Route  path="/Marvell" element={<MainPage/>} />  {/* первая страница. exact(для версии 5) - полное совпадение пути*/}
                        <Route  path="Marvell/comics" element={<ComicsPage/>} />  {/* вторая страница*/}
                        <Route  path = "Marvell/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path = "*" element={<Page404/>}></Route>
                    </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;