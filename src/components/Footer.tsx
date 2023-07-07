import { Box, Container, Grid, Link, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FC } from 'react';
import fhslogo from '../assets/fhs-logo.svg';

export const Footer: FC = () => {
  return (
    <Box
      component="footer"
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      sx={{ background: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]), p: 6 }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item>
            <img src={fhslogo} alt="FHS logo" style={{ width: '55px', marginRight: '10px', shapeRendering: 'geometricPrecision' }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" textAlign="left" fontWeight={600} fontFamily="serif">
              Framingham Heart Study
            </Typography>
            <Typography variant="subtitle2" textAlign="left" fontFamily="serif">
              Three Generations of Dedication
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" textAlign="left" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Project Description
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Framingham Heart Study
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Brain Aging Program
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" textAlign="left" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Phone
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Email
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Bug Reporting
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="left" gutterBottom>
              <Link href="#" color="inherit" underline="none">
                Feature Suggestions
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" textAlign="left" paddingLeft="11px">
              Social
            </Typography>
            <Grid container justifyContent="flex-start">
              <IconButton aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram">
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
