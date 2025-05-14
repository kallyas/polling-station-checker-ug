import { Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFoundPage() {
  return (
    <Box textAlign="center" py={20} px={6}>
      <Icon
        as={FaExclamationTriangle}
        boxSize={"50px"}
        color={"orange.300"}
        mb={6}
      />
      <Heading as="h1" size="2xl" mb={4}>
        Page Not Found
      </Heading>
      <Text fontSize="xl" color={"gray.500"} mb={8}>
        Oops! The page you're looking for doesn't seem to exist.
      </Text>
      <Button
        as={RouterLink}
        to="/"
        colorScheme="brand"
        variant="solid"
        size="lg"
      >
        Go to Homepage
      </Button>
    </Box>
  );
}

export default NotFoundPage;
