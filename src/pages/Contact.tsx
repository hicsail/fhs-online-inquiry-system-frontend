import { Box, Divider, Link, Typography } from '@mui/material';

export function ContactPage() {
  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Box>
        <Typography variant="h5" textAlign="left" fontWeight="bold">
          Contact Us
        </Typography>
        <Divider sx={{ width: '70%' }} />
        <Typography variant="body1" textAlign="left">
          <p>
            For bug reporting and feature suggestions, please provide the information at:{' '}
            <Link href="https://www.bumc.bu.edu/fhs-bap/contact/">https://www.bumc.bu.edu/fhs-bap/contact/</Link>
          </p>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" textAlign="left" fontWeight="bold">
          Mailing address
        </Typography>
        <Divider sx={{ width: '70%' }} />
        <Typography variant="body1" textAlign="left">
          <p>
            Boston University School of Medicine
            <br />
            Framingham Heart Study Brain Aging Program
            <br />
            72 East Concord Street, Room E200
            <br />
            Boston, MA 02118
          </p>
          <p>
            Email: <Link href="mailto:fhsbap@bu.edu">fhsbap@bu.edu</Link>
          </p>
        </Typography>
      </Box>
    </Box>
  );
}
