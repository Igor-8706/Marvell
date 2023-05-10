import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages';

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch> {/* для загрузки только одной страницы. без switch обе страницы загрузятся в одном окне*/}
                        <Route exact path="/Marvell">  {/* первая страница. exact - полное совпадение пути*/}
                            <MainPage />
                        </Route>
                        <Route exact path="/Marvell/comics">  {/* вторая страница*/}
                            <ComicsPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;