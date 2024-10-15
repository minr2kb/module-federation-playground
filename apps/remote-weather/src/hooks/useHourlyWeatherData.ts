import { useQuery } from '@tanstack/react-query';
import { fetchWeatherApi } from 'openmeteo';
import { weathersData } from '../data/weathers';

export type WeatherCode = keyof typeof weathersData;

const API_URL = 'https://api.open-meteo.com/v1/forecast';

const params = {
  latitude: 37.566,
  longitude: 126.9784,
  hourly: [
    'weather_code',
    'temperature_2m',
    'relative_humidity_2m',
    'precipitation_probability',
    'wind_speed_10m',
    'wind_direction_10m',
  ],

  timezone: 'Asia/Tokyo',
  start: new Date().toISOString(),
};

const fetchWeatherData = async () => {
  try {
    const responses = await fetchWeatherApi(API_URL, params);
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const response = responses[0];
    const hourly = response.hourly()!;

    const currentHour = new Date().getHours(); // Get the current hour

    const hourlyData = range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    )
      .map((time: number, i: number) => {
        const data = {
          time: new Date(time * 1000),
          weatherCode: hourly.variables(0)!.values(i),
          temperature: hourly.variables(1)!.values(i)!.toFixed(1),
          humidity: hourly.variables(2)!.values(i),
          precipitationProbability: hourly.variables(3)!.values(i),
          windSpeed: hourly.variables(4)!.values(i)!.toFixed(1),
          windDirection: hourly.variables(5)!.values(i)!.toFixed(1),
        };
        const weatherCode = data.weatherCode as WeatherCode;
        const { description, image } = weathersData[weatherCode];

        return {
          ...data,
          description,
          image,
        };
      })
      .filter((h) => {
        return h.time.getHours() >= currentHour;
      });

    return hourlyData;
  } catch (e) {
    console.log('error', e);
    return [];
  }
};

const useHourlyWeatherData = () => {
  return useQuery({
    queryKey: ['WEATHER', 'HOURLY'],
    queryFn: fetchWeatherData,
  });
};

export default useHourlyWeatherData;
