import React, { FC } from 'react';
import './CategoryPage.css';
import { Article, CategoryNames, NewsAPI } from '../../types';
import { useParams } from 'react-router-dom';
import { categoryIds, categoryTitles } from '../../utils';
import { SidebarArticleCard } from '../SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import noPhotoPicture from '../../images/no-photo.svg';

export const CategoryPage: FC = () => {
  const { category }: { category?: CategoryNames } = useParams();
  const [articles, setArticles] = React.useState<NewsAPI>({
    items: [],
    categories: [],
    sources: [],
  });

  const categoryId = categoryIds[category!];

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryId || '')
      .then((response) => response.json())
      .then((response: NewsAPI) => {
        setArticles(response);
      });
  }, [category]);

  return (
    <section className="category-page">
      <Hero title={categoryTitles[category!] || undefined} image={noPhotoPicture} className="category-page__hero" />
      <div className="container grid">
        <section className="category-page__content">
          {articles.items.slice(3).map((item: Article) => {
            const category = articles.categories.find(({ id }) => item.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);

            return (
              <ArticleCard
                className="category-page__item"
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name}
                source={source?.name}
              />
            );
          })}
        </section>
        <section className="category-page__sidebar">
          {articles.items.slice(0, 3).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <SidebarArticleCard
                className="category-page__sidebar-item"
                image={item.image || noPhotoPicture}
                key={item.id}
                id={item.id}
                title={item.title}
                source={source?.name}
                date={item.date}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
