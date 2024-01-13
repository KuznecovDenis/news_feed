import React, { FC } from 'react';
import './Navigation.css';
import { categoryName } from '../../utils';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';

interface Props {
  className?: string;
  placement: 'header' | 'footer';
}

const activeClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navigation__link navigation__link--active' : 'navigation__link';

export const Navigation: FC<Props> = ({ className = '', placement = 'header' }) => {
  return (
    <nav className={`navigation grid navigation--${placement} ${className}`}>
      <Link to={'/'} className="navigation__logo">
        <img className="navigation__image" src={logo} alt="Логотип" />
      </Link>
      <ul className="navigation__list">
        {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => (
          <li className="navigation__item" key={item}>
            <NavLink to={item === 'index' ? '/' : `/${item}`} className={activeClassName}>
              {categoryName[item]}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
