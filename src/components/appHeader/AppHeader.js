import { Link, NavLink } from 'react-router-dom'; // Используется для задания ссылок, переход между страницами
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/Marvell'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        end
                        // activeStyle={{ 'color': '#9f0013' }} для 5 версии react router
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/Marvell">Characters
                    </NavLink>
                    </li>
                    /
                    <li><NavLink
                        end
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/Marvell/comics">Comics
                    </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;