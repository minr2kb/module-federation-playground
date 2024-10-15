import React, { lazy, Suspense } from 'react';
import {
  Card,
  CardBody,
  Container,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react';

const WeatherWidget = lazy(() => import('remote-weather/WeatherWidget'));

function Widget() {
  return (
    <Card>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
    </Card>
  );
}

const Home = () => {
  return (
    <VStack bgColor={'gray.50'}>
      <Container maxW={'3xl'} w={'100%'} p={4}>
        <SimpleGrid w={'100%'} columns={[1, 3]} spacing={3}>
          <Suspense>
            <WeatherWidget />
          </Suspense>
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Home;
