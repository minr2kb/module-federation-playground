import { Card, Image, Skeleton, Text, VStack } from '@chakra-ui/react';

import { formatDateWithDay } from '@/utils/date';
import useCurrentWeatherData from '@/hooks/useCurrentWeatherData';
import withQueryClient from './hoc/withQueryProvider';

type WeatherWidgetProps = { onClick: () => void };

const WeatherWidget = withQueryClient(({ onClick }: WeatherWidgetProps) => {
  const { data: currentWeather, isLoading } = useCurrentWeatherData();
  const { time, description, image, temp, humidity } = currentWeather ?? {};

  return (
    <Card.Root
      maxW="sm"
      boxShadow="md"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      cursor={'pointer'}
      _dark={{ bg: 'gray.700' }}
      onClick={onClick}
    >
      <Card.Body p={6}>
        <VStack gap={2} align="center">
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
            />
          )}

          <Text fontSize="sm" color="gray.500">
            {isLoading ? '-' : description}
          </Text>

          <Text fontSize="2xl" as="b" color="blue.900">
            {isLoading ? '-' : temp}℃
          </Text>

          <Text fontSize="sm" color="gray.500">
            습도: {isLoading ? '-' : humidity}%
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
});

export default WeatherWidget;
