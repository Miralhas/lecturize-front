import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context";
import { useLoginMutation, useRegisterMutation } from "@/lib/mutations";
import { RegisterFormValues, registerSchema } from "@/lib/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: RegisterFormValues = {
  email: "xibiu@gmail.com",
  username: "xibiu",
  password: "1234",
  confirmPassword: "1234",
};

const RegisterForm = () => {
  const { loginUser } = useAuthContext();
  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues,
    mode: "onSubmit"
  });

  const onSubmit = async (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess(_data, { email, password, username }, _context) {
        loginMutation.mutate({ email, password }, {
          onSuccess: async ({ accessToken }) => {
            await loginUser(accessToken);
          }
        });
        toast.success(`User ${username} registered successfully...`);
      },
      onError(error) {
        if (isAxiosError(error)) {
          console.log(error);
          const serverError = error.response?.data;
          form.setError("root", { message: serverError.title });

          if (serverError.errors.email) {
            form.setError("email", { message: serverError.errors.email })
          }

          if (serverError.errors.username) {
            form.setError("username", { message: serverError.errors.username })
          }
        }
      },
    })
  }

  return (
    <div className="space-y-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@abc.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="mingas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className='border border-primary rounded-none w-full'
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : (
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm;
