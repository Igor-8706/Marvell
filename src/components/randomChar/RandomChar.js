import { useState, useEffect } from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Для работы с классом нужно создать его экземпляр
    const marvelService = new MarvelService();

    // Хук - имитация состояния после появления на странице (монтирования)
    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => {
            clearInterval(timerId)
        }
    }, [])

    // Изменение стейта при загрузке персонажа
    const onCharLoaded = (char) => {
        //проверка на наличие описания персонажа
        if (!char.description) {
            setChar({ ...char, description: 'There is no description for this character...' });
            setLoading(false);
        } else {
            setChar(char);
            setLoading(false);
        }
        // проверка на длину строки описания
        if (char.description && char.description.length > 50) {
            char.description = char.description.slice(0, 50) + '...';
            setChar(char);
            setLoading(false);
        }
    }

    // Ошибка при получении данных от сервера
    const onError = () => {
        setLoading(false);
        setError(true);
    }

    // вывод случайного персонажа через запрос к API на сервер Marvell. Используется метод класса marvelservice для запроса
    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //выбор персонажа в определенном интервале id
        marvelService
            .getCharacter(id)
            .then(onCharLoaded) // в метод будут переданы данные от запроса автоматически
            .catch(onError); // ошибка при получении данных
    }

    // Обновление персонажа при нажатии кнопки try it
    const onBtnUpdate = () => {
        setLoading(true);
        setError(false);
        updateChar();
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <View char={char} /> : null; // если нет ошибки или если нет загрузки то возращаем контент
    return (
        <div className="randomchar" >
            {errorMessage} {/* произойдет отрисовка того, что не null*/}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={onBtnUpdate} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
    let notImage = false;
    if (char.thumbnail.indexOf('available') > -1) {
        notImage = true
    }
    const style = notImage ? "contain" : '';
    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={{ objectFit: style }} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default RandomChar;