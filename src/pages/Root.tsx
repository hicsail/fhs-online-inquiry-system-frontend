import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Footer } from '../components/Footer';

export function RootLayout() {
  const [open, setOpen] = useState(false);

  const datasets = [{ displayedName: 'Brain Data', name: 'brain-data' }];

  // handlers for sidebar
  const handleDrawerOpen = () => setOpen(!open);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <AppBar component="nav" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              Brain Aging Program Data
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <Toolbar />
        <Box sx={{ width: 'auto' }} onClick={handleDrawerClose}>
          <List>
            {datasets.map((dataset) => (
              <ListItem key={dataset.name} disablePadding>
                <ListItemButton component={NavLink} to={`/datasets/${dataset.name}`}>
                  {dataset.displayedName}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <main style={{ position: 'fixed', top: 0, left: 0, padding: '3rem', width: 'calc(100vw - 6rem)' }}>
        <Toolbar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
