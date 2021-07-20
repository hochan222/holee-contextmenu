<h1 align="middle">holee-contextmenu</h1>

<h3 align="middle">Simple react contextmenu (Typescript support)</h3>

![React](https://img.shields.io/badge/React-282c34?logo=React) ![Typescript](https://img.shields.io/badge/Typescript-white?logo=Typescript) [![npm version](https://img.shields.io/npm/v/holee-contextmenu?style=flat-square)](https://www.npmjs.com/package/holee-contextmenu) [![npm license](https://img.shields.io/npm/l/holee-contextmenu?style=flat-square)](https://github.com/hochan222/holee-contextmenu/blob/master/LICENSE) [![npm bundle size](https://img.shields.io/bundlephobia/min/holee-contextmenu?style=flat-square)](https://bundlephobia.com/result?p=holee-contextmenu) [![dependencies](https://img.shields.io/david/hochan222/holee-contextmenu?style=flat-square)](https://david-dm.org/nfinished/react-tiny-contextmenu)

<!-- [![maintainability](https://img.shields.io/codeclimate/maintainability/hochan222/holee-contextmenu?style=flat-square)](https://codeclimate.com/github/hochan222/holee-contextmenu)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/hochan222/holee-contextmenu?style=flat-square)](https://codeclimate.com/github/hochan222/holee-contextmenu) -->

<!-- ![requires react >=16.8](https://img.shields.io/npm/dependency-version/holee-contextmenu/peer/react?style=flat-square) -->

<img align="middle" src="https://user-images.githubusercontent.com/22424891/126034890-25346bc1-e75b-4569-b0a8-c561b3781cda.gif" height="300px" />

## Installing holee-contextmenu

```sh
$ yarn add holee-contextmenu

# or

$ npm i holee-contextmenu
```

## Usage

1. Create a useref.

```javascript
const outerRef = useRef < HTMLDivElement > null;
```

2. Designate as ref to the div tag you want to apply the context menu to.

```javascript
<div ref={outerRef} className="red-box"></div>
```

3. Import the menu and create a menu above the div tag.

```javascript
import { ContextMenu } from 'holee-contextmenu';
```

```javascript
<ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHand(e)}>
</ContextMenu>
<div ref={outerRef} className="red-box"></div>
```

4. A menu list of contextmenu can be created by passing the li tag as children in the menu. (A `data-option` must be specified.)

```javascript
<ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHand(e)}>
  <li data-option="profile">profile</li>
  <li data-option="send-message">send message</li>
  <li data-option="add-friend">add friend</li>
  <li data-option="play-game">play game</li>
  <li data-option="register-admin">register admin(dismissal)</li>
  <li data-option="block">block(unblock)</li>
  <li data-option="mute">mute(unmute)</li>
  <li data-option="forced-out">forced out</li>
</ContextMenu>
<div ref={outerRef} className="red-box"></div>
```

5. `menuOnClickHandler` defines an onclick function that is executed when the list is clicked.

```javascript
  const menuOnClickHandler = (e: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      setOption(() => eventTarget.dataset.option);
    }
  };
```

6. Below is the final code, please refer to the [example code](./example) for details.

```javascript
import React, { useRef, useState } from 'react';
import { ContextMenu } from 'holee-contextmenu';
import './App.css';

function App() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState<string | undefined>('null');

  const menuOnClickHandler = (e: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      setOption(() => eventTarget.dataset.option);
    }
  };

  return (
    <div className="App">
      <h2>holee-context-menu</h2>
      <p>⬇️ Click right mouse inside the red box ⬇️</p>

      <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
        <li data-option="profile">profile</li>
        <li data-option="send-message">send message</li>
        <li data-option="add-friend">add friend</li>
        <li data-option="play-game">play game</li>
        <li data-option="register-admin">register admin(dismissal)</li>
        <li data-option="block">block(unblock)</li>
        <li data-option="mute">mute(unmute)</li>
        <li data-option="forced-out">forced out</li>
      </ContextMenu>
      <div ref={outerRef} className="red-box"></div>

      <p>
        <strong>eventTarget.dataset.option: </strong> {option}
      </p>
    </div>
  );
}

export default App;
```
