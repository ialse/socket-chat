import socket from './socket';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    if (Api.instanse) {
      return Api.instanse;
    }
    return (Api.instanse = this);
  }

  subscribeMessages(updateMessages) {
    socket.on('NEW_MESSAGE', updateMessages);
  }

  subscribeUsers(updateUsers) {
    socket.on('USERS', updateUsers);
  }

  sendMessage(roomId, text) {
    socket.emit('NEW_MESSAGE', { roomId, text });
  }

  joinChat(room, user) {
    socket.emit('JOIN', { roomId: room, userName: user });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
