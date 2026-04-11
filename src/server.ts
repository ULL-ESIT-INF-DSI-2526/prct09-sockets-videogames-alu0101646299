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

  let requestData: string = '';
  connection.on('data', (chunk) => {
    requestData += chunk.toString();
  });

  connection.on('end', () => {
    const message: RequestType = JSON.parse(requestData);
    const userGameCollection = new GameCollection(message.user);

    if (message.type === 'add') {
      userGameCollection.addGame(message.videogame as Videogame, (success, result) => {
        const response: ResponseType = { success: success, message: result as string};
        connection.end(JSON.stringify(response));
      }); 
    } else if (message.type === 'update') {
      userGameCollection.updateGame(message.videogame as Videogame, (success, result) => {
        const response: ResponseType = { success: success, message: result as string};
        connection.end(JSON.stringify(response));
      });
    } else if (message.type === 'remove') {
      userGameCollection.removeGame(message.id as number, (success, result) => {
        const response: ResponseType = { success: success, message: result as string};
        connection.end(JSON.stringify(response));
      });
    } else if (message.type === 'read') {
      userGameCollection.readGame(message.id as number, (success, result) => {
        if (!success) {
          const response: ResponseType = { success: success, message: result as string};
          connection.end(JSON.stringify(response));
        } else {
          const response: ResponseType = { success: success, videogames: result as Videogame[]};
          connection.end(JSON.stringify(response));
        }
      });
    } else {
      userGameCollection.listGames(message.user, (success, result) => {
        if (!success) {
          const response: ResponseType = { success: success, message: result as string};
          connection.end(JSON.stringify(response));
        } else {
          const response: ResponseType = { success: success, videogames: result as Videogame[]};
          connection.end(JSON.stringify(response));
        }
      });
    }
  });

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
});

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});