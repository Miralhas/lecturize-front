import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchLectures } from "./api";
import LectureForm from "./components/lectureForm";
import LoginForm from "./components/loginForm";
import { Button } from "./components/ui/button";

const Demo = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: fetchLectures,
    queryKey: ["lectures"],
  });

  if (isLoading) return (<h1 className="text-center text-green-600">Loading...</h1>)

  return (
    <main className='min-h-[80vh]'>
      <section className='mx-auto mt-10 max-w-xl'>
        <div className="flex flex-row justify-center gap-2 mb-10">
          <Button variant="ghost" className='border border-primary rounded-none ms-1 w-[96px]' onClick={() => refetch()}>
            Fetch
          </Button>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="password">Post Lecture</TabsTrigger>
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <LectureForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="lectures">
            <Card>
              <CardHeader>
                <CardTitle>Lectures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <ul>
                    <span className="border-b">Length: {data?.length}</span>
                    {data?.map(lecture => (
                      <li key={lecture.id} className="mt-3">{lecture.title}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


      </section>
    </main>
  );
}

export default Demo;
