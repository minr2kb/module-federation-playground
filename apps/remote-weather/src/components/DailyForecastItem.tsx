import { Flex, Image, Text } from '@chakra-ui/react';

type Props = {
  date?: string;
  image?: string;
  description?: string;
  tempMax?: string;
  tempMin?: string;
};

const DailyForecastItem = ({
  date,
  image,
  description,
  tempMax,
  tempMin,
}: Props) => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text>{date ?? '-'}</Text>

      <Image src={image} alt={description} boxSize="30px" objectFit="cover" />

      <Text fontSize={'sm'}>
        {tempMax ?? '-'}°C - {tempMin ?? '-'}°C
      </Text>
    </Flex>
  );
};

export default DailyForecastItem;
