import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from "../appBanner/AppBanner";




// import './singleComicPage.scss';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const {  getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData(); // используется если пользователь вручную поправит адрес страницы
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
            case 'char':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
            default: break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>

            <AppBanner />
            {setContent(process, Component, data )}

        </>
    )
}



export default SinglePage;