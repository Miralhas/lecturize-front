import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLectureImageMutation, useLecturesMutation } from "@/lib/mutations";
import { toast } from "@/lib/hooks/use-toast";
import { LectureFormValues, lectureSchema } from "@/lib/schemas/lecture-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TagsDrawer from "./tags-drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Tag } from "@/types/tag";

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

type LectureFormProps = {
  handleTabChange: () => void;
}

const LectureForm = ({ handleTabChange }: LectureFormProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const lectureMutate = useLecturesMutation();
  const lectureImageMutation = useLectureImageMutation();

  const form = useForm<LectureFormValues>({
    resolver: zodResolver(lectureSchema),
    defaultValues,
    mode: "onSubmit"
  });

  const watchType = form.watch("type");

  const onSubmit = async (data: LectureFormValues) => {
    const image = data.image;
    const formattedData = {
      ...data,
      startsAt: new Date(data.startsAt).toISOString(),
      endsAt: new Date(data.endsAt).toISOString(),
      tags: selectedTags,
      image: undefined
    };
    lectureMutate.mutate(formattedData, {
      onSuccess: async (lecture) => {
        if (image) {
          lectureImageMutation.mutate({ file: image, id: lecture.id });
        }
        handleTabChange();
        toast({
          title: "You received the following token:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(lecture, null, 2)}</code>
            </pre>
          )
        })
      }
    });
  }

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

          {(watchType == "PRESENTIAL" || watchType == "HYBRID") && (
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

          <div>
            <FormField
              control={form.control}
              name="image"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => {
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        className="pt-2"
                        type="file" {...fieldProps}
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => onChange(e.target.files && e.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

          <div className="w-full mx-auto max-w-sm">
            <TagsDrawer selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </div>
          <Button type="submit" disabled={lectureMutate.isPending}>Submit</Button>

        </form>
      </Form>
    </div>
  )
}

export default LectureForm;
