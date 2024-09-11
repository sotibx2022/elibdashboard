import { RegisterData } from "@/types/types";
import axios from "axios"
import { AlertCircle } from "lucide-react";
interface RegisterAPIResponse{
    success:boolean, 
    status?:number,
    message:string,
    statusCode?:number,
}
export const registerUser = async (userData:RegisterData):Promise<RegisterAPIResponse> => {
  try {
    const response = await axios.post(`http://localhost:5232/api/users/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || "An error occurred during registration.",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Unknown error occurred.",
    };
  }
};