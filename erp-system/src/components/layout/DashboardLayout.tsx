import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Settings,
  Assignment
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth.types';
import { RoleBasedGuard } from '../common/RoleBasedGuard';

const drawerWidth = 240;

export const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          ERP System
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {/* Everyone sees Dashboard */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>

        {/* Only Manager and above see Employees */}
        <RoleBasedGuard requiredRole={UserRole.MANAGER}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/employees')}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Manage Employees" />
            </ListItemButton>
          </ListItem>
        </RoleBasedGuard>

        {/* Only Admin and above see Settings */}
        <RoleBasedGuard requiredRole={UserRole.ADMIN}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/settings')}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItemButton>
          </ListItem>
        </RoleBasedGuard>

         {/* Everyone sees their Tasks */}
         <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/tasks')}>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="My Tasks" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Welcome, {user?.name} ({user?.role})
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
