import React, {FC} from "react";
import './Navigation.css';
import {categoryName} from "../../utils";
import logo from '../../images/logo.svg'

interface Props {
    currentCategory: string,
    className?: string,
    placement: 'header' | 'footer'
    onClickNav: (e: React.MouseEvent<HTMLElement>) => void
}

export const Navigation: FC<Props> = ({onClickNav, currentCategory, className = '', placement = 'header'}) => {
    return (
        <nav className={`navigation grid navigation--${placement} ${className}`}>
            <a href="#" className="navigation__logo" onClick={onClickNav} data-href='index'>
                <img className="navigation__image" src={logo} alt="Логотип" />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'tech', 'politics', 'sport'].map(item => (
                    <li className="navigation__item" key={item}>
                        <a
                            onClick={onClickNav}
                            href="#"
                            data-href={item}
                            className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : '' }`}
                        >
                            {/*@ts-ignore*/}
                            {categoryName[item]}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}