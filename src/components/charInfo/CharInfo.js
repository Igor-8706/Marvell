import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types'; // проверка типа данных пропсов
import { SingleComicPage } from '../pages';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError} = useMarvelService();

    // // Для работы с классом нужно создать его экземпляр
    // // marvelService = new MarvelService();
    // const marvelService = new MarvelService();

    // Хук, вызывается после того как компонент был создан на странице
    // componentDidMount() {
    //     this.updateChar();
    // }
    useEffect(() => {
        updateChar()
    }, [])

    // Хук, срабатывает когда в компонент приходит новый пропс, изменяется стейт
    // componentDidUpdate(prevProps, prevState) {
    //     // проверка, действительно ли изменились пропсы, иначе приложение зациклится
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }
    useEffect(() => {
        updateChar();
    }, [props.charId])

    //Хук, отслеживание ошибки в компоненте. Не работает после 16 версии реакта. Вместо него используются предохранители.
    // componentDidCatch(err, info){
    //     this.setState({error: true})
    // }

    // Загрузка персонажа при клике на карточку в charlist
    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    // Изменение стейта при загрузке персонажа
    const onCharLoaded = (char) => {
        //проверка на наличие описания персонажа
        if (!char.description) {
            // this.setState({
            //     char: {
            //         ...char,
            //         description: 'There is no description for this character...',
            //     },
            //     loading: false,
            // })
            setChar({ ...char, description: 'There is no description for this character...' });
        } else {
            // this.setState({ char, loading: false }) // == ({char: char})
            setChar(char);
        }
        // проверка на длину строки описания
        if (char.description && char.description.length > 50) {
            char.description = char.description.slice(0, 50) + '...';
            // this.setState({ char, loading: false })
            setChar(char);
        }
    }

    const skeleton = char || loading || error ? null : <Skeleton /> // Если персонаж не загружен, ошибки нет, загрузки нет, то выводим заглушку Скелетон
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null; // если нет ошибки или если нет загрузки то возращаем контент

    return (
        <div className="char__info">
            {/* при помощи условий отобразится только один компонент */}
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics, id } = char;
    const notComics = 'not comics';
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comics.map((item, i) => {
                    // if (i > 9) return;
                    return (
                        <Link to={`comics/108427`} key={i} className="char__comics-item">
                            {item.name}
                        </Link>
                    )
                }
                )}

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;