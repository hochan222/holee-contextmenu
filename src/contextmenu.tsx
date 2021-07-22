import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import './contextmenu.css';

export interface ContextMenuProps {
  className?: string;
  outerRef: React.RefObject<HTMLDivElement>;
  menuOnClick: (event: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => void;
  children: ReactNode;
}

/*
 ** The function was created expecting to be used for ul,
 ** and always expects to have a value of DOMRect.
 */
const findOutOfViewportPosition = (elementRef: React.RefObject<HTMLUListElement>): string => {
  const clientRect = elementRef.current?.getBoundingClientRect() as DOMRect;
  if (!clientRect) {
    return '';
  }
  if (window.innerWidth <= clientRect.right) {
    return 'right';
  } else if (window.innerHeight <= clientRect.bottom) {
    return 'bottom';
  }
  return '';
};

const useContextMenu = (outerRef: React.RefObject<HTMLDivElement>, ulRef: React.RefObject<HTMLUListElement>) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      console.log(findOutOfViewportPosition(ulRef));
      if (findOutOfViewportPosition(ulRef) === 'right') {
        setXPos(`100px`);
      } else {
        setXPos(`${event.pageX}px`);
      }
      setYPos(`${event.pageY}px`);
      if (
        outerRef.current!.getBoundingClientRect().top <= event.pageY &&
        outerRef.current!.getBoundingClientRect().bottom >= event.pageY &&
        outerRef.current!.getBoundingClientRect().left <= event.pageX &&
        outerRef.current!.getBoundingClientRect().right >= event.pageX
      ) {
        event.preventDefault();
        showMenu(true);
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
  const ulRef = React.useRef<HTMLUListElement>(null);
  const { xPos, yPos, menu, showMenu } = useContextMenu(outerRef, ulRef);

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
        ref={ulRef}
      >
        {children}
      </ul>
    );
  }
  return null;
};
