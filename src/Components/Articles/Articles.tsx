import React from 'react';
import './Articles.css';
import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';
import { NewsAPI } from '../../types';
import { categoryId } from '../../utils';
import { useParams } from 'react-router-dom';

export const Articles = () => {
  const { categories = 'index' }: { categories?: string | undefined } = useParams();
  const [articles, setArticles] = React.useState<NewsAPI>({
    items: [],
    categories: [],
    sources: [],
  });

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId[categories] || ''))
      .then((response) => response.json())
      .then((resData: NewsAPI) => {
        setArticles(resData);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [categories]);

  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles.categories.find(({ id }) => item.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);

            return (
              <MainArticle
                key={item.id}
                category={category ? category.name : ''}
                source={source?.name || ''}
                {...item}
              />
            );
          })}
        </section>

        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id);

            return <SmallArticle key={item.id} source={source?.name || ''} {...item} />;
          })}
        </section>
      </div>
    </section>
  );
};
