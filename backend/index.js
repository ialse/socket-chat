const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const moment = require('moment');

const { PORT = 3000 } = process.env;

/* database structure
const rooms = {
  roomId: {
    roomId: roomId,
    users: [{name, socket.id}, ...],
    messages: [{user, text, time }, ...]
  }
};
*/
const rooms = {};

app.use(cors());
app.use(express.json());

// create listener events
io.on('connection', (socket) => {
  socket.on('JOIN', ({ roomId, userName }) => {
    const newUser = { id: socket.id, userName };

    // if room is, then add new user in users current rooms, else create new room and add user
    if (roomId in rooms) {
      rooms[roomId] = {
        roomId,
        users: [...rooms[roomId].users, newUser],
        messages: [...rooms[roomId].messages],
      };
    } else {
      rooms[roomId] = {
        roomId,
        users: [newUser],
        messages: [],
      };
    }

    socket.join(roomId);
    // choise only userName (no id needed )
    const users = rooms[roomId].users.map((item) => item.userName);
    const messages = rooms[roomId].messages;
    socket.nsp.in(roomId).emit('USERS', { users, roomId, messages });
  });

  socket.on('NEW_MESSAGE', ({ roomId, text }) => {
    const time = moment().format('HH:mm:ss');
    const user = rooms[roomId].users.filter((item) => item.id === socket.id)[0].userName;
    const message = {
      user,
      text,
      time,
    };
    rooms[roomId].messages.push(message);
    const messages = rooms[roomId].messages;
    socket.nsp.in(roomId).emit('NEW_MESSAGE', messages);
  });

  socket.on('disconnect', () => {
    let roomId = '';

    // definition roomId
    for (key in rooms) {
      rooms[key].users.forEach((user) => {
        if (user.id === socket.id) {
          roomId = rooms[key].roomId;
        }
      });
    }

    rooms[roomId].users = rooms[roomId].users.filter((item) => item.id !== socket.id);
    const users = rooms[roomId].users.map((item) => item.userName);
    const messages = rooms[roomId].messages;
    socket.nsp.in(roomId).emit('USERS', { users, roomId, messages });
  });
});

server.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Сервер работает. Порт: ${PORT}`);
});
