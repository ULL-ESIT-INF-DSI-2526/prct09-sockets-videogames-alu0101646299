import net from 'net';
import { GameCollection } from './gameCollection.js';
import { Videogame } from './videogame.js';

export type RequestType = {
  user: string;
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  videogame?: Videogame;
  id?: number;
}

export type ResponseType = {
  success: boolean;
  message?: string;
  videogames?: Videogame[];
}

const server = net.createServer((connection) => {
  console.log('A client has connected.');

  connection.on('data', (dataJSON) => {
    const message: RequestType = JSON.parse(dataJSON.toString());
    const userGameCollection = new GameCollection(message.user);

    if (message.type === 'add') {
      userGameCollection.addGame(message.videogame as Videogame, (err, result) => {
        const response: ResponseType = { success: err, message: result as string};
        connection.write(JSON.stringify(response));
        connection.end();
      }); 
    } else if (message.type === 'update') {
      userGameCollection.updateGame(message.videogame as Videogame, (err, result) => {
        const response: ResponseType = { success: err, message: result as string};
        connection.write(JSON.stringify(response));
        connection.end();
      });
    } else if (message.type === 'remove') {
      userGameCollection.removeGame(message.id as number, (err, result) => {
        const response: ResponseType = { success: err, message: result as string};
        connection.write(JSON.stringify(response));
        connection.end();
      });
    } else if (message.type === 'read') {
      userGameCollection.readGame(message.id as number, (err, result) => {
        if (!err) {
          const response: ResponseType = { success: err, message: result as string};
          connection.write(JSON.stringify(response));
        } else {
          const response: ResponseType = { success: err, videogames: result as Videogame[]};
          connection.write(JSON.stringify(response));
        }
        connection.end();
      });
    } else {
      userGameCollection.listGames(message.user, (err, result) => {
        if (!err) {
          const response: ResponseType = { success: err, message: result as string};
          connection.write(JSON.stringify(response));
        } else {
          const response: ResponseType = { success: err, videogames: result as Videogame[]};
          connection.write(JSON.stringify(response));
        }
        connection.end();
      });
    }
  });

  connection.on('close', () => {
    console.log('A client has disconnected');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});