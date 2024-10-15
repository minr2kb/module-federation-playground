import { Location } from '@/types';
import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error(error.message);
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      {}
    );
  }, []);

  return location;
};

export default useLocation;
