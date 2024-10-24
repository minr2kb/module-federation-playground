import { weatherQueryClient } from '@/util/queryClients';
import React, { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

// const WeatherPage = dynamic(() => import('remote-weather/WeatherPage'), {
//   ssr: false,
// });

const Weather = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <WeatherPage client={weatherQueryClient} /> */}
    </Suspense>
  );
};

export default Weather;
