import { postLecture } from "@/apis/lectures-api";
import { fetchTags } from "@/apis/tags-api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LectureFormValues, lectureSchema } from "@/utils/schemas/lecture-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

const defaultValues: LectureFormValues = {
  title: 'abc',
  lecturer: 'abc',
  description: 'abc',
  type: "ONLINE",
  endsAt: "",
  startsAt: "",
  url: "https://localhost.com",
  address: "asd",
  maximumCapacity: 0,
  tags: [],
}

const LectureForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues,
    mode: "onSubmit"
  });

  const watchType = form.watch("type");

  const { data: tags, isLoading } = useQuery({
    queryFn: fetchTags,
    queryKey: ["tags"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    }
  });

  const onSubmit = async (data: LectureFormValues) => {
    const formattedData = {
      ...data,
      startsAt: new Date(data.startsAt).toISOString(),
      endsAt: new Date(data.endsAt).toISOString(),
    }
    try {
      const lec = await mutateAsync(formattedData);
      console.log(lec);
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoading) return (<h1 className="text-center text-green-600">Loading...</h1>)

  return (
    <div className="space-y-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid w-full grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Lecture title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lecturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer</FormLabel>
                  <FormControl>
                    <Input placeholder="Lecturer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Lecture description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid w-full grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startsAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starts At</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} min={format(new Date(), 'yyyy-MM-dd\'T\'HH:mm')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endsAt"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Ends At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} min={format(new Date(), 'yyyy-MM-dd\'T\'HH:mm')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
              }
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lecture type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ONLINE">Online</SelectItem>
                    <SelectItem value="PRESENTIAL">Presential</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {(watchType == "ONLINE" || watchType == "HYBRID") && <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}

          {(watchType == "PRESENTIAL" || watchType == "HYBRID") &&(
            <>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Lecture address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maximumCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button type="submit" disabled={isPending}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default LectureForm;
