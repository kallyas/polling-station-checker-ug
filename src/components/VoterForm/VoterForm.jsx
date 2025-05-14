import { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  FormHelperText,
  Paper,
  InputAdornment,
  Grow
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { motion } from "framer-motion";

function VoterForm({ onSearch, isLoading }) {
  const [voterId, setVoterId] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!voterId.trim()) {
      setInputError("Voter ID cannot be empty.");
      return;
    }
    // Basic alphanumeric check
    if (!/^[a-zA-Z0-9]+$/.test(voterId)) {
      setInputError("Voter ID should be alphanumeric.");
      return;
    }
    setInputError("");
    onSearch(voterId);
  };

  return (
    <Grow in={true} timeout={800}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          maxWidth: 600,
          mx: 'auto',
          mb: 4
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 3 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HowToVoteIcon color="primary" sx={{ fontSize: 36 }} />
              </motion.div>
              <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                Find Your Polling Station
              </Typography>
            </Box>
            
            <TextField
              id="voterId"
              label="Voter Identification Number (VIN)"
              variant="outlined"
              fullWidth
              required
              value={voterId}
              onChange={(e) => {
                setVoterId(e.target.value.toUpperCase());
                if (inputError) setInputError("");
              }}
              placeholder="e.g., CF82039109DWCK"
              error={!!inputError}
              helperText={inputError || "Your unique identification number as a voter."}
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ 
                  py: 1.5,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isLoading ? "Searching..." : "Check Polling Station"}
                
                {/* Animated background effect */}
                {!isLoading && (
                  <Box 
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      zIndex: 0
                    }}
                    animate={{
                      x: ['100%', '-100%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: 'linear'
                    }}
                  />
                )}
              </Button>
            </motion.div>
          </Box>
        </form>
      </Paper>
    </Grow>
  );
}

export default VoterForm;