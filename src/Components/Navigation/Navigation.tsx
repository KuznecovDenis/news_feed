import React, { FC } from 'react';
import './Navigation.css';
import { categoryTitles } from '../../utils';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  className?: string;
}

interface NavigationItemProps {
  title?: string;
  name?: string;
}

const activeClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navigation__link--active navigation__link' : 'navigation__link';

const NavigationItem: FC<NavigationItemProps> = ({ title, name = '' }) => {
  return (
    <li className="navigation__item" key={name}>
      <NavLink to={`/${name}`} className={activeClassName}>
        {title}
      </NavLink>
    </li>
  );
};

export const Navigation: FC<Props> = ({ className = '' }) => {
  return (
    <nav className={classNames('navigation', className)}>
      <ul className="navigation__list">
        {Object.entries(categoryTitles).map(([name, title]) => {
          return <NavigationItem key={name} name={name} title={title} />;
        })}
      </ul>
    </nav>
  );
};
