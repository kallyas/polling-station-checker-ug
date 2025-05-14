import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Heading,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import VoterForm from "../components/VoterForm/VoterForm";
import VoterInfoCard from "../components/VoterInfoCard/VoterInfoCard";
import { getVoterDetails } from "../services/voterService";
import { useSearchHistory } from "../contexts/SearchHistoryContext";

function HomePage() {
  const [voterData, setVoterData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addSearchToHistory } = useSearchHistory();
  const location = useLocation();
  const navigate = useNavigate(); // For clearing location state

  // Handle prefill from history navigation
  useEffect(() => {
    if (location.state?.searchedId) {
      const { searchedId, prefillData } = location.state;
      // Immediately perform search for the ID from history
      // This makes it a "re-search" rather than just displaying old data
      handleSearch(searchedId, true); // Pass a flag to indicate it's a re-search

      // Optionally, if you wanted to just display cached data from history:
      // if (prefillData) {
      //   setVoterData(prefillData);
      //   setError(null);
      // } else {
      //   // If no prefillData but searchedId is present, it might have been an error,
      //   // so you might want to trigger a fresh search or show the previous error.
      //   handleSearch(searchedId);
      // }

      // Clear the location state to prevent re-triggering on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]); // Removed handleSearch from deps to avoid loop if it's not memoized

  const handleSearch = async (idToSearch, isFromHistory = false) => {
    if (!idToSearch) {
      setError("Please enter a Voter ID.");
      setVoterData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setVoterData(null);

    try {
      const result = await getVoterDetails(idToSearch);
      if (result.status === "success") {
        setVoterData(result.data);
        // Avoid adding to history again if it's just a re-search from history page,
        // unless you want to update the timestamp or re-log it.
        // For this example, we'll add it as a new entry to show it was "re-searched".
        addSearchToHistory({
          id: idToSearch,
          timestamp: new Date().toISOString(),
          data: result.data,
          status: "success",
        });
      } else {
        setError(result.message || "No voter found with provided details.");
        setVoterData(null);
        if (!isFromHistory || result.message) {
          // Only add to history if it's a new search or error from history view
          addSearchToHistory({
            id: idToSearch,
            timestamp: new Date().toISOString(),
            status: "error",
            message: result.message || "No voter found with provided details.",
          });
        }
      }
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred.";
      setError(errorMessage);
      setVoterData(null);
      if (!isFromHistory || errorMessage) {
        addSearchToHistory({
          id: idToSearch,
          timestamp: new Date().toISOString(),
          status: "error",
          message: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      textAlign="center"
      py={{ base: 6, md: 10 }}
      px={6}
      maxW={{ base: "100%", md: "lg" }}
      mx="auto"
    >
      <Heading as="h1" size={{ base: "lg", md: "xl" }} mb={2}>
        Uganda Polling Station Checker
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.500" mb={8}>
        Enter your Voter Identification Number (VIN) to find your polling
        station.
      </Text>

      <VStack spacing={6} align="stretch">
        <VoterForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <Spinner
            size="xl"
            color="brand.700"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            my={6}
          />
        )}

        {error && !isLoading && (
          <Alert status="error" borderRadius="md" my={4}>
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription display="block">{error}</AlertDescription>
            </Box>
            <CloseButton
              onClick={() => setError(null)}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        )}

        {voterData && !isLoading && !error && (
          <Box mt={6}>
            <VoterInfoCard data={voterData} />
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default HomePage;
