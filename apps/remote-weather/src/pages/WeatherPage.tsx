import {
  Flex,
  Text,
  Grid,
  VStack,
  Image,
  Table,
  Tr,
  Tbody,
  Td,
  GridItem,
  Container,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import useDailyWeatherData from '../hooks/useDailyWeatherData';
import useCurrentWeatherData from '../hooks/useCurrentWeatherData';
import withQueryClient from '../components/hoc/withQueryProvider';
import useHourlyWeatherData from '../hooks/useHourlyWeatherData';

const WeatherPage = () => {
  const { data: currentWeather, isLoading: isLoadingCur } =
    useCurrentWeatherData();
  const { data: dailyData = [], isLoading: isLoadingDaily } =
    useDailyWeatherData();
  const { data: hourlyData = [], isLoading: isLoadingHourly } =
    useHourlyWeatherData();

  //   if (isLoadingDaily) {
  //     return (
  //       <Flex justify="center" align="center" h="100vh">
  //         <Spinner size="xl" color="blue.500" />
  //         <Text ml={4} fontSize="xl" color="blue.500">
  //           Loading weather data...
  //         </Text>
  //       </Flex>
  //     );
  //   }

  return (
    <VStack bgColor={'#1E1F26'} color="white" w={'100vw'} minH={'100vh'} p={8}>
      <Container maxW={'4xl'} w={'100%'}>
        {/* 현재 날씨 정보 */}
        <VStack mb={8}>
          <Text fontSize="2xl">서울</Text>
          <Heading fontSize="6xl">{currentWeather?.temperature2m}°C</Heading>
          <Text>{currentWeather?.description}</Text>
          <Text>
            최고: {dailyData[0]?.temperature2mMax}°C | 최저:{' '}
            {dailyData[0]?.temperature2mMin}°C
          </Text>
        </VStack>

        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          {/* 시간별 예보 */}
          <GridItem
            rowSpan={1}
            colSpan={3}
            p={4}
            bg="whiteAlpha.50"
            borderRadius="md"
          >
            <Flex gap={4} overflowX="auto" whiteSpace="nowrap" width="100%">
              {hourlyData.slice(0, 24).map((hour, i) => (
                <VStack gap={0} key={i} align="center" w={60}>
                  <Text fontSize="sm">
                    {hour.time.toLocaleTimeString([], {
                      hour: '2-digit',
                      hourCycle: 'h24',
                    })}
                  </Text>
                  <Image
                    src={hour.image}
                    alt={hour.description}
                    borderRadius="full"
                    boxSize="30px"
                    objectFit="cover"
                  />
                  <Text fontSize="xs">{hour.precipitationProbability}%</Text>
                  <Text>{hour.temperature}°</Text>
                </VStack>
              ))}
            </Flex>
          </GridItem>

          {/* 일일 예보 */}
          <GridItem
            rowSpan={2}
            colSpan={1}
            p={4}
            bg="whiteAlpha.50"
            borderRadius="md"
          >
            <Table variant="simple" size="sm">
              <Tbody>
                {dailyData.map((day, i) => (
                  <Tr key={i}>
                    <Td>
                      {day.time.toLocaleDateString('ko-KR', {
                        weekday: 'short',
                      })}
                    </Td>
                    <Td p={0}>
                      <Image
                        src={day.image}
                        alt={day.description}
                        boxSize="30px"
                        objectFit="cover"
                      />
                    </Td>
                    <Td justifyContent={'end'} isNumeric>
                      {day.temperature2mMax}°C - {day.temperature2mMin}°C
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </GridItem>

          {/* 습도 */}
          <GridItem rowSpan={1} p={4} bg="whiteAlpha.50" borderRadius="md">
            <Stat>
              <StatLabel>습도</StatLabel>
              <StatNumber>{hourlyData[0]?.humidity}%</StatNumber>
              <StatHelpText>현재 습도 수준</StatHelpText>
            </Stat>
          </GridItem>
          {/* 체감온도 */}
          <GridItem rowSpan={1} p={4} bg="whiteAlpha.50" borderRadius="md">
            <Stat>
              <StatLabel>체감온도</StatLabel>
              <StatNumber>{currentWeather?.apparentTemperature}°C</StatNumber>
              {currentWeather?.apparentTemperature &&
                currentWeather?.temperature2m && (
                  <StatHelpText>
                    <StatArrow
                      type={
                        currentWeather?.apparentTemperature >
                        currentWeather?.temperature2m
                          ? 'increase'
                          : 'decrease'
                      }
                    />
                    {(
                      Number(currentWeather?.apparentTemperature) -
                      Number(currentWeather.temperature2m)
                    ).toFixed(1)}
                    °C
                  </StatHelpText>
                )}
            </Stat>
          </GridItem>
          {/* 풍속 */}
          <GridItem rowSpan={1} p={4} bg="whiteAlpha.50" borderRadius="md">
            <Stat>
              <StatLabel>풍속</StatLabel>
              <StatNumber>{hourlyData[0]?.windSpeed} m/s</StatNumber>
              <StatHelpText>{hourlyData[0]?.windDirection}°</StatHelpText>
            </Stat>
          </GridItem>
          {/* 가시거리 */}
          <GridItem rowSpan={1} p={4} bg="whiteAlpha.50" borderRadius="md">
            <Stat>
              <StatLabel>자외선 지수</StatLabel>
              <StatNumber>{dailyData[0]?.uvIndexMax}</StatNumber>
              <StatHelpText>최대 자외선 지수</StatHelpText>
            </Stat>
          </GridItem>
        </Grid>
      </Container>
    </VStack>
  );
};

export default withQueryClient(WeatherPage);
