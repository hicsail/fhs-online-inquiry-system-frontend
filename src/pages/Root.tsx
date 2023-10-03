import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Footer } from '../components/Footer';

export function RootLayout() {
  const [footerOpen, setFooterOpen] = useState(false);

  const datasets = [{ displayedName: 'Brain Data', name: 'brain-data' }];

  // handler for footer
  const handleFooterOpen = () => setFooterOpen(true);
  const handleFooterClose = () => setFooterOpen(false);

  return (
    <>
      <AppBar component="nav" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              Brain Aging Program Data
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
      <Box position="absolute" bottom={0} left={0} height={20} width="100%" onMouseOver={handleFooterOpen}>
        <Drawer anchor="bottom" variant="persistent" open={footerOpen} onMouseLeave={handleFooterClose}>
          <Footer />
        </Drawer>
      </Box>
    </>
  );
}
