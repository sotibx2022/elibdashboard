import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component for description
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { BookCreate } from "@/types/types";
import { useForm } from "react-hook-form";
import { validateBookTitle, validateDescription, validateFile, validateFullName } from "@/helper/validateBook";
import { validateFirstName } from "@/helper/validation";
import { useMutation, useQuery } from "react-query";
import { createBook} from "@/helper/bookMutation"; // Assuming you have updateBook mutation too
import LoadingButton from "@/customUI/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleBook } from "@/helper/queryfns";
const AddBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { register, setValue, formState: { errors }, handleSubmit } = useForm<BookCreate>();
  // Fetch single book if bookId exists (edit mode)
  const { data: singleBook, isLoading: isBookLoading } = useQuery(
    ['singleBook', bookId],
    () => getSingleBook(bookId as string), // Pass the bookId correctly
    {
      enabled: !!bookId, // Only run this query if there's a bookId
      retry: false
    }
  );
  // If we're in edit mode, prefill the form with the fetched book data
  useEffect(() => {
      if(singleBook){
        setValue('title', singleBook.title);
      setValue('description', singleBook.description);
      setValue('author', singleBook.author);
      setValue('genre', singleBook.genre);
      setValue('coverImage', singleBook.coverImage);
      setValue('file', singleBook.file);
      }
  }, [singleBook]);
  // Create or Update mutation
  const mutation = useMutation({
    mutationFn: (data: BookCreate) => (bookId ? createBook(data, bookId) : createBook(data)),
    onSuccess: (data) => {
      alert(data.message);
      navigate('/dashboard/books');
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert("There was an error while creating or updating the book.");
      } else {
        alert("An unexpected error Occur.");
      }
    }
  });
  // Form submission handler
  const onSubmit = (data: BookCreate) => {
    mutation.mutate(data);
  };
  // If the book data is loading, show a loading state
  if (isBookLoading && bookId) {
    return <div>Loading book data...</div>;
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{bookId ? "Edit the Book" : "Add the Book"}</CardTitle>
          <CardDescription>
            {bookId ? "Edit the details of the book." : "You can add a new book related to web development technologies."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="mb-4">
              <Label htmlFor="title">Book Title</Label>
              <Input id="title" placeholder="Enter book title" {...register("title", validateBookTitle())} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            {/* Author */}
            <div className="mb-4">
              <Label htmlFor="author">Author</Label>
              <Input id="author" type="text" placeholder="Author Name" {...register("author", validateFullName())} />
              {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
            </div>
            {/* Genre */}
            <div className="mb-4">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" type="text" placeholder="Genre (e.g., Web Development)" {...register("genre", validateFirstName())} />
              {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
            </div>
            {/* Description */}
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of the book"
                rows={4}
                {...register("description", validateDescription())}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            {/* Cover Image */}
            <div className="mb-4">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input id="coverImage" type="file" {...register("coverImage", validateFile())} />
              {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}
            </div>
            {/* PDF File */}
            <div className="mb-4">
              <Label htmlFor="file">Upload PDF</Label>
              <Input id="file" type="file" {...register("file", validateFile())} />
              {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
            </div>
            {/* Submit Button */}
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? <LoadingButton /> : bookId ? "Update" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default AddBookPage;
