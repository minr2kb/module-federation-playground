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
    'is_day',
    'rain',
    'weather_code',
  ],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'uv_index_max',
  ],
  timezone: 'Asia/Tokyo',
};

const fetchWeatherData = async () => {
  try {
    const responses = await fetchWeatherApi(API_URL, params);
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const response = responses[0];

    const daily = response.daily()!;

    const dailyData = range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t: number, i: number) => {
      const data = {
        time: new Date(t * 1000),
        weatherCode: daily.variables(0)!.valuesArray()![i],
        temperature2mMax: daily.variables(1)!.valuesArray()![i],
        temperature2mMin: daily.variables(2)!.valuesArray()![i],
        apparentTemperatureMax: daily.variables(3)!.valuesArray()![i],
        apparentTemperatureMin: daily.variables(4)!.valuesArray()![i],
        uvIndexMax: daily.variables(5)!.valuesArray()!,
      };
      const weatherCode = data.weatherCode as WeatherCode;
      const { description, image } = weathersData[weatherCode];

      return {
        ...data,
        description,
        image,
      };
    });

    return dailyData;
  } catch (e) {
    console.log('error', e);
    return undefined;
  }
};

const useDailyWeatherData = () => {
  return useQuery({
    queryKey: ['WEATHER', 'DAILY'],
    queryFn: fetchWeatherData,
  });
};

export default useDailyWeatherData;
