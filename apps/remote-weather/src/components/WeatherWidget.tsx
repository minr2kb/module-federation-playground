import {
  Card,
  CardBody,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';

import { formatDateWithDay } from '../utils/date';
import useWeatherData from '../hooks/useWeatherData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const WeatherWidgetContent = () => {
  const { data: weathers, isLoading } = useWeatherData();

  const { time, description, image, temperature2m, relativeHumidity2m } =
    weathers?.current ?? {};

  return (
    <Card
      maxW="sm"
      boxShadow="md"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: 'gray.700' }}
    >
      <CardBody p={6}>
        <VStack spacing={2} align="center">
          <Text fontSize="lg" color="gray.600">
            {formatDateWithDay(
              time?.toDateString() ?? new Date().toDateString()
            )}
          </Text>

          {isLoading ? (
            <Skeleton borderRadius="full" width="80px" height="80px" />
          ) : (
            <Image
              src={image}
              alt={description}
              borderRadius="full"
              boxSize="80px"
              objectFit="cover"
              bg="gray.100"
            />
          )}

          <Text fontSize="sm" color="gray.500">
            {isLoading ? '-' : description}
          </Text>

          <Text fontSize="2xl" as="b" color="blue.900">
            {isLoading ? '-' : temperature2m?.toFixed(1)}℃
          </Text>

          <Text fontSize="sm" color="gray.500">
            습도: {isLoading ? '-' : relativeHumidity2m}%
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

const WeatherWidget = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherWidgetContent />
    </QueryClientProvider>
  );
};

export default WeatherWidget;
