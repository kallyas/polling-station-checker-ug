import { Box, VStack, Spinner, Heading, Image } from "@chakra-ui/react";
// Assuming you have a logo in src/assets/
// You can use a generic logo or one for the Electoral Commission if appropriate and permitted
import appLogo from "../../assets/logo.svg"; // Replace with your actual logo path

function SplashScreen() {
  return (
    // <Fade in={true} transition={{ enter: { duration: 0.5 } }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgGradient="linear(to-br, brand.700, brand.900)" // Example gradient
        color="white"
      >
        <VStack spacing={6}>
          <Image src={appLogo} alt="App Logo" boxSize="100px" />
          <Heading as="h1" size="xl">
            Polling Station Finder
          </Heading>
          <Heading as="h2" size="md" fontWeight="normal">
            Uganda
          </Heading>
          <Spinner
            size="lg"
            thickness="4px"
            speed="0.65s"
            emptyColor="brand.500"
            color="white"
          />
        </VStack>
      </Box>
    // </Fade>
  );
}

export default SplashScreen;
