import { Container, SimpleGrid, VStack } from '@chakra-ui/react';
import WeatherWidget from './components/WeatherWidget';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <VStack bgColor={'gray.50'}>
      <Container maxW={'3xl'} w={'100%'} p={4}>
        <SimpleGrid w={'100%'} columns={[1, 3]} spacing={3}>
          <WeatherWidget />
        </SimpleGrid>
      </Container>
      <WeatherPage />
    </VStack>
  );
}

export default App;
