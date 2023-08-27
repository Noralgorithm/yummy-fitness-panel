import { useState } from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate, useLocation } from 'react-router-dom'

const ROUTES_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Mis Productos',
  '/products/create': 'Agregar nuevo producto'
}

const DRAWER_WIDTH = 260

function Appbar({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={() => navigate('/products')}>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Mis Productos" />
        </ListItemButton>
      </List>
    </Drawer>
  )

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="italic">
            {ROUTES_TITLES[location.pathname]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Appbar
