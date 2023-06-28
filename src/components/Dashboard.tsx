import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export const Dashboard: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="default">
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Brain Aging Program Data
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
