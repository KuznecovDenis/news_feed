import React, { FC } from 'react';
import './Articles.css';
import { MainArticle } from '../MainArticle/MainArticle';
import { SmallArticle } from '../SmallArticle/SmallArticle';
import { NewsAPI } from '../../types';

interface Props {
  articles: NewsAPI;
  onArticleClick: (id: number) => void;
}

export const Articles: FC<Props> = ({ articles, onArticleClick }) => {
  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles.categories.find(({ id }) => item.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);

            return (
              <MainArticle
                onArticleClick={onArticleClick}
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

            return <SmallArticle onArticleClick={onArticleClick} key={item.id} source={source?.name || ''} {...item} />;
          })}
        </section>
      </div>
    </section>
  );
};
