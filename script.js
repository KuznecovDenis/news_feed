
const categoryName = {
    'index' : 'главная',
    'fashion' : 'Мода',
    'tech' : 'технологии',
    'politics' : 'политика',
    'sport' : 'спорт'
}

const categoryId = {
    'index' : 0,
    'fashion' : 3,
    'tech' : 1,
    'politics' : 4,
    'sport' : 2
}

const Navigation = ({onClickNav, currentCategory, className = ''}) => {
    return (
        <nav className={"navigation grid " + className}>
            <a href="#" className="navigation__logo" onClick={onClickNav} data-href='index'>
                <img className="navigation__image" src="./images/logo.svg" alt="Логотип" />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'tech', 'politics', 'sport'].map(item => (
                    <li className="navigation__item" key={item}>
                        <a
                            onClick={onClickNav}
                            href="#"
                            data-href={item}
                            className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : '' }`}
                        >
                            {categoryName[item]}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const MainArticle = ({image, title, category, description, source}) => {
    return (
        <article className="main-article">
            <div className="main-article__image-container">
                <img className="main-article__image" src={image} alt={title}/>
            </div>
            <div className="main-article__content">
                <span className="article-category main-article__category">
                    {category}
                </span>
                <h2 className="main-article__title">{title}</h2>
                <p className="main-article__text">{description}</p>
                <span className="article-source main-article__source">
                    {source}
                </span>
            </div>
        </article>
    )
}

const SmallArticle = ({title, date, source}) => {
    return (
        <article className="small-article">
            <h2 className="small-article__title">{title}</h2>
            <p className="small-article__caption">
                <span className="article-date small-article__date">
                    {new Date(date).toLocaleDateString('ru-RU', {
                        month: 'long',
                        day: 'numeric'})
                    }
                </span>
                <span className="article-source small-article__source">
                    {source}
                </span>
            </p>
        </article>
    )
}

const App = () => {
    const [category, setCategory] = React.useState('index')
    const [articles, setArticles] = React.useState({ items: [], categories: [], sources: []})

    const onClickNav = (e) => {
        e.preventDefault()
        setCategory(e.currentTarget.dataset.href)
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
                        className="header__navigation"
                        onClickNav={onClickNav}
                        currentCategory={category}/>
                </div>
            </header>

            <main className="main">
                <section className="articles">
                    <div className="container grid">
                        <section className="articles__big-column">
                            {articles.items.slice(0, 3).map(item => {
                                return <MainArticle
                                    key={item.id}
                                    category={articles.categories.find(({id}) => item.category_id === id).name}
                                    source={articles.sources.find(({id}) => item.source_id === id).name}
                                    {...item}
                                />})
                            }
                        </section>

                        <section className="articles__small-column">
                            {articles.items.slice(3, 12).map(item => {
                                return  <SmallArticle
                                    key={item.id}
                                    source={articles.sources.find(({id}) => item.source_id === id).name}
                                    {...item}
                                />})
                            }
                        </section>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <Navigation
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

ReactDOM.render(<App/>, document.getElementById('root'))