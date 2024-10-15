import { useQuery } from '@tanstack/react-query';
import { fetchWeatherApi } from 'openmeteo';
import { weathersData } from '../data/weathers';

export type WeatherCode = keyof typeof weathersData;

const API_URL = 'https://api.open-meteo.com/v1/forecast';

const params = {
  latitude: 37.566,
  longitude: 126.9784,
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'weather_code',
  ],
  timezone: 'Asia/Tokyo',
};

const fetchWeatherData = async () => {
  try {
    const responses = await fetchWeatherApi(API_URL, params);

    const response = responses[0];

    const current = response.current()!;

    const data = {
      time: new Date(Number(current.time()) * 1000),
      temperature2m: current.variables(0)!.value().toFixed(1),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value().toFixed(1),
      weatherCode: current.variables(3)!.value(),
    };
    const weatherCode = data.weatherCode as WeatherCode;
    const { description, image } = weathersData[weatherCode];

    return {
      ...data,
      description,
      image,
    };
  } catch (e) {
    console.log('error', e);
    return undefined;
  }
};

const useCurrentWeatherData = () => {
  return useQuery({
    queryKey: ['WEATHER', 'CURRENT'],
    queryFn: fetchWeatherData,
  });
};

export default useCurrentWeatherData;
