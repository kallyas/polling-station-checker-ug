import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Divider,
  Icon,
  useColorModeValue,
  Badge,
  Flex
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaUser, FaCalendarAlt, FaVenusMars, FaLandmark, FaCity, FaVoteYea, FaGlobeAfrica } from 'react-icons/fa'; // Example icons

const InfoItem = ({ icon, label, value, isHighlighted = false }) => {
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const valueColor = useColorModeValue('gray.800', 'white');
  const highlightBg = useColorModeValue('yellow.100', 'yellow.700'); // For polling station

  return (
    <Flex
      align="start"
      p={isHighlighted ? 3 : 2}
      bg={isHighlighted ? highlightBg : 'transparent'}
      borderRadius="md"
      direction={{ base: 'column', sm: 'row' }}
    >
      <Icon as={icon} mr={3} mt={1} color={isHighlighted ? 'yellow.600' : 'brand.600'} boxSize={5} />
      <Box>
        <Text fontWeight="semibold" color={labelColor} fontSize="sm">
          {label}
        </Text>
        <Text fontWeight="medium" fontSize="md" color={isHighlighted ? 'black' : valueColor}>
          {value || 'N/A'}
        </Text>
      </Box>
    </Flex>
  );
};

function VoterInfoCard({ data }) {
  const cardBg = useColorModeValue('white', 'gray.700');

  if (!data) return null;

  return (
    <Box
      p={{ base: 4, md: 6 }}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      bg={cardBg}
      w="100%"
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h3" size="lg" textAlign="center" color="brand.700">
          Voter Details
        </Heading>
        <Divider />

        <InfoItem icon={FaUser} label="Names" value={data.names} />
        <InfoItem icon={FaCalendarAlt} label="Date of Birth" value={data.dateOfBirth} />
        <InfoItem icon={FaVenusMars} label="Gender" value={data.gender === 'F' ? 'Female' : 'Male'} />
        <InfoItem icon={FaVoteYea} label="Voter ID Number" value={data.voterIdentificationNumber} />

        <Divider my={2} />
        <Heading as="h4" size="md" color={useColorModeValue('gray.700', 'gray.200')}>
          Location Details
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <InfoItem icon={FaLandmark} label="Village" value={data.village} />
          <InfoItem icon={FaCity} label="District" value={data.district} />
          <InfoItem icon={FaGlobeAfrica} label="Electoral Area" value={data.electoralArea} />
          <InfoItem icon={FaLandmark} label="Sub-County" value={data.subCounty} />
          <InfoItem icon={FaGlobeAfrica} label="Parish" value={data.parish} />
        </SimpleGrid>

        <Divider my={2} />
        <Box mt={2}>
            <InfoItem
            icon={FaMapMarkerAlt}
            label="Polling Station"
            value={data.pollingStation}
            isHighlighted={true}
            />
        </Box>

        {data.source === 'cache' && (
          <Badge colorScheme="green" variant="subtle" alignSelf="flex-start" mt={3}>
            Served from cache
          </Badge>
        )}
      </VStack>
    </Box>
  );
}

export default VoterInfoCard;