import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "react-icons/md";


function VoterForm({ onSearch, isLoading }) {
  const [voterId, setVoterId] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!voterId.trim()) {
      setInputError("Voter ID cannot be empty.");
      return;
    }
    // Basic alphanumeric check (can be more specific)
    if (!/^[a-zA-Z0-9]+$/.test(voterId)) {
      setInputError("Voter ID should be alphanumeric.");
      return;
    }
    setInputError("");
    onSearch(voterId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!inputError} isRequired>
          <FormLabel
            htmlFor="voterId"
            fontWeight="bold"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Enter Voter Identification Number (VIN)
          </FormLabel>
          <Input
            id="voterId"
            type="text"
            value={voterId}
            onChange={(e) => {
              setVoterId(e.target.value.toUpperCase()); // Optionally force uppercase
              if (inputError) setInputError("");
            }}
            placeholder="e.g., CF82039109DWCK"
            size="lg"
            focusBorderColor="brand.500"
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />
          {inputError ? (
            <FormHelperText color="red.500">{inputError}</FormHelperText>
          ) : (
            <FormHelperText>
              Your unique identification number as a voter.
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="brand" // Uses the 'brand' color from your theme
          isLoading={isLoading}
          loadingText="Searching..."
          size="lg"
          leftIcon={<SearchIcon />}
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
        >
          Check Polling Station
        </Button>
      </VStack>
    </form>
  );
}

export default VoterForm;
