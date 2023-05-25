import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'; // проверка типа данных пропсов
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>  
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case 'confirmed' :
            return <Component/>
            break;
        case 'error' :
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
            break;
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters, process, setProcess } = useMarvelService();
    const duration = 1200; //для анимации

    useEffect(() => {
        onRequest(offset, true); // хук состояния, эмуляция хука жизненного цикла componentDidMount. 
    }, [])           //При передаче пустого массива зависимостей вызовется только один раз. UseEffect запускается после Rendera компонента


    // получение дополнительных персонажей при клике на кнопку(пагинация)
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true); // первичная (в useeffect) или повторная загрузка
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
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
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
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
                <CSSTransition key={item.id} timeout={duration} classNames='char-animate'>
                    <li
                        ref={el => ref.current[i] = el} // каждая нода через реф записывается в массив. el - ссылка на элемент, на котором реф был вызван
                        tabIndex={0}
                        className="char__item"
                        // key={item.id}
                        key={i}
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
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}> {/* TransGroup - автоматически следит за изменением component = null для того чтобы не рендерить лишний div */}
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    // конструция создана для мемоизации функции setcontent. Это позволяет не перерисовавыть ее каждый раз при перерисовке 
    // родительского компонента MainPage. Позволяет решить вопрос с выделением цветом выбранного персонажа
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            {elements}
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