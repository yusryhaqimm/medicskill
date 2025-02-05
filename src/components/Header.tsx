import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import mslogo from "../assets/mslogo.png"; // Import logo image
import { useCart } from "../context/CartContext"; // Import CartContext
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const Header = () => {
  const { getCartCount } = useCart(); // Get cart count from context
  const { isLoggedIn, logout } = useAuth(); // Use AuthContext
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.get(
        `${API_BASE_URL}/notifications/list/unread/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data);
      setUnreadCount(response.data.length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Polling for notifications every 10 seconds
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      fetchNotifications(); // Initial fetch
      const interval = setInterval(fetchNotifications, 60000); // Poll every 10 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isLoggedIn]);

  // Mark a notification as read
  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      await axios.post(
        `${API_BASE_URL}/notifications/list/${id}/mark-as-read/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the notification from the list
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );

      // Update unread count
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
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
          <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            Contact Us
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              component={Link}
              to="/contact-us/inquiries"
              onClick={() => setAnchorEl(null)}
            >
              Inquiries
            </MenuItem>
            <MenuItem
              component={Link}
              to="/contact-us/join-as-trainer"
              onClick={() => setAnchorEl(null)}
            >
              Join as Trainer
            </MenuItem>
          </Menu>

          {/* Notification Bell with Badge */}
          <IconButton
            color="inherit"
            onClick={(e) => setNotifAnchorEl(e.currentTarget)}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            open={Boolean(notifAnchorEl)}
            anchorEl={notifAnchorEl}
            onClose={() => setNotifAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ p: 2, width: "300px" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Notifications
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : notifications.length === 0 ? (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  No new notifications.
                </Typography>
              ) : (
                <List>
                  {notifications.map((notification) => (
                    <ListItem
                      key={notification.id}
                      component="div"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        padding: "10px",
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {notification.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        {notification.message}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Popover>

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
