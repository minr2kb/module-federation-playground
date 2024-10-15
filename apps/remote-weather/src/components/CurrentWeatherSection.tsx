import { VStack, Text, Heading } from '@chakra-ui/react';

type Props = {
  cityName?: string;
  temp?: string;
  description?: string;
  tempMax?: string;
  tempMin?: string;
};

const CurrentWeatherSection = (props: Props) => {
  const { cityName, temp, description, tempMax, tempMin } = props;
  return (
    <VStack>
      <Text fontSize="xl">{cityName ?? '-'}</Text>
      <Heading fontSize="4xl">{temp ?? '-'}°C</Heading>
      <Text>{description ?? '-'}</Text>
      <Text>
        최고: {tempMax ?? '-'}°C | 최저: {tempMin ?? '-'}°C
      </Text>
    </VStack>
  );
};

export default CurrentWeatherSection;
