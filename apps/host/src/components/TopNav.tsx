import { Button, Flex, Heading } from '@chakra-ui/react';

// TopNav 컴포넌트 정의
const TopNav = () => {
  return (
    <Flex
      as="nav"
      color="gray.700"
      backgroundColor="white"
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
};

export default TopNav;
