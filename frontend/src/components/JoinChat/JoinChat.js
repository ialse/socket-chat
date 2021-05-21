import { useState } from 'react';
import './joinChat.css';

const JoinChat = ({ onChat }) => {
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');

  const handleClick = () => {
    onChat(room, user);
  };

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  return (
    <form className="form">
      <input
        type="text"
        className="form__input"
        onChange={handleChangeUser}
        placeholder="Ваше имя"
        value={user}
      ></input>
      <input type="text" className="form__input" onChange={handleChangeRoom} placeholder="Комната" value={room}></input>
      <button className="form__button" onClick={handleClick}>
        Войти
      </button>
    </form>
  );
};

export default JoinChat;
