import axios from "axios"
export const getAllBooks = async() =>{
    const response = await axios.get('http://localhost:5232/api/books/lists');
    return response.data.allBooks;
}
export const getSingleBook = async(bookId:string)=>{
    const response = await axios.get(`http://localhost:5232/api/books/${bookId}`);
    return response.data.singleBook;
}