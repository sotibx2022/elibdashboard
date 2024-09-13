import { BookCreate } from "@/types/types";
import { APIResponse } from "./mutation";
import axios from "axios";
export const createBook = async(data:BookCreate):Promise<APIResponse> =>{
try {
const response = await axios.post('http://localhost:5232/api/books',data);
return response.data;
} catch (error) {
    return {
        message:"There is something went wrong to create book",
        success:false,
        status:400,
    }
}
}