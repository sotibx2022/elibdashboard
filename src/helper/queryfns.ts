import axios from "axios"
export const getAllBooks = async() =>{
    const response = await axios.get('http://localhost:5232/api/books/lists');
    return response.data.allBooks;
}