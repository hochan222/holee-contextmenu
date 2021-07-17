import React, { useRef } from 'react';
import { Menu } from 'typescript-react-test';
import './App.css';

function App() {
  const outerRef = useRef<HTMLDivElement>(null);

  const menuOnClickHandler = (e: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      console.log(eventTarget.dataset.option);
    }
  };

  return (
    <div className="App">
      hi
      <Menu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
        <li data-option="profile">프로필 보기</li>
        <li data-option="send-message">메세지 보내기</li>
        <li data-option="add-friend">친구추가 요청</li>
        <li data-option="game-pong">핑퐁게임 요청</li>
        <li data-option="register-admin">관리자 임명(해임)</li>
        <li data-option="block">차단(차단 해제)하기</li>
        <li data-option="mute">음소거</li>
        <li data-option="forced-out">강제퇴장</li>
      </Menu>
      <div ref={outerRef} className="red-box"></div>
    </div>
  );
}

export default App;
