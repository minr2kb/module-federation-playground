import { lazy, Suspense } from 'react';
import { Card, Container, SimpleGrid, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { weatherQueryClient } from '@/util/queryClients';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ErrorBoundary } from 'react-error-boundary';

function Widget() {
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        />
        <Card.Title mb="2">Nue Camp</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
  );
}

const WeatherWidget = lazy(() => import('remote-weather/WeatherWidget'));

const Home = () => {
  const navi = useNavigate();
  return (
    <VStack bgColor={'gray.50'}>
      <Container maxW={'3xl'} w={'100%'} minH={'100vh'} p={4}>
        <SimpleGrid w={'100%'} columns={[1, 3]} gap={3}>
          <ErrorBoundary fallback={null}>
            <Suspense>
              <WeatherWidget
                client={weatherQueryClient}
                onClick={() => {
                  navi('/weather');
                }}
              />
            </Suspense>
          </ErrorBoundary>
          <Widget />
          <Widget />
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Home;
