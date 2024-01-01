import {categoryName} from "./utils.js";

export const Navigation = ({onClickNav, currentCategory, className = '', placement = 'header'}) => {
    return (
        <nav className={`navigation grid navigation--${placement} ${className}`}>
            <a href="#" className="navigation__logo" onClick={onClickNav} data-href='index'>
                <img className="navigation__image" src="../images/logo.svg" alt="Логотип" />
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
                            {categoryName[item]}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}