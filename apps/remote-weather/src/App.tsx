import { Container, SimpleGrid, VStack } from '@chakra-ui/react';
import WeatherWidget from './components/WeatherWidget';

function App() {
  return (
    <VStack bgColor={'gray.50'}>
      <Container maxW={'3xl'} w={'100%'} p={4}>
        <SimpleGrid w={'100%'} columns={[1, 3]} spacing={3}>
          <WeatherWidget />
          <WeatherWidget />
          <WeatherWidget />
        </SimpleGrid>
      </Container>
    </VStack>
  );
}

export default App;
