import React, { FC, HTMLAttributes, RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import throttle from 'lodash.throttle';
import './Dropdown.css';
import classNames from 'classnames';

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

const calcCoords = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();

  return {
    top: window.scrollY + rect.bottom + 12,
    right: window.innerWidth - rect.right - window.scrollX,
  };
};

export const Droprown: FC<DropdownProps> = ({
  targetRef,
  shown,
  onShownChange,
  children,
  style,
  className,
  ...restProps
}: DropdownProps) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  useEffect(() => {
    setCoords(calcCoords(targetRef.current as HTMLElement));
  }, []);

  useEffect(() => {
    onShownChange(shown);
  }, [shown, onShownChange]);

  useEffect(() => {
    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }, 100);

    if (shown) {
      window.addEventListener('resize', windowResizeListener);
    }
    return () => {
      window.removeEventListener('resize', windowResizeListener);
    };
  }, [onShownChange, shown]);

  return shown
    ? createPortal(
        <div {...restProps} className={classNames('dropdown', className)} style={{ ...style, ...coords }}>
          {children}
        </div>,
        document.getElementById('overlay') as HTMLElement,
      )
    : null;
};
