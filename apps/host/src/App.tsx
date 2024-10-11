import { lazy, Suspense } from 'react';
import {
  Container,
  VStack,
  Text,
  Button,
  Box,
  SimpleGrid,
  Card,
  Flex,
  Heading,
  CardBody,
} from '@chakra-ui/react';
const WeatherWidget = lazy(() => import('remote-weather/WeatherWidget'));

function TopNav() {
  return (
    <Flex
      as="nav"
      color="gray.700"
      backgroundColor={'white'}
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        p: 4,
        zIndex: 999,
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'sm',
      }}
    >
      <Heading size="md">Widget Board</Heading>
      <Button>Login</Button>
    </Flex>
  );
}

function Widget() {
  return (
    <Card>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
    </Card>
  );
}

function App() {
  return (
    <Box position={'relative'} height={'100vh'} overflow={'auto'}>
      <TopNav />
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
    </Box>
  );
}

export default App;
