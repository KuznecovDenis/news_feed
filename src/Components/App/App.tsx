import React from 'react';
import './App.css';
import { Articles } from '../Articles/Articles';
import { Navigation } from '../Navigation/Navigation';
import { categoryId } from '../../utils';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { NewsAPI } from '../../types';

export const App = () => {
  const [articleId, setArticleId] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState('index');
  const [articles, setArticles] = React.useState<NewsAPI>({ items: [], categories: [], sources: [] });

  const onClickNav = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setArticleId(null);

    const category = e.currentTarget.dataset.href;
    if (category) setCategory(category);
  };

  const onArticleClick = (id: number) => {
    setArticleId(id);
  };

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId[category] || ''))
      .then((response) => response.json())
      .then((resData: NewsAPI) => {
        setArticles(resData);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [category]);

  return (
    <>
      <header className="header">
        <div className="container">
          <Navigation
            placement={'header'}
            className="header__navigation"
            onClickNav={onClickNav}
            currentCategory={category}
          />
        </div>
      </header>
      <main className="main">
        {articleId !== null ? (
          <ArticleItem
            id={articleId}
            categories={articles.categories}
            sources={articles.sources}
            onArticleClick={onArticleClick}
          />
        ) : (
          <Articles articles={articles} onArticleClick={onArticleClick} />
        )}
      </main>
      <footer className="footer">
        <div className="container">
          <Navigation
            placement="footer"
            className="footer__navigation"
            onClickNav={onClickNav}
            currentCategory={category}
          />
          <div className="footer__column">
            <p className="footer__text">CopyWrite</p>
            <p className="footer__copyright">© 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};
