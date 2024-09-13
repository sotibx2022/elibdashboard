import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateEmail, validateFirstName, validateLastName, validatePassword } from "@/helper/validation"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { RegisterData } from "@/types/types"
import { useMutation } from "react-query"
import { registerUser } from "@/helper/mutation"
const RegisterPage = () => {
  const navigate = useNavigate()
  const mutatation = useMutation(
   {mutationFn:registerUser,
    onSuccess:(data)=>{
      alert(data.message);
      if(data.accessToken){
        localStorage.setItem('accessToken', data.accessToken);
      }
      navigate('/dashboard')
    },
    onError:(error)=>{
     if(error instanceof Error){
      alert(error.message)
     }else{
      alert("Unexpected Error Occured")
     }
    }
   })
  const { register, formState: { errors }, handleSubmit } = useForm<RegisterData>();
  const onSubmit = (data:RegisterData) => {
    mutatation.mutate(data);
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    {...register("firstName", validateFirstName())} // Call the function here
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    {...register("lastName", validateLastName())} // Call the function here
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", validateEmail())} // Call the function here
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", validatePassword())}
                  autoComplete="off" // Call the function here
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default RegisterPage;
