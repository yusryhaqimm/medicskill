// src/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  date: string;
};

type CartContextType = {
  cart: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (id: number) => void;
  getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    setCart((prevCart) => [...prevCart, course]);
  };

  const removeCourse = (id: number) => {
    setCart((prevCart) => prevCart.filter((course) => course.id !== id));
  };

  const getCartCount = () => cart.length;

  return (
    <CartContext.Provider
      value={{ cart, addCourse, removeCourse, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
