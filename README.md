# holee contextmenu

## How to use?

```javascript
import React, { useRef, useState } from 'react';
import { Menu } from 'typescript-react-test';
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

      <Menu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
        <li data-option="profile">profile</li>
        <li data-option="send-message">send message</li>
        <li data-option="add-friend">add friend</li>
        <li data-option="play-game">play game</li>
        <li data-option="register-admin">register admin(dismissal)</li>
        <li data-option="block">block(unblock)</li>
        <li data-option="mute">mute(unmute)</li>
        <li data-option="forced-out">forced out</li>
      </Menu>
      <div ref={outerRef} className="red-box"></div>

      <p>
        <strong>eventTarget.dataset.option: </strong> {option}
      </p>
    </div>
  );
}

export default App;
```
