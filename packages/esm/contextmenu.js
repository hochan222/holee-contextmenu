import React, { useState, useCallback, useEffect } from 'react';
import './contextmenu.css';
var useContextMenu = function (outerRef) {
    var _a = useState('0px'), xPos = _a[0], setXPos = _a[1];
    var _b = useState('0px'), yPos = _b[0], setYPos = _b[1];
    var _c = useState(false), menu = _c[0], showMenu = _c[1];
    var handleContextMenu = useCallback(function (event) {
        setXPos(event.pageX + "px");
        setYPos(event.pageY + "px");
        if (outerRef.current.getBoundingClientRect().top <= event.pageY &&
            outerRef.current.getBoundingClientRect().bottom >= event.pageY &&
            outerRef.current.getBoundingClientRect().left <= event.pageX &&
            outerRef.current.getBoundingClientRect().right >= event.pageX) {
            event.preventDefault();
            showMenu(true);
        }
        else {
            showMenu(false);
        }
    }, [showMenu, outerRef, setXPos, setYPos]);
    var handleClick = useCallback(function () {
        showMenu(false);
    }, [showMenu]);
    useEffect(function () {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);
        return function () {
            document.addEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    });
    return { xPos: xPos, yPos: yPos, menu: menu, showMenu: showMenu };
};
export var ContextMenu = function (_a) {
    var outerRef = _a.outerRef, menuOnClick = _a.menuOnClick, children = _a.children;
    var _b = useContextMenu(outerRef), xPos = _b.xPos, yPos = _b.yPos, menu = _b.menu, showMenu = _b.showMenu;
    var menuOnClickHandler = function (e) {
        e.stopPropagation();
        menuOnClick(e);
        showMenu(false);
    };
    var menuOnKeyDownHandler = function (e) {
        e.stopPropagation();
        menuOnClick(e);
        showMenu(false);
    };
    if (menu) {
        return (React.createElement("ul", { className: "holee-menu", style: { top: yPos, left: xPos }, onClick: function (e) { return menuOnClickHandler(e); }, onKeyDown: function (e) { return menuOnKeyDownHandler(e); }, role: "menu" }, children));
    }
    return null;
};
