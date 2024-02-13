import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { Page } from '../Page/Page';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';
import { PrivetRoute } from '../PrivetRoute/PrivetRoute';
import { LoginContainer } from '../../Features/Auth/Login/LoginContainer';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Page>
              <LoginContainer />
            </Page>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivetRoute>
              <AdminPage>
                <AdminArticles />
              </AdminPage>
            </PrivetRoute>
          }
        />

        <Route
          path="/admin/create"
          element={
            <PrivetRoute>
              <AdminPage>
                <AdminArticleItem />
              </AdminPage>
            </PrivetRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <PrivetRoute>
              <AdminPage>
                <AdminArticleItem />
              </AdminPage>
            </PrivetRoute>
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
