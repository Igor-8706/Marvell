import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error , clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=7cde0c423056bf2a944614bc08284093';
    const _baseOffset = 210;

    // получение данных с сервера

    // получение всех персонажей
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    // получение комиксов
    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    //получение одного комикса
    const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    // получение одного персонажа из БД
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // метод трансфомирует полученные от сервера данные удаляя ненужные в необходимый нам формат. возвращает объект с данными
    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    // трансформирование данных с комиксами
    const _transformComics = (comics) => {
        return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
    }

    return {loading, error, getCharacter, getAllCharacters, clearError,getComics, getComic}
}

export default useMarvelService;