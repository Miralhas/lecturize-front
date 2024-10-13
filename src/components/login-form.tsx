import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context";
import { toast } from "@/hooks/use-toast";
import { LoginFormValues, loginSchema } from "@/utils/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoaderCircle } from 'lucide-react';
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues: LoginFormValues = {
  email: "admin@admin.com",
  password: "1234",
};

const LoginForm = () => {
  const { loginMutation, loginUser } = useAuthContext();
  const { error, isPending } = loginMutation;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onSubmit"
  });

  useEffect(() => {
    if (error) {
      let detail = "Internal Server Error";
      let title = "Something happened...";
      if (axios.isAxiosError(error) && error.response) {
        title = error.response?.data.title;
        detail = JSON.stringify(error.response?.data, null, 2);
      }
      toast({
        title: title,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-hidden hover:overflow-auto">
            <code className="text-white">{detail}</code>
          </pre>
        )
      })
      
    }
  }, [error]);

  const onSubmit = async (data: LoginFormValues) => {
    const user = await loginUser(data);
    toast({
      title: "You received the following token:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(user, null, 2)}</code>
        </pre>
      )
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
            disabled={isPending}>
            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm;
