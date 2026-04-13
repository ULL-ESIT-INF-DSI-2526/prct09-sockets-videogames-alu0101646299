import { countryCapital } from "./countryCapital.js";
import { currentWeather } from "./currentWeather.js";

/**
 * Muestra por pantalla información sobre el país y la información meteorológica de la capital para cada día
 * @param name - Nombre del país
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de finalización
 */
export function checkWeather(name: string, startDate: string, endDate: string) {
  countryCapital(name, (countryName, latlng, region, population) => {
    currentWeather(latlng[0], latlng[1], startDate, endDate, (tempMax, tempMin, windMax, time) => {
      console.log(`Nombre: ${name}; Capital: ${countryName[0]}; Latitud: ${latlng[0]}; Longitud: ${latlng[1]}; Región: ${region}; Población: ${population}`);
      console.table([time, tempMax, tempMin, windMax]);
    });
  });
}

checkWeather("peru", "2026-01-01", "2026-01-10");