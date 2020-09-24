import io from 'socket.io-client';

const socketMiddleware = () => {
  console.log('SOCKET MIDDLEWARE')
  let socket: SocketIOClient.Socket;

  // @ts-ignore
  return (store) => (next) => (action) => {
    console.log('SOCKET MIDDLEWARE, STORE:', store)
    console.log('SOCKET MIDDLEWARE, ACTION:', action)
    switch (action.type) {
      case 'name/updateName': {
        // We know that the user will join the chat at this point -> open a socket.
        console.log('SOCKET MIDDLEWARE, CASE updateName')
        socket = io();

        console.log('CLIENT SOCKET:', socket)
        const username: string = action.payload;
        socket.emit('joinRoom', { username });
        break;
      }
      // case 'name/newMsg': {
      //   console.log('SOCKET MIDDLEWARE, CASE newMsg')

      //   socket.emit('newMsg', action.payload.message)
      // }
      // case 'name/disconnect': {
      //   console.log('SOCKET MIDDLEWARE, CASE disconnect')

      //   socket.emit('disconnect') // When the user presses on the "leave chat" button.
      // }
    }
    return next(action);
  }
};

export default socketMiddleware();
