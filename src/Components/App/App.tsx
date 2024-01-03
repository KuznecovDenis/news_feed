import React from "react";
import './App.css'
import {Articles} from "../Articles/Articles";
import {Navigation} from "../Navigation/Navigation";
import {categoryId} from "../../utils";
import {Article} from "../Article/Article";
import {NewsAPI} from "../../types";

export const App = () => {
    const [articleId, setArticleId] = React.useState <number | null> (null)
    const [category, setCategory] = React.useState('index')
    const [articles, setArticles] = React.useState<NewsAPI>({ items: [], categories: [], sources: []})

    const onClickNav = (e: React.MouseEvent <HTMLElement>) => {
        e.preventDefault()
        setArticleId(null)

        const category  = e.currentTarget.dataset.href
        if (category) setCategory(category)
    }

    const onArticleClick = (id: number) => {
        console.log(id)
        setArticleId(id)
    }

    React.useEffect(() => {
        // @ts-ignore
        fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId[category] || ''))
            .then(response => response.json())
            .then((resData: NewsAPI) => {
                setArticles(resData)
            })
            .catch(e => console.log(e))
    }, [category])

    return (
        <>
            <header className="header">
                <div className="container">
                    <Navigation
                        placement={'header'}
                        className="header__navigation"
                        onClickNav={onClickNav}
                        currentCategory={category}/>
                </div>
            </header>
            <main className="main">
                {articleId !== null ? <Article /> : <Articles articles={articles} onArticleClick={onArticleClick}/>}
            </main>
            <footer className="footer">
                <div className="container">
                    <Navigation
                        placement='footer'
                        className="footer__navigation"
                        onClickNav={onClickNav}
                        currentCategory={category}/>
                    <div className="footer__column">
                        <p className="footer__text">CopyWrite</p>
                        <p className="footer__copyright">© 2024</p>
                    </div>
                </div>
            </footer>
        </>
    )
}