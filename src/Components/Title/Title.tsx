import React, { ElementType, FC } from 'react';
import classNames from 'classnames';
import './Title.css';

interface TitleProps {
  Component?: ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Title: FC<TitleProps> = ({ Component = 'h1', children, className }) => {
  return <Component className={classNames('Title', className)}>{children}</Component>;
};
