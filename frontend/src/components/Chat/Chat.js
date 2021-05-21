import { useState } from 'react';
import { api } from '../../utils/api';
import './chat.css';

const Chat = ({ users, messages, roomId }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClickSend = () => {
    if (text) {
      api.sendMessage(roomId, text);
    }
    setText('');
  };

  return (
    <section className="chat">
      <h1>Комната {roomId}</h1>
      <div className="chat__wrapper">
        <div className="chat__users">
          <h3 className="chat__users-title">Пользователи</h3>
          {users.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>

        <div className="chat__messages">
          <h3 className="chat__messages-title">Сообщения</h3>
          {messages.map((msg, index) => {
            return (
              <div className="chat__message" key={index + msg}>
                <p className="chat__info">
                  <span className="chat__user_accent">{msg.user}</span>
                  {` написал в ${msg.time} :`}
                </p>
                <p className="chat__text">{msg.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <input type="text" className="chat__input" onChange={handleChange} placeholder="Сообщение" value={text}></input>
      <button className="chat__button" onClick={handleClickSend}>
        Отправить
      </button>
    </section>
  );
};

export default Chat;
