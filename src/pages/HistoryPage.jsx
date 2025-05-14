import {
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Flex,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../contexts/SearchHistoryContext";
import { format } from "date-fns"; // For formatting dates: npm install date-fns

function HistoryPage() {
  const { history, clearHistory } = useSearchHistory();
  const navigate = useNavigate();
  const itemBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleViewDetails = (item) => {
    // Navigate to home page and pass the ID, or pass full data if you want to prefill
    // For simplicity, let's assume HomePage can take a query param or state to prefill
    navigate(`/?searchId=${item.id}`, {
      state: {
        prefillData: item.status === "success" ? item.data : null,
        searchedId: item.id,
      },
    });
  };

  if (!history || history.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="xl" mb={4}>
          Search History
        </Heading>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
          You haven't searched for any voters yet.
        </Text>
        <Button mt={6} colorScheme="brand" onClick={() => navigate("/")}>
          Start Searching
        </Button>
      </Box>
    );
  }

  return (
    <Box py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl">
          Search History
        </Heading>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={clearHistory}
          leftIcon={<FaTrash />}
          isDisabled={history.length === 0}
        >
          Clear History
        </Button>
      </Flex>

      <List spacing={4}>
        {history.map((item, index) => (
          <ListItem
            key={index}
            p={4}
            bg={itemBg}
            borderRadius="md"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              wrap="wrap"
            >
              <Box flex="1" minW="200px" mr={4}>
                <Flex alignItems="center" mb={1}>
                  <ListIcon
                    as={
                      item.status === "success" ? FaCheckCircle : FaTimesCircle
                    }
                    color={item.status === "success" ? "green.500" : "red.500"}
                    boxSize={5}
                  />
                  <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                    ID: {item.id}
                  </Text>
                </Flex>
                {item.status === "success" && item.data?.names && (
                  <Text
                    fontSize="sm"
                    color={useColorModeValue("gray.700", "gray.300")}
                    noOfLines={1}
                  >
                    Name: {item.data.names}
                  </Text>
                )}
                {item.status === "success" && item.data?.pollingStation && (
                  <Text
                    fontSize="sm"
                    color={useColorModeValue("gray.700", "gray.300")}
                    noOfLines={1}
                  >
                    Station: {item.data.pollingStation}
                  </Text>
                )}
                {item.status === "error" && (
                  <Text fontSize="sm" color="red.500" noOfLines={1}>
                    {item.message || "Error fetching details"}
                  </Text>
                )}
                <Text
                  fontSize="xs"
                  color={useColorModeValue("gray.500", "gray.400")}
                  mt={1}
                >
                  Searched:{" "}
                  {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </Text>
              </Box>
              <Tooltip label="View/Re-search this ID" placement="top">
                <IconButton
                  icon={<FaSearch />}
                  aria-label="View Details or Re-search"
                  onClick={() => handleViewDetails(item)}
                  variant="ghost"
                  colorScheme="brand"
                />
              </Tooltip>
            </Flex>
            {item.status === "success" && (
              <Badge mt={2} colorScheme="green" variant="outline">
                Success
              </Badge>
            )}
            {item.status === "error" && (
              <Badge mt={2} colorScheme="red" variant="outline">
                Failed
              </Badge>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default HistoryPage;
