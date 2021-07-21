import React, { ReactNode } from 'react';
import './contextmenu.css';
export interface ContextMenuProps {
    className?: string;
    outerRef: React.RefObject<HTMLDivElement>;
    menuOnClick: (event: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => void;
    children: ReactNode;
}
export declare const ContextMenu: ({ className, outerRef, menuOnClick, children }: ContextMenuProps) => JSX.Element | null;
