import { lazy } from 'react';
import { Container, VStack } from '@chakra-ui/react';
const Button = lazy(() => import('remote-weather/Button'));

function App() {
  return (
    <VStack>
      <Container></Container>
      <h1>Host App - React</h1>

      <Button />
    </VStack>
  );
}

export default App;
