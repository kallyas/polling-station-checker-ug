import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Grid,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Stack,
  Paper,
  Container,
  Collapse,
  useMediaQuery,
  Fade,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchHistory } from "../contexts/SearchHistoryContext";

function HistoryPage() {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest"); // newest or oldest
  const { history, clearHistory } = useSearchHistory();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleViewDetails = (item) => {
    navigate(`/?searchId=${item.id}`, {
      state: {
        prefillData: item.status === "success" ? item.data : null,
        searchedId: item.id,
      },
    });
  };

  const handleClearHistory = () => {
    clearHistory();
    setConfirmClearOpen(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  // Sort history based on sort order
  const sortedHistory = [...(history || [])].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === "newest"
      ? dateB - dateA // Newest first
      : dateA - dateB; // Oldest first
  });

  if (!history || history.length === 0) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HistoryIcon
              sx={{
                fontSize: 100,
                color: "text.secondary",
                opacity: 0.3,
                mb: 2,
              }}
            />
          </motion.div>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Search History
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            You haven't searched for any voters yet.
          </Typography>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/")}
              startIcon={<SearchIcon />}
            >
              Start Searching
            </Button>
          </motion.div>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Search History
          </Typography>

          <Stack direction="row" spacing={2}>
            <Tooltip
              title={`Sort by ${
                sortOrder === "newest" ? "oldest" : "newest"
              } first`}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={toggleSortOrder}
                startIcon={<SortIcon />}
                size={isMobile ? "small" : "medium"}
              >
                {sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </Button>
            </Tooltip>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setConfirmClearOpen(true)}
              startIcon={<DeleteIcon />}
              size={isMobile ? "small" : "medium"}
              disabled={history.length === 0}
            >
              Clear History
            </Button>
          </Stack>
        </Box>

        <AnimatePresence>
          <Box>
            {sortedHistory.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card
                  sx={{
                    mb: 2,
                    borderLeft: 5,
                    borderColor:
                      item.status === "success" ? "success.main" : "error.main",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                  variant="outlined"
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        {item.status === "success" ? (
                          <CheckCircleIcon color="success" fontSize="large" />
                        ) : (
                          <ErrorIcon color="error" fontSize="large" />
                        )}
                      </Grid>

                      <Grid item xs>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          noWrap
                        >
                          ID: {item.id}
                        </Typography>

                        {item.status === "success" && item.data?.names && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            Name: {item.data.names}
                          </Typography>
                        )}

                        {item.status === "success" &&
                          item.data?.pollingStation && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              Station: {item.data.pollingStation}
                            </Typography>
                          )}

                        {item.status === "error" && (
                          <Typography variant="body2" color="error" noWrap>
                            {item.message || "Error fetching details"}
                          </Typography>
                        )}

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ mt: 1 }}
                        >
                          Searched:{" "}
                          {format(
                            new Date(item.timestamp),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            size="small"
                            label={
                              item.status === "success" ? "Success" : "Failed"
                            }
                            color={
                              item.status === "success" ? "success" : "error"
                            }
                            variant="outlined"
                          />

                          <Tooltip title="View/Re-search this ID">
                            <IconButton
                              color="primary"
                              onClick={() => handleViewDetails(item)}
                              size="small"
                            >
                              <SearchIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </AnimatePresence>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmClearOpen}
          onClose={() => setConfirmClearOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Clear Search History?"}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to clear all your search history? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmClearOpen(false)}>Cancel</Button>
            <Button onClick={handleClearHistory} color="error" autoFocus>
              Clear History
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default HistoryPage;
