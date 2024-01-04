import React, { FC } from 'react';
import './SmallArticle.css';
import { beautifyDate } from '../../utils';

interface Props {
  id: number;
  title: string;
  date: string;
  source: string;
  onArticleClick: (id: number) => void;
}
export const SmallArticle: FC<Props> = ({ id, title, date, source, onArticleClick }) => {
  return (
    <article className="small-article" onClick={() => onArticleClick(id)}>
      <h2 className="small-article__title">{title}</h2>
      <p className="small-article__caption">
        <span className="article-date small-article__date">{beautifyDate(date)}</span>
        <span className="article-source small-article__source">{source}</span>
      </p>
    </article>
  );
};
