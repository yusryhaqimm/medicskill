import React, { createContext, useState, useContext } from "react";

// Define the AuthContext type
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  // Function to handle login
  const login = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Unable to log in.");
      return;
    }

    try {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

      if (guestCart.length > 0) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Merge guest cart with backend cart
        const mergeResponse = await fetch(
          "http://127.0.0.1:8000/api/cart/merge/",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ cart: guestCart }),
          }
        );

        if (!mergeResponse.ok) {
          throw new Error("Failed to merge guest cart with backend cart.");
        }

        // Clear guest cart after successful merge
        localStorage.removeItem("guestCart");
      }

      // Mark the user as logged in
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error during login or cart merge:", error);
    }
  };

  // Function to handle logout
  const logout = () => {
    // Clear all authentication-related storage
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("guestCart");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext for direct use
export { AuthContext };

// Custom hook for consuming AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
