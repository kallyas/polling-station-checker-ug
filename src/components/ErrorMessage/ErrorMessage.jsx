import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

function ErrorMessage({ title = "Error!", message, onClose, ...rest }) {
  if (!message) return null;

  return (
    <Alert status="error" borderRadius="md" {...rest}>
      <AlertIcon />
      <Box flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription display="block">{message}</AlertDescription>
      </Box>
      {onClose && (
        <CloseButton
          onClick={onClose}
          position="absolute"
          right="8px"
          top="8px"
        />
      )}
    </Alert>
  );
}

export default ErrorMessage;
