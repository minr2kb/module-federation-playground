import {
  Card,
  Container,
  SimpleGrid,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { weatherQueryClient } from '../util/queryClients';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

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

// const WeatherWidget = dynamic(() => import('remote-weather/WeatherWidget'), {
//   ssr: false,
// });

const Home = () => {
  const router = useRouter();
  return (
    <VStack bgColor={'gray.50'}>
      <Container maxW={'3xl'} w={'100%'} minH={'100vh'} p={4}>
        <SimpleGrid w={'100%'} columns={[1, 3]} gap={3}>
          {/* <WeatherWidget
            client={weatherQueryClient}
            onClick={() => {
              router.push('/remotes/weather');
            }}
          /> */}

          <Widget />
          <Widget />
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Home;
