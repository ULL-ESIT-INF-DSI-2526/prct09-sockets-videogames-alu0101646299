import chalk from 'chalk';
import { Videogame } from './videogame.js';

/**
 * Devuelve el valor formateado con un color en base a su valor
 * @param value - Valor del juego
 * @returns String con el color correspondiente
 */
function getColoredValue(value: number): string {
  if (value < 20) return chalk.red(value.toString());
  if (value < 40) return chalk.yellow(value.toString());
  if (value < 60) return chalk.blue(value.toString());
  return chalk.green(value.toString());
}

/**
 * Imprime por consola un Videogame
 * @param game - Objeto de tipo Videogame a imprimir
 */
export function printVideogame(game: Videogame) {
  console.log(`ID: ${game.id}`);
  console.log(`Name: ${game.name}`);
  console.log(`Description: ${game.description}`);
  console.log(`Platform: ${game.platform}`);
  console.log(`Genre: ${game.genre}`);
  console.log(`Developer: ${game.developer}`);
  console.log(`Year: ${game.year}`);
  console.log(`Multiplayer: ${game.multiplayer}`);
  console.log(`Estimated hours: ${game.hours}`);
  console.log(`Market value: ${getColoredValue(game.value)}`);
}