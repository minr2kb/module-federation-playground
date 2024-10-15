import { lazy, Suspense } from 'react';
import {
  Card,
  CardBody,
  Container,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { weatherQueryClient } from '../util/queryClients';

function Widget() {
  return (
    <Card>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
    </Card>
  );
}

const WeatherWidget = lazy(() => import('remote-weather/WeatherWidget'));

const Home = () => {
  const navi = useNavigate();
  return (
    <VStack bgColor={'gray.50'}>
      <Container maxW={'3xl'} w={'100%'} minH={'100vh'} p={4}>
        <SimpleGrid w={'100%'} columns={[1, 3]} spacing={3}>
          <Suspense>
            <WeatherWidget
              client={weatherQueryClient}
              onClick={() => {
                navi('/weather');
              }}
            />
          </Suspense>
          <Widget />
          <Widget />
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Home;
