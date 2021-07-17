"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var react_1 = __importStar(require("react"));
require("./contextmenu.css");
var useContextMenu = function (outerRef) {
    var _a = react_1.useState('0px'), xPos = _a[0], setXPos = _a[1];
    var _b = react_1.useState('0px'), yPos = _b[0], setYPos = _b[1];
    var _c = react_1.useState(false), menu = _c[0], showMenu = _c[1];
    var handleContextMenu = react_1.useCallback(function (event) {
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
    var handleClick = react_1.useCallback(function () {
        showMenu(false);
    }, [showMenu]);
    react_1.useEffect(function () {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);
        return function () {
            document.addEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    });
    return { xPos: xPos, yPos: yPos, menu: menu, showMenu: showMenu };
};
var Menu = function (_a) {
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
        return (react_1.default.createElement("ul", { className: "holee-menu", style: { top: yPos, left: xPos }, onClick: function (e) { return menuOnClickHandler(e); }, onKeyDown: function (e) { return menuOnKeyDownHandler(e); }, role: "menu" }, children));
    }
    return null;
};
exports.Menu = Menu;
