import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import TrainersPage from "./pages/TrainersPage";
import InquiriesPage from "./pages/InquiriesPage";
import JoinAsTrainerPage from "./pages/JoinAsTrainerPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CssBaseline } from "@mui/material";
import RegistrationPage from "./pages/RegistrationPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlesPage from "./pages/ArticlesPage";
import SingleArticlePage from "./pages/SingleArticlePage"; // Import SingleArticlePage

function App() {
  return (
    <CartProvider>
      <Router>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<SingleArticlePage />} />{" "}
          {/* Add route for SingleArticlePage */}
          <Route path="/contact-us/inquiries" element={<InquiriesPage />} />
          <Route
            path="/contact-us/join-as-trainer"
            element={<JoinAsTrainerPage />}
          />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/payment-gateway" element={<PaymentGatewayPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
