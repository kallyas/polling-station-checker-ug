import {
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
  Box
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";

function ErrorMessage({ 
  title = "Error!", 
  message, 
  onClose, 
  severity = "error",
  ...rest 
}) {
  if (!message) return null;

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      {...rest}
    >
      <Collapse in={!!message}>
        <Alert 
          severity={severity}
          action={
            onClose && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
          sx={{ 
            mb: 2,
            boxShadow: 2,
            borderRadius: 1
          }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default ErrorMessage;