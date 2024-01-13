import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Articles } from '../Articles/Articles';
import { Navigation } from '../Navigation/Navigation';
import { ArticleItem } from '../ArticleItem/ArticleItem';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="container">
          <Navigation placement={'header'} className="header__navigation" />
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Articles />} />

          <Route path="/:categories" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleItem />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__column">
            <p className="footer__text">CopyWrite</p>
            <p className="footer__copyright">© 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};
