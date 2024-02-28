import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import { useState } from 'react';
import { VideoPopup } from '../components/VideoPopup';

export function RootLayout() {
  const datasets = [{ displayedName: 'Brain Tissue', name: 'brain-tissue' }];

  // video
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar component="nav" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              FHS-BAP Brain Data Portal: An Integrated Data Query System
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left" PaperProps={{ sx: { backgroundColor: '#e9ecef' } }}>
        <Toolbar />
        <Box sx={{ width: 300 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {datasets.map((dataset) => (
              <ListItem key={dataset.name} disablePadding>
                <ListItemButton component={NavLink} to={`/datasets/${dataset.name}`}>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary={dataset.displayedName} />
                  <ChevronRightIcon />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                  <OndemandVideoIcon />
                </ListItemIcon>
                <ListItemText primary="Demo" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="about">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="contact">
                <ListItemIcon>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText primary="Contact" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          position: 'fixed',
          top: 65,
          left: 300,
          padding: '3rem',
          width: 'calc(100vw - 6rem - 300px)',
          height: 'calc(100% - 180px)',
          overflow: 'auto'
        }}
      >
        <Outlet />
      </Box>
      <VideoPopup open={open} onClose={handleClose} />
    </>
  );
}
