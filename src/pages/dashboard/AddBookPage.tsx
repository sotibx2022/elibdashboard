import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea" // Assuming you have a Textarea component for description
import { Button } from "@/components/ui/button" // Assuming you have a Button component
import { BookCreate } from "@/types/types"
import { useForm } from "react-hook-form"
import { validateBookTitle, validateDescription, validateFile, validateFullName } from "@/helper/validateBook"
import { validateFirstName } from "@/helper/validation"
import { useMutation } from "react-query"
import { createBook } from "@/helper/bookMutation"
import LoadingButton from "@/customUI/LoadingButton"
import { useNavigate } from "react-router-dom"
const AddBookPage = () => {
  const navigate = useNavigate()
    const{register, formState:{errors}, handleSubmit} = useForm<BookCreate>();
    const mutatation = useMutation({
        mutationFn:createBook,
        onSuccess:(data)=>{
            alert(data.message);
navigate('/dashboard/books');
        },
        onError:(error)=>{
          if(error instanceof Error){
            alert("There is and error while creating book.")
          }
           alert("An Unexpected Error Occuered.") 
        }
    })
    const onSubmit =(data:BookCreate) =>{
        mutatation.mutate(data)
    }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add the Book</CardTitle>
          <CardDescription>
            You can add the book related to web development technologies.
          </CardDescription>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title */}
              <div className="mb-4">
                <Label htmlFor="title">Book Title</Label>
                <Input id="title"  placeholder="Enter book title" {...register("title",validateBookTitle())} />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>
              {/* Author */}
              <div className="mb-4">
                <Label htmlFor="author">Author</Label>
                <Input id="author" type="text" placeholder="Author Name" {...register("author", validateFullName())}/>
                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
              </div>
              {/* Genre */}
              <div className="mb-4">
                <Label htmlFor="genre">Genre</Label>
                <Input id="genre" type="text" placeholder="Genre (e.g., Web Development)" {...register("genre" , validateFirstName())}/>
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
                <Input id="coverImage" type="file" {...register("coverImage",validateFile())}/>
                {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}
              </div>
              {/* PDF File */}
              <div className="mb-4">
                <Label htmlFor="file">Upload PDF</Label>
                <Input id="file" type="file" {...register("file", validateFile())} />
                {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
              </div>
              {/* Submit Button */}
               <Button type="submit" disabled={mutatation.isLoading}>
{mutatation.isLoading ? <LoadingButton/>:"Submit"}
</Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
export default AddBookPage
