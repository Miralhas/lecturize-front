import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context";
import { useLoginMutation } from "@/lib/mutations";
import { LoginFormValues, loginSchema } from "@/lib/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { LoaderCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: LoginFormValues = {
  email: "admin@admin.com",
  password: "1234",
};

const LoginForm = () => {
  const { loginUser } = useAuthContext();
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onSubmit"
  });
  const { errors } = form.formState;


  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: async ({ accessToken }) => {
        const user = await loginUser(accessToken);
        toast.success(`User ${user.username} logged in successfully...`);
      },
      onError(error) {
        if (isAxiosError(error)) {
          const serverError = error.response?.data;
          form.setError("root", {message: serverError.detail})
        }
      },
    });
  }

  return (
    <div className="space-y-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {errors.root && (
            <FormMessage className="text-sm"> {errors.root.message} </FormMessage>
          )}
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
          <Button
            type="submit"
            className='border border-primary rounded-none w-full'
            disabled={loginMutation.isPending}>
            {loginMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm;
