import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

function DisclaimerPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Disclaimer</Typography>
        </Breadcrumbs>

        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
            fontWeight="bold"
          >
            Disclaimer
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Information Accuracy
            </Typography>
            <Typography paragraph>
              The information provided by Polling Station Finder ("we," "us," or
              "our") on our application is for general informational purposes
              only. All information on the application is provided in good
              faith, however, we make no representation or warranty of any kind,
              express or implied, regarding the accuracy, adequacy, validity,
              reliability, availability, or completeness of any information on
              the application.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Not Official Electoral Commission Tool
            </Typography>
            <Typography paragraph>
              This application is not affiliated with, endorsed by, or
              officially connected with the Electoral Commission of Uganda or
              any government agency. This is an independent tool created to
              assist voters in finding their polling stations based on publicly
              available information.
            </Typography>
            <Typography paragraph>
              For the most accurate and up-to-date information, please consult
              the official Electoral Commission of Uganda website or contact
              their offices directly.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              External Links Disclaimer
            </Typography>
            <Typography paragraph>
              The application may contain links to external websites that are
              not provided or maintained by or in any way affiliated with us.
              Please note that we do not guarantee the accuracy, relevance,
              timeliness, or completeness of any information on these external
              websites.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Mapping Services
            </Typography>
            <Typography paragraph>
              Map and location data is provided through third-party services and
              may not accurately represent the exact location of polling
              stations. Users should verify the location with official sources
              before traveling to a polling station.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Use at Your Own Risk
            </Typography>
            <Typography paragraph>
              Your use of this application is at your sole risk. The application
              is provided "as is" and "as available" without warranties of any
              kind, either express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular
              purpose, non-infringement, or course of performance.
            </Typography>
            <Typography paragraph>
              In no event will we, our affiliates, or their licensors, service
              providers, employees, agents, officers, or directors be liable for
              damages of any kind, under any legal theory, arising out of or in
              connection with your use, or inability to use, the application,
              including any direct, indirect, special, incidental,
              consequential, or punitive damages.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default DisclaimerPage;
