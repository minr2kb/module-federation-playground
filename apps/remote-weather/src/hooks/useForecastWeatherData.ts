import { useQuery } from '@tanstack/react-query';
import {
  ForecastWeatherData,
  ForecastWeatherResponse,
  Location,
} from '@/types';
import QueryKeys from '@/utils/queryKeys';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_WEATHER_API_URL}/forecast`;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeatherData = async (
  location?: Location
): Promise<ForecastWeatherData[]> => {
  try {
    const { latitude = 37.566, longitude = 126.9784 } = location ?? {};

    const response = await axios.get<ForecastWeatherResponse>(API_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    });

    if (response.status >= 400) {
      throw new Error('Failed to fetch weather data');
    }

    const { data } = response;

    return data.list.map((item) => {
      return {
        time: new Date(item.dt * 1000),
        temp: item.main.temp.toFixed(1),
        tempMax: item.main.temp_max.toFixed(1),
        tempMin: item.main.temp_min.toFixed(1),
        feelsLike: item.main.feels_like.toFixed(1),
        humidity: item.main.humidity,
        precipitationProbability: item.pop * 100,
        windSpeed: item.wind.speed.toFixed(1),
        windDirection: item.wind.deg.toFixed(1),
        visibility: item.visibility,
        pod: item.sys.pod,
        description: item.weather[0].main,
        image: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        cityName: data.city.name,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
      };
    });
  } catch (e) {
    console.log('error', e);
    return [];
  }
};

const useForecastWeatherData = (location?: Location) => {
  return useQuery({
    queryKey: QueryKeys.FORECAST_WEATHER,
    queryFn: () => fetchWeatherData(location),
  });
};

export default useForecastWeatherData;
