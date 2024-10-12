import { login } from "@/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { LoginFormValues, loginSchema } from "@/utils/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const defaultValues: LoginFormValues = {
  email: "admin1@admin.com",
  password: "1234",
  // email: "",
  // password: "",
};

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onSubmit"
  });

  const { mutateAsync: mutateLoginAsync, isPending } = useMutation({
    mutationFn: login,
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await mutateLoginAsync(data);
      toast({
        title: "You received the following token:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{response.accessToken?.slice(0, 40).concat("...")}</code>
          </pre>
        )
      })
    } catch (err) {
      if (axios.isAxiosError(err))
        toast({
          title: "You received the following token:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
              <code className="text-white w-[340px]">{JSON.stringify(err.response?.data, null, 2)}</code>
            </pre>
          )
        })
    }
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
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm;
