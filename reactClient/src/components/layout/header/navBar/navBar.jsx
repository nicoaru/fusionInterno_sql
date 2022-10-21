import React from "react";
import logoFusion from '../../../../recursos/logo-fusion-2.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom';

// const pages = ['Home', 'Cargar Pedido', 'Ver Pedidos'];
const pages = [
              {page: 'Home', to: '/'}, 
              {page: 'Cargar Pedido', to: '/carga-pedido'}, 
              {page: 'Ver Pedidos', to: '/pedidos'},
              {page: 'Generar Despiece', to: 'generar-despiece'},
            ];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar 
      position="static"
      color="transparent"
      elevation={2}
      sx={{position: 'fixed',zIndex: 'appBar', width: '100%', backgroundColor: 'white'}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters
          sx={{ pt: {md: 3, xs: 0}, display: { xs: 'flex', md: 'block' }, alignItems: 'center' }}
        >
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center'}}>
            <img src={logoFusion} height='50px' alt='logo'/>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          {pages.map((object) => (
            <Button
              key={object.page}
              href={object.to}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, px: '30px', color: 'black' }}
            >
              {object.page}
            </Button>
          ))}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'start'}}>
            <img src={logoFusion} height='35px' alt='logo'/>
          </Box>
          <Box sx={{ pt:'10px', flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((object) => (
                <MenuItem key={object.page} 
                component={NavLink}
                to={object.to}
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{object.page}</Typography>
                </MenuItem>
              ))}

              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>


          {/* Fin Mobile Menu */}



        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { NavBar };