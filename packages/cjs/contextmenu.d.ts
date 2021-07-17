import React, { ReactNode } from 'react';
import './contextmenu.css';
export declare const Menu: ({ outerRef, menuOnClick, children, }: {
    outerRef: React.RefObject<HTMLDivElement>;
    menuOnClick: (event: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => void;
    children: ReactNode;
}) => JSX.Element | null;
