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

function TermsPage() {
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
          <Typography color="text.primary">Terms of Service</Typography>
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
            Terms of Service
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
              1. Acceptance of Terms
            </Typography>
            <Typography paragraph>
              By accessing or using the Polling Station Finder application
              ("Service"), you agree to be bound by these Terms of Service
              ("Terms"). If you disagree with any part of the terms, you may not
              access the Service.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              2. Description of Service
            </Typography>
            <Typography paragraph>
              Polling Station Finder is an application designed to help voters
              in Uganda locate their assigned polling stations by entering their
              Voter Identification Number (VIN). The Service includes features
              such as polling station search, mapping, directions, and search
              history.
            </Typography>
            <Typography paragraph>
              We strive to provide accurate information but cannot guarantee the
              accuracy, completeness, or timeliness of the information provided.
              Always verify polling station information with official Electoral
              Commission sources before election day.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              3. User Responsibilities
            </Typography>
            <Typography paragraph>
              When using our Service, you agree to:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <li>
                <Typography paragraph>
                  Provide accurate Voter Identification Numbers for searching
                  purposes.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Use the Service only for its intended purpose of finding
                  polling station information.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Not attempt to probe, scan, or test the vulnerability of the
                  Service or breach any security or authentication measures.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Not attempt to interfere with the proper functioning of the
                  Service.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Not use the Service for any illegal purpose or in violation of
                  any local, state, national, or international law.
                </Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              4. Intellectual Property
            </Typography>
            <Typography paragraph>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Polling Station
              Finder and its licensors. The Service is protected by copyright,
              trademark, and other laws of both Uganda and foreign countries.
            </Typography>
            <Typography paragraph>
              Our name, logo, and all related names, logos, product and service
              names, designs, and slogans are trademarks of Polling Station
              Finder or its affiliates or licensors. You must not use such marks
              without our prior written permission.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              5. Third-Party Services
            </Typography>
            <Typography paragraph>
              Our Service utilizes third-party services, including Google Maps.
              Your use of these services may be subject to additional terms and
              conditions provided by the respective third parties. We do not
              control, and assume no responsibility for, the content, privacy
              policies, or practices of any third-party services.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              6. Limitation of Liability
            </Typography>
            <Typography paragraph>
              In no event shall Polling Station Finder, its directors,
              employees, partners, agents, suppliers, or affiliates be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <li>
                <Typography paragraph>
                  Your access to or use of or inability to access or use the
                  Service.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Any conduct or content of any third party on the Service.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Any content obtained from the Service.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Unauthorized access, use, or alteration of your transmissions
                  or content.
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Inaccurate information provided by the Service regarding
                  polling station locations or other details.
                </Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              7. Disclaimer of Warranties
            </Typography>
            <Typography paragraph>
              Your use of the Service is at your sole risk. The Service is
              provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
              provided without warranties of any kind, either express or
              implied, including, but not limited to, implied warranties of
              merchantability, fitness for a particular purpose,
              non-infringement, or course of performance.
            </Typography>
            <Typography paragraph>
              We do not warrant that: (a) the Service will function
              uninterrupted, secure, or available at any particular time or
              location; (b) any errors or defects will be corrected; (c) the
              Service is free of viruses or other harmful components; or (d) the
              results of using the Service will meet your requirements.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              8. Indemnification
            </Typography>
            <Typography paragraph>
              You agree to defend, indemnify, and hold harmless Polling Station
              Finder and its licensees and licensors, and their employees,
              contractors, agents, officers, and directors, from and against any
              and all claims, damages, obligations, losses, liabilities, costs
              or debt, and expenses (including but not limited to attorney's
              fees) arising from your use of and access to the Service.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              9. Governing Law
            </Typography>
            <Typography paragraph>
              These Terms shall be governed and construed in accordance with the
              laws of Uganda, without regard to its conflict of law provisions.
            </Typography>
            <Typography paragraph>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              10. Changes to Terms
            </Typography>
            <Typography paragraph>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </Typography>
            <Typography paragraph>
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use the Service.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default TermsPage;
