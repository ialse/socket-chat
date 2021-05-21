import { useState } from 'react';

import './app.css';
import { api } from '../../utils/api';
import Chat from '../Chat/Chat';
import JoinChat from '../JoinChat/JoinChat';

function App() {
  const [join, setJoin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomId, setRoomId] = useState('');

  // get users from server
  const updateUsers = (data) => {
    setRoomId(data.roomId);
    setUsers(data.users);
    setMessages(data.messages);
  };

  // get messages from server
  const updateMessages = (messages) => {
    setMessages(messages);
  };

  // join to chat and subscribe users and messages
  const onChat = (room, user) => {
    api.joinChat(room, user);
    api.subscribeUsers(updateUsers);
    api.subscribeMessages(updateMessages);
    setJoin(true);
  };

  return (
    <div className="page">
      {join ? <Chat users={users} messages={messages} roomId={roomId} /> : <JoinChat onChat={onChat} />}
    </div>
  );
}

export default App;
