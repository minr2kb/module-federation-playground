import {
  Flex,
  Grid,
  VStack,
  GridItem,
  Container,
  Stat,
  Box,
  StackSeparator,
} from '@chakra-ui/react';
import useCurrentWeatherData from '@/hooks/useCurrentWeatherData';
import withQueryClient from '@/components/hoc/withQueryProvider';
import useForecastWeatherData from '@/hooks/useForecastWeatherData';
import { isDaytime } from '@/utils/date';
import useLocation from '@/hooks/useLocation';
import CurrentWeatherSection from '@/components/CurrentWeatherSection';
import HourlyForecastItem from '@/components/HourlyForecastItem';
import DailyForecastItem from '@/components/DailyForecastItem';
import { StatValueText, StatLabel, StatHelpText } from '@/components/ui/stat';

const WeatherPage = withQueryClient(() => {
  const location = useLocation();
  const { data: currentWeather } = useCurrentWeatherData(location);
  const { data: forecastWeather } = useForecastWeatherData(location);

  const isDay = isDaytime();

  const extraData = [
    {
      label: '습도',
      value: `${currentWeather?.humidity ?? '-'}%`,
      helpText: '현재 습도 수준',
    },
    {
      label: '체감온도',
      value: `${currentWeather?.feelsLike ?? '-'}°C`,
      helpText: '현재 체감 온도',
    },
    {
      label: '풍속',
      value: `${currentWeather?.windSpeed ?? '-'} m/s`,
      helpText: `${currentWeather?.windDirection}°`,
    },
    {
      label: '가시거리',
      value: `${currentWeather?.visibility.toLocaleString() ?? '-'}m`,
      helpText: '최대 가시거리 (m)',
    },
  ];

  return (
    <VStack
      bgColor={isDay ? 'gray.100' : '#1E1F26'}
      color={isDay ? 'gray.900' : 'white'}
      w={'100vw'}
      minH={'100vh'}
      p={2}
    >
      <Container maxW={'4xl'} w={'100%'}>
        {/* 현재 날씨 정보 */}
        <Box my={8}>
          <CurrentWeatherSection
            cityName={currentWeather?.cityName}
            temp={currentWeather?.temp}
            description={currentWeather?.description}
            tempMax={currentWeather?.tempMax}
            tempMin={currentWeather?.tempMin}
          />
        </Box>

        <Grid
          templateRows={['repeat(8, 1fr)', 'repeat(3, 1fr)']}
          templateColumns={['repeat(2, 1fr)', 'repeat(6, 1fr)']}
          gap={4}
        >
          {/* 시간별 예보 */}
          <GridItem
            rowSpan={1}
            colSpan={[2, 6]}
            p={4}
            bg={isDay ? 'gray.200' : 'whiteAlpha.50'}
            borderRadius="md"
          >
            <Flex gap={4} overflowX="auto" whiteSpace="nowrap" w={'100%'}>
              {forecastWeather?.slice(0, 16).map((hour, i) => (
                <HourlyForecastItem
                  key={i}
                  time={hour.time.toLocaleTimeString([], {
                    hour: '2-digit',
                    hourCycle: 'h24',
                  })}
                  temp={hour.temp}
                  image={hour.image}
                  pop={hour.precipitationProbability}
                  description={hour.description}
                />
              ))}
            </Flex>
          </GridItem>

          {/* 일일 예보 - 유료 API 대체 코드, 부정확함 */}
          <GridItem
            rowSpan={2}
            colSpan={2}
            p={4}
            bg={isDay ? 'gray.200' : 'whiteAlpha.50'}
            borderRadius="md"
          >
            <VStack separator={<StackSeparator />} gap={2} align="stretch">
              {forecastWeather
                ?.filter((_, i) => (i - 4) % 8 === 0)
                .map((day, i) => (
                  <DailyForecastItem
                    key={i}
                    date={day.time.toLocaleDateString('ko-KR', {
                      weekday: 'short',
                    })}
                    tempMax={day.tempMax}
                    tempMin={day.tempMin}
                    image={day.image}
                    description={day.description}
                  />
                ))}
            </VStack>
          </GridItem>

          {/* 추가 데이터 */}
          {extraData.map((data, i) => (
            <GridItem
              key={i}
              rowSpan={1}
              colSpan={2}
              p={4}
              bg={isDay ? 'gray.200' : 'whiteAlpha.50'}
              borderRadius="md"
            >
              <Stat.Root>
                <StatLabel>{data.label ?? '-'}</StatLabel>
                <StatValueText>{data.value ?? '-'}</StatValueText>
                <StatHelpText>{data.helpText}</StatHelpText>
              </Stat.Root>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </VStack>
  );
});

export default WeatherPage;
