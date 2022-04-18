import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {AppBar,Box,Toolbar,IconButton,Typography,MenuItem,Menu,} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// components
import DarkModeSwitch from './darkSwitch';
import MetricSwitch from './metricSwitch';

// icons
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';



export default function Navbar() {

  const {darkMode} = useSelector(state=>state.settingReducer);
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{display:'flex',justifyContent:'right'}}>
        <DarkModeSwitch darkMode={darkMode}/>
      </MenuItem>

      <MenuItem style={{display:'flex',justifyContent:'right'}}>
          <MetricSwitch /> 
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>{handleMobileMenuClose();navigate('/')}}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" >
            <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>

      <MenuItem onClick={()=>{handleMobileMenuClose();navigate('/favorite')}}>
        <IconButton size="large" aria-label="Home" color="inherit">          
            <FavoriteIcon />
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      
      <MenuItem style={{display:'flex',justifyContent:'right'}}>
        <DarkModeSwitch darkMode={darkMode}/>
      </MenuItem>

      <MenuItem style={{display:'flex',justifyContent:'right'}}>
          <MetricSwitch /> 
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}  >
      <AppBar position="static" style={{background: darkMode ? 'black' : '#1565c0'}}>
        <Toolbar >
          <Typography variant="h6" noWrap component="div">
             <p className='app-title'> Herolo Weather Task</p>
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} style={{alignItems:'center'}}>
            
            <IconButton size="large" aria-label="show 4 new mails" >
                <NavLink className={(navData)=>navData.isActive ? 'activeNav' : 'nonActive'} to='/' >
                    <HomeIcon />
                </NavLink>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <NavLink className={(navData)=>navData.isActive ? 'activeNav' : 'nonActive'} to='/favorite' >
                    <FavoriteIcon />
                </NavLink>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <NavLink to='#' style={{color:'white'}}>
                <SettingsIcon />
              </NavLink>
            </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
