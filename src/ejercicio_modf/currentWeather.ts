import { request } from "https";

/**
 * Obtiene información meteorológica sobre unas coordenadas
 * @param lat - Latitud
 * @param lon - Longitud
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de finalización
 * @param callback - Callback que almacena información sobre unas coordenadas dadas
 */
export function currentWeather(lat: number, lon: number, startDate: string, endDate: string, callback: (tempMax: number[], tempMin: number[], windMax: number[], time: string[]) => void) {
  const url: string = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max`;

  const req = request(url, (response) => {
    let wholeData: string = '';
    response.on('data', (chunk) => {
      wholeData += chunk;
    });

    response.on('end', () => {
      const data = JSON.parse(wholeData);
      callback(data.daily.temperature_2m_max, data.daily.temperature_2m_min, data.daily.wind_speed_10m_max, data.daily.time);
    });
  });

  req.on('error', (error) => {
    console.log(error.message);
  });

  req.end();
}