import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { Page } from '../Page/Page';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminPage>
              <AdminArticles />
            </AdminPage>
          }
        />

        <Route
          path="/admin/create"
          element={
            <AdminPage>
              <AdminArticleItem />
            </AdminPage>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <AdminPage>
              <AdminArticleItem />
            </AdminPage>
          }
        />

        <Route
          path="/"
          element={
            <Page>
              <Articles />
            </Page>
          }
        />

        <Route
          path="/:categories"
          element={
            <Page>
              <Articles />
            </Page>
          }
        />

        <Route
          path="/article/:id"
          element={
            <Page>
              <ArticleItem />
            </Page>
          }
        />
      </Routes>
    </>
  );
};
