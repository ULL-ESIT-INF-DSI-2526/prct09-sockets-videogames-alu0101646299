import { request } from "https";

/**
 * Obtiene información sobre un país dado
 * @param name - Nombre del país
 * @param callback - Callback que almacena capital, latlng, región y población
 */
export function countryCapital(name: string, callback: (countryName: string, latlng: [number, number], region: string, population: number) => void) {
  const url: string = "https://restcountries.com/v3.1/name/" + name;

  const req = request(url, (response) => {
    let wholeData: string = '';
    response.on('data', (chunk) => {
      wholeData += chunk;
    });

    response.on('end', () => {
      const data = JSON.parse(wholeData);
      callback(data[0].capital, data[0].latlng, data[0].region, data[0].population);
    });
  });

  req.on('error', (error) => {
    console.log(error.message);
  });

  req.end();
}