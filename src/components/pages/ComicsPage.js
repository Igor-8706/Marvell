import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";


const ComicsPage = () => {
    return (
        <>
        <Helmet>  {/* сторонняя бибиотека, позволяет менять title и др на страницах для SEO оптимизации */}
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner></AppBanner>
            <ComicsList />
        </>
    )
}

export default ComicsPage;
