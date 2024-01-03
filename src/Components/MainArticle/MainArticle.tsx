import React, {FC} from "react";
import './MainArticle.css';

interface Props {
    id: number;
    title: string;
    image: string;
    category: string;
    description: string;
    source: string;
    onArticleClick: (id:number) => void
}

export const MainArticle: FC<Props> = ({id, image, title, category, description, source, onArticleClick}) => {
    return (
        <article className="main-article" onClick={() => onArticleClick(id)}>
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