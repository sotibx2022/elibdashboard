import { BookCreate } from "@/types/types";
import { APIResponse } from "./mutation";
import axios from "axios";
export const findAccessToken =() =>{
    const token = localStorage.getItem('accessToken')
    return token
}
export const createBook = async (data: BookCreate): Promise<APIResponse> => {
    try {
      const token = findAccessToken(); // Get the token
      console.log(token);
      const formData = new FormData();
formData.append('title', data.title);
formData.append('author', data.author);
formData.append('genre', data.genre);
formData.append('description', data.description);
formData.append('coverImage', data.coverImage[0]); // assuming this is a file object
formData.append('pdf', data.file[0]); // assuming this is another file object
      const response = await axios.post(
        'http://localhost:5232/api/books',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to Authorization header
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle errors properly
      return {
        message: "There is something went wrong to create book",
        success: false,
        status: 400,
      };
    }
  };