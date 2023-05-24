import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';
import './App.css'
import { ComicsPage } from '../pages';
// для работы ленивой загрузки нужен экпорт по умолчанию, а он в файле 404, а не в pages. Все динамичесские импорты после статических
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharLayout = lazy(() => import('../pages/singleCharLayout/singleCharLayout'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Pages />
                </main>
            </div>
        </Router >
    )
}

const Pages = () => {
    return (
        <Suspense fallback={<Spinner />}> {/* компонент реакта, нужен для использования динамического импорта (lazy)*/}
            <Routes> {/* для загрузки только одной страницы. без switch(routes) обе страницы загрузятся в одном окне*/}
                <Route path="/Marvell" element={<MainPage />} />  {/* первая страница. exact(для версии 5) - полное совпадение пути*/}
                <Route path="Marvell/comics" element={<ComicsPage />} />  {/* вторая страница*/}
                <Route path="Marvell/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />  {/* перенаправление либо на комикс либо на персонажа*/}
                <Route path="Marvell/characters/:id" element={<SinglePage Component={SingleCharLayout} dataType='char' />} />  {/* component - используется в singlepage */}
                <Route path="*" element={<Page404 />}></Route>
            </Routes>
        </Suspense>
    )
}

export default App;