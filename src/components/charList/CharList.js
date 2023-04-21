import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        char: [],
        loading: true,
        error: false
    }
    // Для работы с классом нужно создать его экземпляр
    marvelService = new MarvelService();

    // Изменение стейта при загрузке персонажа
    onCharLoaded = (char) => {
        this.setState({ char, loading: false }) // == ({char: char})
    }

    // Ошибка при получении данных от сервера
    onError = () => {
        this.setState(
            {
                loading: false,
                error: true
            })
    }

    // вывод случайного персонажа через запрос к API на сервер Marvell. Используется метод класса marvelservice для запроса
    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded) // в метод будут переданы данные от запроса автоматически
            .catch(this.onError); // ошибка при получении данных
    }

    // Хук - компонент появляется на странице (монтируется)
    componentDidMount() {
        this.updateChar();
    }



    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = [];
        char.forEach((item, i) => {
            content[i] = !(error || loading) ? <View key={i} item={item} /> : null; // если нет ошибки или если нет загрузки то возращаем контент
        })
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({ item }) => {
    const { name } = item
    let notImage = false;
    if (item.thumbnail.indexOf('available') > -1) {
        notImage = true
    }
    const style = notImage ? "contain" : '';
    return (
        <li className="char__item">
            <img src={item.thumbnail} alt="abyss" style={{objectFit: style}}/>
            <div className="char__name">{name}</div>
        </li>
    )



}

export default CharList;