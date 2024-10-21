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
import { useEffect, useState } from "react";
import LectureForm from "./components/lecture-form";
import LecturesCarousel from "./components/lectures-carousel";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import { useAuthContext } from "./contexts/auth-context";

const Demo = () => {
  const { state: { isAuthenticated } } = useAuthContext();
  const [tab, setTab] = useState(isAuthenticated ? "lectures" : "login");

  useEffect(() => {
    setTab(isAuthenticated ? "lectures" : "login");
  }, [isAuthenticated])

  const handleTabChange = (value: string) => {
    setTab(value);
  }

  return (
    <main className='col-span-1'>
      <section>
        <h1 className="text-center text-primary text-2xl mb-5">Lecturize it</h1>
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            {isAuthenticated ? (
              <>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
                <TabsTrigger value="create-lecture">Post Lecture</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Log in to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Register your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <RegisterForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-lecture">
            <Card>
              <CardHeader>
                <CardTitle>Create Lecture</CardTitle>
                <CardDescription>
                  Create a lecture here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <LectureForm handleTabChange={() => handleTabChange("lectures")} />
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
