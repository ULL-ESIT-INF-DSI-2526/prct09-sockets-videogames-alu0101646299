import yargs from 'yargs';
import net from 'net';
import { hideBin } from 'yargs/helpers';
import { Videogame, Platform, Genre } from './videogame.js';
import { RequestType, ResponseType } from './server.js';
import { printVideogame } from './ui.js';

/**
 * Interfaz que define los argumentos requeridos por la línea de comandos.
 */
interface GameCommandArgs {
  user: string;
  id: number;
  name: string;
  desc: string;
  platform: string;
  genre: string;
  developer: string;
  year: number;
  multiplayer: boolean;
  hours: number;
  value: number;
}

/**
 * Construye un objeto Videogame a partir de los argumentos de la línea de comandos.
 * @param argv - Argumentos de yargs.
 * @returns Un objeto tipo Videogame.
 */
function buildGameFromArgv(argv: GameCommandArgs): Videogame {
  const game: Videogame = {
    id: argv.id,
    name: argv.name,
    description: argv.desc,
    platform: argv.platform as Platform,
    genre: argv.genre as Genre,
    developer: argv.developer,
    year: argv.year,
    multiplayer: argv.multiplayer,
    hours: argv.hours,
    value: argv.value 
  }

  return game;
}

yargs(hideBin(process.argv))
  .command('add', 'Adds a videogame', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    desc: { type: 'string', demandOption: true },
    platform: { type: 'string', demandOption: true },
    genre: { type: 'string', demandOption: true },
    developer: { type: 'string', demandOption: true },
    year: { type: 'number', demandOption: true },
    multiplayer: { type: 'boolean', demandOption: true },
    hours: { type: 'number', demandOption: true },
    value: { type: 'number', demandOption: true },
  }, (argv) => {
    const client = net.connect({port: 60300});
    const request: RequestType = { user: argv.user, type: 'add', videogame: buildGameFromArgv(argv) };
    client.write(JSON.stringify(request));

    let wholeData: string = '';
    client.on('data', (chunk) => {
      wholeData += chunk.toString();
    });

    client.on('end', () => {
      const response: ResponseType = JSON.parse(wholeData);
      console.log(response.message)}
    );
  })

  .command('update', 'Updates a videogame', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    desc: { type: 'string', demandOption: true },
    platform: { type: 'string', demandOption: true },
    genre: { type: 'string', demandOption: true },
    developer: { type: 'string', demandOption: true },
    year: { type: 'number', demandOption: true },
    multiplayer: { type: 'boolean', demandOption: true },
    hours: { type: 'number', demandOption: true },
    value: { type: 'number', demandOption: true },
  }, (argv) => {
    const client = net.connect({port: 60300});
    const request: RequestType = { user: argv.user, type: 'update', videogame: buildGameFromArgv(argv) };
    client.write(JSON.stringify(request));

    let wholeData: string = '';
    client.on('data', (chunk) => {
      wholeData += chunk.toString();
    });

    client.on('end', () => {
      const response: ResponseType = JSON.parse(wholeData);
      console.log(response.message)}
    );
  })

  .command('remove', 'Removes a videogame', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
  }, (argv) => {
    const client = net.connect({port: 60300});
    const request: RequestType = { user: argv.user, type: 'remove', id: argv.id };
    client.write(JSON.stringify(request));

    let wholeData: string = '';
    client.on('data', (chunk) => {
      wholeData += chunk.toString();
    });

    client.on('end', () => {
      const response: ResponseType = JSON.parse(wholeData);
      console.log(response.message)}
    );
  })

  .command('list', 'Lists all videogames', {
    user: { type: 'string', demandOption: true }
  }, (argv) => {
    const client = net.connect({port: 60300});
    const request: RequestType = { user: argv.user, type: 'list' };
    client.write(JSON.stringify(request));

    let wholeData: string = '';
    client.on('data', (chunk) => {
      wholeData += chunk.toString();
    });

    client.on('end', () => {
      const response: ResponseType = JSON.parse(wholeData);
      if (!response.success) { 
        console.log(response.message); 
      } else if (response.videogames) {
        const list: Videogame[] = response.videogames;
        list.forEach(item => {
          console.log('--------------------------------');
          printVideogame(item);
        });
      }
    });
  })

  .command('read', 'Reads a specific videogame', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
  }, (argv) => {
    const client = net.connect({port: 60300});
    const request: RequestType = {user: argv.user, type: 'read', id: argv.id};
    client.write(JSON.stringify(request));

    let wholeData: string = '';
    client.on('data', (chunk) => {
      wholeData += chunk.toString();
    });

    client.on('end', () => {
      const response: ResponseType = JSON.parse(wholeData.toString());
      if (!response.success) { 
        console.log(response.message); 
      } else if (response.videogames && response.videogames.length > 0) {
        printVideogame(response.videogames[0]);
      }
    });
  })
  .help()
  .parse();