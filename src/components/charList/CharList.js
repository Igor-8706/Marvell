import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'; // проверка типа данных пропсов
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest(); // хук состояния, эмуляция хука жизненного цикла componentDidMount. 
    }, [])           //При передаче пустого массива зависимостей вызовется только один раз. UseEffect запускается после Rendera компонента


    // получение дополнительных персонажей при клике на кнопку(пагинация)
    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }
    // данные загружаются
    const onCharListLoading = () => {
        setNewItemLoading(true);
    }
    // Данные загрузились
    const onCharListLoaded = (newCharList) => { //newCharList - новые данные приходящие от сервера
        let ended = false;
        if (newCharList.length < 9) { // если персонажи закончились
            ended = true
        }

        // this.setState(({ offset, charList }) => ({ //круглые скобки означают, что мы возвращаем объект из функции, вместо return
        //     charList: [...charList, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // }))
        // далее классовый компонент переписан на функциональный с использованием хуков
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onError = () => {
        setError(error => true);
        setLoading(loading => false)
    }

    const ref = useRef([]);

    // Формирование массива элементов li при помощи рефов
    // setCharRef = (elem) => {
    //     this.ref.push(elem);
    // }

    // Выделение цветом выбранного персонажа, реализовано при помощи массива с элементами (рефы)
    const coloringSelectedChar = (id) => {
        ref.current.forEach(elem => {
            elem.classList.remove('char__item_selected')
        })
        ref.current[id].classList.add('char__item_selected')
        ref.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    ref={el => ref.current[i] = el} // каждая нода через реф записывается в массив. el - ссылка на элемент, на котором реф был вызван
                    tabIndex={0}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        coloringSelectedChar(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            coloringSelectedChar(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}

            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }

    // Проверка типа пропсов. В данном случае проверка на то, что пропс oncgarSelected будет являться функцией
    CharList.propTypes = {
        onCharSelected: PropTypes.func
    }

    export default CharList;