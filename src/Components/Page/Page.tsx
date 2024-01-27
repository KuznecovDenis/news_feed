import React, { FC } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';

interface Props {
  children: React.ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <Navigation placement={'header'} className="header__navigation" />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__column">
            <p className="footer__text">CopyWrite</p>
            <p className="footer__copyright">© 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};
