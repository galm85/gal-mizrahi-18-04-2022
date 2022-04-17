import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Switch } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';
import { handleMetric } from '../redux/actions/settingActions';
import DarkModeSwitch from './darkSwitch';
import { useNavigate } from 'react-router-dom';
import MetricSwitch from './metricSwitch';
import SettingsIcon from '@mui/icons-material/Settings';






export default function Navbar() {

  const {darkMode,metric} = useSelector(state=>state.settingReducer);
  const {currentCity} = useSelector(state=>state.weatherReducer);
  const navigate = useNavigate()
  const dispatch = useDispatch();

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
                <NavLink to='/' style={{color:'white'}}>
                    <HomeIcon />
                </NavLink>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <NavLink to='/favorite' style={{color:'white'}}>
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
              <SettingsIcon />
            </IconButton>

            {/* <Switch defaultChecked={metric} color="secondary" onChange={()=>{dispatch(handleMetric())}} />
            <DarkModeSwitch darkMode={darkMode}/> */}
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
