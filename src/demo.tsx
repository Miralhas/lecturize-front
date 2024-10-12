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
import LectureForm from "./components/lectureForm";
import LecturesCarousel from "./components/lectures-carousel";
import LoginForm from "./components/loginForm";

const Demo = () => {
  return (
    <main className='min-h-[80vh]'>
      <section className='mx-auto mt-10 max-w-xl'>
        <h1 className="text-center text-primary text-2xl mb-4">Lecturize it</h1>
        <Tabs defaultValue="lectures">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="password">Post Lecture</TabsTrigger>
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
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
                <LecturesCarousel />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


      </section>
    </main>
  );
}

export default Demo;
