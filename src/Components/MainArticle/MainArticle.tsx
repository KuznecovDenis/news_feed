import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './MainArticle.css';
import noPhotoPicture from '../../images/no-photo.svg';

interface Props {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  source: string;
}

export const MainArticle: FC<Props> = ({ id, image, title, category, description, source }) => {
  return (
    <Link to={`/article/${id}`} className={'main-article'}>
      <article className="main-article__container">
        <div className="main-article__image-container">
          <img className="main-article__image" src={image.trim() || noPhotoPicture} alt={title} />
        </div>
        <div className="main-article__content">
          <span className="article-category main-article__category">{category}</span>
          <h2 className="main-article__title">{title}</h2>
          <p className="main-article__text">{description}</p>
          <span className="article-source main-article__source">{source}</span>
        </div>
      </article>
    </Link>
  );
};
