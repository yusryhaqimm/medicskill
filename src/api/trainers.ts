import axios from "axios";

// Define the Trainer type
export type Trainer = {
  id: string;
  name: string;
  short_description: string;
  description: string;
  image: string | null; // Backend should provide the full image URL
};

// Fetch all trainers
export const fetchTrainers = async (): Promise<Trainer[]> => {
  const response = await axios.get("http://127.0.0.1:8000/api/trainers/"); // Replace with your API URL
  return response.data;
};

// Fetch a single trainer by ID
export const fetchTrainerById = async (id: string): Promise<Trainer> => {
  const response = await axios.get(`http://127.0.0.1:8000/api/trainers/${id}/`);
  return response.data;
};
