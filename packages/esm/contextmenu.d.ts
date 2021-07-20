import React, { ReactNode } from 'react';
import './contextmenu.css';
export interface ContextMenuProps {
    outerRef: React.RefObject<HTMLDivElement>;
    menuOnClick: (event: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => void;
    children: ReactNode;
}
export declare const ContextMenu: ({ outerRef, menuOnClick, children }: ContextMenuProps) => JSX.Element | null;
