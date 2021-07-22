import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import './contextmenu.css';

export interface ContextMenuProps {
  className?: string;
  outerRef: React.RefObject<HTMLDivElement>;
  menuOnClick: (event: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => void;
  children: ReactNode;
}

const useContextMenu = (outerRef: React.RefObject<HTMLDivElement>) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      setXPos(`${event.pageX}px`);
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

/*
 ** The function was created expecting to be used for ul,
 ** and always expects to have a value of DOMRect.
 */
const findOutOfViewportPosition = (elementRef: React.RefObject<HTMLUListElement>): string => {
  const clientRect = elementRef.current?.getBoundingClientRect() as DOMRect;
  if (window.innerWidth <= clientRect.right) {
    return 'right';
  } else if (window.innerHeight <= clientRect.bottom) {
    return 'bottom';
  }
  return '';
};

export const ContextMenu = ({ className, outerRef, menuOnClick, children }: ContextMenuProps) => {
  const { xPos, yPos, menu, showMenu } = useContextMenu(outerRef);
  const ulElement = React.useRef<HTMLUListElement>(null);
  const [checkViewport, setCheckViewport] = useState<string>('');

  const menuOnClickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    if (findOutOfViewportPosition(ulElement) === 'right') {
      setCheckViewport('right');
    } else {
      setCheckViewport('');
    }
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
        style={{ top: yPos, left: checkViewport === 'right' ? '100px' : xPos }}
        onClick={(e) => menuOnClickHandler(e)}
        onKeyDown={(e) => menuOnKeyDownHandler(e)}
        role="menu"
        ref={ulElement}
      >
        {children}
      </ul>
    );
  }
  return null;
};
