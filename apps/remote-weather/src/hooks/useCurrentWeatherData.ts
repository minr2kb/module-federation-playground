import { useQuery } from '@tanstack/react-query';
import { CurrentWeatherData, CurrentWeatherResponse, Location } from '@/types';
import QueryKeys from '@/utils/queryKeys';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_WEATHER_API_URL}/weather`;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeatherData = async (
  location?: Location
): Promise<CurrentWeatherData | undefined> => {
  try {
    const { latitude = 37.566, longitude = 126.9784 } = location ?? {};
    console.log(API_URL, API_KEY);
    const response = await axios.get<CurrentWeatherResponse>(API_URL, {
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

    return {
      time: new Date(data.dt * 1000),
      temp: data.main.temp.toFixed(1),
      tempMax: data.main.temp_max.toFixed(1),
      tempMin: data.main.temp_min.toFixed(1),
      windSpeed: data.wind.speed.toFixed(1),
      windDirection: data.wind.deg.toFixed(1),
      visibility: data.visibility,

      feelsLike: data.main.feels_like.toFixed(1),
      humidity: data.main.humidity,
      cityName: data.name,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,

      description: data.weather[0].main,
      image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (e) {
    console.error('error', e);
    return undefined;
  }
};

const useCurrentWeatherData = (location?: Location) => {
  return useQuery({
    queryKey: QueryKeys.CURRENT_WEATHER,
    queryFn: async () => fetchWeatherData(location),
  });
};

export default useCurrentWeatherData;
