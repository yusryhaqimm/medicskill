import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// Define the Course type
export type Course = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  date: string;
  location: string;
  address: string;
  image: string;
};

// Define the CartContextType
type CartContextType = {
  cart: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
  getCartCount: () => number;
  setCart: (courses: Course[]) => void;
  syncCart: () => Promise<void>;
  clearCart: () => void; // Added function to clear the cart
};

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    setCart((prevCart) => {
      // Check if the course with the same session date already exists
      const exists = prevCart.some(
        (item) => item.id === course.id && item.date === course.date
      );
      if (exists) {
        return prevCart; // If exists, do not add it again
      }
      return [...prevCart, course]; // Add course to the cart
    });

    // For guest users, persist the cart in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      guestCart.push(course);
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
    }
  };

  const removeCourse = (id: string) => {
    setCart((prevCart) => prevCart.filter((course) => course.id !== id));

    // For guest users, persist updated cart in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      const updatedCart = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      ).filter((course: Course) => course.id !== id);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const getCartCount = () => cart.length;

  const syncCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Fetch cart from backend for logged-in users
        const response = await axios.get("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cartItems = response.data.map((item: any) => {
          const { course_details, session_details, location_details } = item;

          return {
            id: `${item.id}-${item.session_id || "no-session"}`,
            title: course_details?.title || "Untitled Course",
            description:
              course_details?.description || "No description available.",
            shortDescription:
              course_details?.short_description ||
              "No short description available.",
            price: session_details?.price || 0,
            date: session_details?.date || "N/A",
            location: location_details?.name || "Unknown location",
            address: location_details?.address || "No address provided",
            image: course_details?.image || "/src/assets/course.png",
          };
        });

        setCart(cartItems);
      } else {
        // Fetch cart from localStorage for guests
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCart(guestCart);
      }
    } catch (error) {
      console.error("Error synchronizing cart:", error);

      // Fallback to localStorage for guests in case of backend issues
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setCart(guestCart);
    }
  };

  const clearCart = () => {
    setCart([]);

    // Clear cart in localStorage for guests
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("guestCart");
    } else {
      // Clear cart in backend for logged-in users
      axios
        .delete("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((error) =>
          console.error("Error clearing cart in backend:", error)
        );
    }
  };

  useEffect(() => {
    // Synchronize the cart on component mount
    syncCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCourse,
        removeCourse,
        getCartCount,
        setCart,
        syncCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
