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
import { loginUser } from "@/helper/mutation"
import { validateEmail, validatePassword } from "@/helper/validation"
import { LoginData } from "@/types/types"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
const LoginPage = () => {
  const navigate = useNavigate()
  const {register,formState:{errors} , handleSubmit} = useForm<LoginData>();
  const mutation = useMutation({
    mutationFn:loginUser,
    onSuccess:(data)=>{
      alert(data.message);
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/dashboard')
    },
    onError:(error)=>{
      if(error instanceof Error){
        alert(error.message)
      }else{
        alert("An Unknown error occured.")
      }
    }
  })
  const onSubmit = (data:LoginData) =>{
mutation.mutate(data);
  }
  return (
    <section className="flex justify-center items-center w-full h-screen">
        <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email",validateEmail())}
            />
             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgetpassword" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" {...register("password",validatePassword())} autoComplete="off"/>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
    </section>
  )
}
export default LoginPage