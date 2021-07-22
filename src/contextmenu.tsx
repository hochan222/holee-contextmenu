import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import './contextmenu.css';

export interface ContextMenuProps {
  className?: string;
  outerRef: React.RefObject<HTMLDivElement>;
  menuOnClick: (event: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => void;
  children: ReactNode;
}

const findOutOfViewportPosition = (rightPosition: number, bottomPosition: number): string => {
  if (window.innerWidth <= rightPosition && window.innerHeight <= bottomPosition) {
    return 'diagonal';
  } else if (window.innerWidth <= rightPosition) {
    return 'right';
  } else if (window.innerHeight <= bottomPosition) {
    return 'bottom';
  }
  return '';
};

const $ = (selector: string) => document.querySelector(selector);

const useContextMenu = (outerRef: React.RefObject<HTMLDivElement>) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      if (
        outerRef.current!.getBoundingClientRect().top <= event.pageY &&
        outerRef.current!.getBoundingClientRect().bottom >= event.pageY &&
        outerRef.current!.getBoundingClientRect().left <= event.pageX &&
        outerRef.current!.getBoundingClientRect().right >= event.pageX
      ) {
        event.preventDefault();
        showMenu(true);
        const ulBoundingClientRect = $('.holee-menu')?.getBoundingClientRect();
        if (ulBoundingClientRect) {
          const position = findOutOfViewportPosition(ulBoundingClientRect.right, ulBoundingClientRect?.bottom);
          console.log(position);
          if (position === 'diagonal') {
            setXPos(`100px`);
            setYPos(`${event.pageY}px`);
          } else if (position === 'right') {
            setXPos(`100px`);
            setYPos(`${event.pageY}px`);
          } else if (position === 'bottom') {
            setXPos(`100px`);
            setYPos(`${event.pageY}px`);
          } else {
            setXPos(`${event.pageX}px`);
            setYPos(`${event.pageY}px`);
          }
        }
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.addEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { xPos, yPos, menu, showMenu };
};

export const ContextMenu = ({ className, outerRef, menuOnClick, children }: ContextMenuProps) => {
  const { xPos, yPos, menu, showMenu } = useContextMenu(outerRef);

  const menuOnClickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    menuOnClick(e);
    showMenu(false);
  };

  const menuOnKeyDownHandler = (e: React.KeyboardEvent<HTMLUListElement>) => {
    e.stopPropagation();
    menuOnClick(e);
    showMenu(false);
  };

  if (menu) {
    return (
      <ul
        className={'holee-menu' + (className ? ` ${className}` : '')}
        style={{ top: yPos, left: xPos }}
        onClick={(e) => menuOnClickHandler(e)}
        onKeyDown={(e) => menuOnKeyDownHandler(e)}
        role="menu"
      >
        {children}
      </ul>
    );
  }
  return null;
};
