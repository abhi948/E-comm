import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Stack, useMediaQuery, useTheme, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Home", to: "/" },
    { name: 'Profile', to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile" },
    { name: loggedInUser?.isAdmin ? 'Orders' : 'My orders', to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" },
    { name: 'Logout', to: "/logout" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        color: 'text.primary',
        // Add a gradient overlay similar to the Footer
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #FF9933, #FFF7E6, #138808)',
          opacity: 0.15,
          zIndex: 0,
        },
      }}
    >
      <Toolbar
        sx={{
          p: 1.5,
          height: "4.5rem",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 'xl',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1, // ensure toolbar content appears above overlay
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontFamily: "'Poppins', sans-serif",
            '& span.hindi': {
              fontWeight: 700,
              letterSpacing: '0.1em',
            },
            '& span.english': {
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: '0.9em',
              display: { xs: 'none', md: 'inline' }
            }
          }}
        >
          <span className="hindi">कलाकार</span>
          <span className="english">| Artisan Marketplace</span>
        </Typography>

        <Stack
          flexDirection="row"
          alignItems="center"
          spacing={2}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0.5,
                border: '2px solid',
                borderColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <Avatar
                alt={userInfo?.name}
                src="/broken-image.jpg"
                sx={{
                  bgcolor: 'primary.main',
                  width: 32,
                  height: 32
                }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{
              mt: '45px',
              '& .MuiPaper-root': {
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.light',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  to="/admin/add-product"
                  sx={{
                    textDecoration: "none",
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Add new Product
                </Typography>
              </MenuItem>
            )}
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  to={setting.to}
                  sx={{
                    textDecoration: "none",
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          <Typography
            variant='h6'
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {is480 ? `${userInfo?.name.split(" ")[0]}` : `Namaste, ${userInfo?.name}`}
          </Typography>

          {loggedInUser?.isAdmin && (
            <Button
              variant='contained'
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Admin
            </Button>
          )}

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            {cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color='error'>
                <IconButton
                  onClick={() => navigate("/cart")}
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <ShoppingCartOutlinedIcon color="primary" />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && (
              <Badge badgeContent={wishlistItems?.length} color='error'>
                <IconButton
                  component={Link}
                  to="/wishlist"
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <FavoriteBorderIcon color="primary" />
                </IconButton>
              </Badge>
            )}

            {isProductList && (
              <IconButton
                onClick={handleToggleFilters}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <TuneIcon sx={{ color: isProductFilterOpen ? "primary.main" : "text.primary" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
