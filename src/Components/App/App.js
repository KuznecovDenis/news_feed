import React from "react";
import './App.css'
import {Articles} from "../Articles/Articles.js";
import {Navigation} from "../Navigation/Navigation.js";
import {categoryId} from "../../utils.js";
import {Article} from "../Article/Article";

export const App = () => {
    const [articleId, setArticleId] = React.useState(null)
    const [category, setCategory] = React.useState('index')
    const [articles, setArticles] = React.useState({ items: [], categories: [], sources: []})

    const onClickNav = (e) => {
        e.preventDefault()
        setCategory(e.currentTarget.dataset.href)
        setArticleId(null)
    }

    const onArticleClick = (id) => {
        console.log(id)
        setArticleId(id)
    }

    React.useEffect(() => {
        fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId[category] || ''))
            .then(response => response.json())
            .then(resData => {
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