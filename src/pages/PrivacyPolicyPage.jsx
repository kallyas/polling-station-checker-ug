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

function PrivacyPolicyPage() {
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
          <Typography color="text.primary">Privacy Policy</Typography>
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
            Privacy Policy
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            color="text.secondary"
          >
            Last Updated: May 14, 2025
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Introduction
            </Typography>
            <Typography paragraph>
              At Polling Station Finder, we respect your privacy and are
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you use our application.
            </Typography>
            <Typography paragraph>
              We do not collect personal data beyond what is necessary to
              provide our service. Please read this policy carefully to
              understand our practices regarding your information.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Information We Collect
            </Typography>
            <Typography paragraph>
              When you use our application, we collect the following types of
              information:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <li>
                <Typography paragraph>
                  <strong>Voter Identification Number (VIN)</strong>: When you
                  enter your VIN to search for your polling station, we
                  temporarily process this information to retrieve your polling
                  station details.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  <strong>Search History</strong>: We store your search history
                  locally on your device to make it easier for you to access
                  previously searched information. This data never leaves your
                  device and is not accessible to us.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  <strong>Location Data</strong>: If you choose to use the
                  mapping features that require your current location, we
                  request access to your geolocation data. This information is
                  only used to show your location on the map and calculate
                  directions to polling stations. We do not store or track your
                  location.
                </Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              How We Use Your Information
            </Typography>
            <Typography paragraph>
              We use the information we collect for the following purposes:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <li>
                <Typography paragraph>
                  To provide and maintain our service, allowing you to search
                  for your polling station.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  To provide mapping functionality and directions to polling
                  stations when requested.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  To maintain a record of your recent searches on your local
                  device only.
                </Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Data Storage and Security
            </Typography>
            <Typography paragraph>
              Your search history is stored only on your device using your
              browser's local storage. This data does not get transmitted to our
              servers. We do not maintain a database of user searches or user
              information.
            </Typography>
            <Typography paragraph>
              Your VIN is only used for the immediate purpose of retrieving your
              polling station information and is not stored by us. Any
              communication with our servers is encrypted using
              industry-standard protocols.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Third-Party Services
            </Typography>
            <Typography paragraph>
              Our application uses Google Maps to provide location-based
              services. When you use these features, Google may collect
              information as described in their Privacy Policy. We encourage you
              to review Google's Privacy Policy at{" "}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </Link>
              .
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Your Rights
            </Typography>
            <Typography paragraph>
              Since we store minimal information and most data is kept locally
              on your device, you maintain control over your data. You can:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <li>
                <Typography paragraph>
                  Clear your search history at any time through the application
                  interface.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Deny or revoke location permissions through your device or
                  browser settings.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Clear local storage through your browser settings to remove
                  all application data.
                </Typography>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Changes to This Privacy Policy
            </Typography>
            <Typography paragraph>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date at the top.
            </Typography>
            <Typography paragraph>
              For questions about this Privacy Policy, please contact us at
              privacy@pollingstationfinder.ug.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default PrivacyPolicyPage;
