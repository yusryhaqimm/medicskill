import axios from "axios";

// Updated Course Type
export type Course = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  instructor: {
    id: string;
    name: string;
    bio: string;
  };
  image: string | null;
  available_dates: {
    id: string;
    date: string;
    pricing: {
      id: string;
      location: {
        id: string;
        name: string;
        address: string;
      };
      price: number;
    }[];
  }[];
};

// Optional separate SessionPricing type
export type SessionPricing = Course["available_dates"][number]["pricing"][number];

// Create a centralized Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get("courses/");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

// Fetch a single course by ID
export const fetchCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await api.get(`courses/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

// Fetch session pricing by session ID
export const fetchSessionPricing = async (
  sessionId: string
): Promise<SessionPricing[]> => {
  try {
    const response = await api.get(`sessions/${sessionId}/pricing/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pricing for session ${sessionId}:`, error);
    return [];
  }
};
