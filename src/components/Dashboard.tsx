import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export const Dashboard: FC = () => {
  const [open, setOpen] = useState(false);

  const datasets = [{ displayedName: 'Brain Data', name: 'brain_data' }];

  // handlers for sidebar
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Brain Aging Program Data
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="left" open={open} onClose={handleDrawerClose}>
        <Toolbar />
        <List>
          {datasets.map((dataset) => (
            <ListItem key={dataset.name} disablePadding>
              <ListItemButton>{dataset.displayedName}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};