// src/components/Header.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import mslogo from "../assets/mslogo.png"; // Import logo image
import { useCart } from "../context/CartContext"; // Import CartContext
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const Header = () => {
  const { getCartCount } = useCart(); // Get cart count from context
  const { isLoggedIn, logout } = useAuth(); // Use AuthContext
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src={mslogo}
              alt="Logo"
              style={{ height: 100, marginRight: 10, cursor: "pointer" }}
            />
          </Link>
        </Box>

        {/* Navbar Links */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button component={Link} to="/about-us" color="inherit">
            About Us
          </Button>
          <Button component={Link} to="/courses" color="inherit">
            Courses Offered
          </Button>
          <Button component={Link} to="/articles" color="inherit">
            Articles
          </Button>
          <Button component={Link} to="/trainers" color="inherit">
            Trainers
          </Button>

          {/* Contact Us Dropdown */}
          <Button color="inherit" onClick={handleMenuOpen}>
            Contact Us
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/contact-us/inquiries"
              onClick={handleMenuClose}
            >
              Inquiries
            </MenuItem>
            <MenuItem
              component={Link}
              to="/contact-us/join-as-trainer"
              onClick={handleMenuClose}
            >
              Join as Trainer
            </MenuItem>
          </Menu>

          {/* Shopping Cart with Badge */}
          <IconButton component={Link} to="/shopping-cart" color="inherit">
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Conditional Buttons for Login/Profile */}
          {isLoggedIn ? (
            <>
              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
