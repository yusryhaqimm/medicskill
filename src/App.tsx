import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import InquiriesPage from "./pages/InquiriesPage";
import JoinAsTrainerPage from "./pages/JoinAsTrainerPage";
import TrainersPage from "./pages/TrainersPage";
import CoursesPage from "./pages/CoursesPage";

// Shopping Flow
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutOptionPage from "./pages/CheckoutOptionPage";
import RegistrationPage from "./pages/RegistrationPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";

// User Account Pages
import LoginRegisterPage from "./pages/LoginRegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <CssBaseline />
          <Header />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<SingleArticlePage />} />
            <Route path="/contact-us/inquiries" element={<InquiriesPage />} />
            <Route
              path="/contact-us/join-as-trainer"
              element={<JoinAsTrainerPage />}
            />

            {/* Shopping and Checkout Flow */}
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/checkout-options" element={<CheckoutOptionPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/payment-gateway" element={<PaymentGatewayPage />} />

            {/* User Account Pages */}
            <Route path="/login" element={<LoginRegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/reset-password/:uid/:token"
              element={<ResetPasswordPage />}
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
