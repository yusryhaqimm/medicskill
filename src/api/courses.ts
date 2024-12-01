import axios from "axios";

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
  price: number;
  image: string | null;
  available_dates: { id: string; date: string }[];
};

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await axios.get("http://127.0.0.1:8000/api/courses/");
  return response.data;
};

// Fetch a single course by ID
export const fetchCourseById = async (id: string): Promise<Course> => {
  const response = await axios.get(`http://127.0.0.1:8000/api/courses/${id}/`);
  return response.data;
};
