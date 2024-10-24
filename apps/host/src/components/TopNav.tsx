import { Flex, Heading } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';

// TopNav 컴포넌트 정의
const TopNav = () => {
  return (
    <Flex
      as="nav"
      color="gray.700"
      backgroundColor="white"
      css={{
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
      <ColorModeButton />
    </Flex>
  );
};

export default TopNav;
