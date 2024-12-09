import axios from "axios";

// Updated Course Type
export type Course = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  category: string;
  meta_description?: string;
  instructor: {
    id: string;
    name: string;
    bio: string;
  };
  image: string | null;
  sessions: {
    id: string;
    date: string;
    location: {
      id: string;
      name: string;
      address: string;
    };
    price: number;
  }[];
};

// Optional separate Session type
export type Session = Course["sessions"][number];

// Create a centralized Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>("courses/");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

// Fetch a single course by ID
export const fetchCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await api.get<Course>(`courses/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

// Fetch session details by session ID
export const fetchSessionById = async (sessionId: string): Promise<Session> => {
  try {
    const response = await api.get<Session>(`sessions/${sessionId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching session with ID ${sessionId}:`, error);
    throw error;
  }
};
