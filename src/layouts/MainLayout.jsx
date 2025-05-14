import { Container, Flex } from '@chakra-ui/react';
import Navbar from '../components/Navbar/Navbar';

function MainLayout({ children }) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Container as="main" maxW="container.xl" flex="1" py={8}>
        {children}
      </Container>
      {/* Optional Footer could go here */}
      {/* <Box as="footer" py={4} textAlign="center" borderTop="1px" borderColor="gray.200">
        © {new Date().getFullYear()} Electoral Commission of Uganda (Placeholder)
      </Box> */}
    </Flex>
  );
}

export default MainLayout;