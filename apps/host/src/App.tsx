import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import { lazy, Suspense } from 'react';
import { weatherQueryClient } from './util/queryClients';
import TopNav from './components/TopNav';

function Layout() {
  return (
    <Box position="relative" height="100vh" overflow="auto">
      <TopNav />
      <Suspense>
        <Outlet />
      </Suspense>
    </Box>
  );
}

const WeatherPage = lazy(() => import('remote-weather/WeatherPage'));

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/weather',
        element: <WeatherPage client={weatherQueryClient} />,
      },
    ],
  },
]);

// App 컴포넌트 정의
function App() {
  return <RouterProvider router={router} />;
}

export default App;
