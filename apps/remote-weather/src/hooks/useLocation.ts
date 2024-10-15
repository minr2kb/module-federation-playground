import { useState, useEffect } from 'react';

type Location = {
  latitude: number;
  longitude: number;
};

type UseLocationOptions = {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
};

const useLocation = (options: UseLocationOptions = {}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setError(null);
      setIsLoading(false);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      setError(error.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, [options]);

  return { location, error, isLoading };
};

export default useLocation;
