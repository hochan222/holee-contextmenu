import React, { useState, useCallback, useEffect } from 'react';
import './contextmenu.css';
var findOutOfViewportPosition = function (rightPosition, bottomPosition) {
    if (window.innerWidth <= rightPosition && window.innerHeight <= bottomPosition) {
        return 'diagonal';
    }
    else if (window.innerWidth <= rightPosition) {
        return 'right';
    }
    else if (window.innerHeight <= bottomPosition) {
        return 'bottom';
    }
    return '';
};
var $ = function (selector) { return document.querySelector(selector); };
var useContextMenu = function (outerRef) {
    var _a = useState('0px'), xPos = _a[0], setXPos = _a[1];
    var _b = useState('0px'), yPos = _b[0], setYPos = _b[1];
    var _c = useState(false), menu = _c[0], showMenu = _c[1];
    var handleContextMenu = useCallback(function (event) {
        var _a;
        setXPos(event.pageX + "px");
        setYPos(event.pageY + "px");
        if (outerRef.current.getBoundingClientRect().top <= event.pageY &&
            outerRef.current.getBoundingClientRect().bottom >= event.pageY &&
            outerRef.current.getBoundingClientRect().left <= event.pageX &&
            outerRef.current.getBoundingClientRect().right >= event.pageX) {
            event.preventDefault();
            showMenu(true);
            var ulBoundingClientRect = (_a = $('.holee-menu')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (ulBoundingClientRect) {
                var position = findOutOfViewportPosition(ulBoundingClientRect.right, ulBoundingClientRect === null || ulBoundingClientRect === void 0 ? void 0 : ulBoundingClientRect.bottom);
                var ulWidth = ulBoundingClientRect.right - ulBoundingClientRect.left;
                var ulHeight = ulBoundingClientRect.bottom - ulBoundingClientRect.top;
                console.log(position);
                console.log('page', event.pageX, event.pageY);
                console.log('ul', ulWidth, ulHeight);
                if (position === 'diagonal') {
                    setXPos(event.pageX - ulWidth + "px");
                    setYPos(event.pageY - ulHeight + "px");
                }
                else if (position === 'right') {
                    setXPos(event.pageX - ulWidth + "px");
                    setYPos(event.pageY + "px");
                }
                else if (position === 'bottom') {
                    setXPos(event.pageX + "px");
                    setYPos(event.pageY - ulHeight + "px");
                }
                else {
                    setXPos(event.pageX + "px");
                    setYPos(event.pageY + "px");
                }
            }
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
    var className = _a.className, outerRef = _a.outerRef, menuOnClick = _a.menuOnClick, children = _a.children;
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
        return (React.createElement("ul", { className: 'holee-menu' + (className ? " " + className : ''), style: { top: yPos, left: xPos }, onClick: function (e) { return menuOnClickHandler(e); }, onKeyDown: function (e) { return menuOnKeyDownHandler(e); }, role: "menu" }, children));
    }
    return null;
};
