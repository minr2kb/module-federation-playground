import { Image, Text, VStack } from '@chakra-ui/react';

type Props = {
  time?: string;
  image?: string;
  description?: string;
  pop?: number;
  temp?: string;
};

const HourlyForecastItem = ({ time, image, description, pop, temp }: Props) => {
  return (
    <VStack gap={0} minW={'50px'}>
      <Text fontSize="sm">{time}</Text>
      <Image
        src={image}
        alt={description}
        borderRadius="full"
        boxSize="30px"
        objectFit="cover"
      />
      <Text fontSize={'xs'}>{pop !== undefined ? pop * 100 : '-'}%</Text>
      <Text fontSize={'sm'}>{temp ?? '-'}°C</Text>
    </VStack>
  );
};

export default HourlyForecastItem;
