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
import LectureForm from "./components/lecture-form";
import LecturesCarousel from "./components/lectures-carousel";
import LoginForm from "./components/login-form";
import { useEffect, useState } from "react";
import { useAuthContext } from "./contexts/auth-context";
import RegisterForm from "./components/register-form";
import UserDropdownMenu from "./components/user-dropdown-menu";
import { ModeToggle } from "./components/toggle";
import DashboardDialog from "./components/dashboard-dialog";

const Demo = () => {
  const { state: { isAuthenticated, user } } = useAuthContext();
  const [tab, setTab] = useState(isAuthenticated ? "lectures" : "login");

  useEffect(() => {
    setTab(isAuthenticated ? "lectures" : "login");
  }, [isAuthenticated])

  const handleTabChange = (value: string) => {
    setTab(value);
  }

  return (
    <main className='min-h-[80vh]'>
      <section className='mx-auto max-w-xl flex flex-col gap-5 mt-7 p-5'>
        <div className="flex flex-row justify-center gap-4 items-center">
          <h1 className="text-center text-primary text-2xl">Lecturize it</h1>
          <ModeToggle />
        </div>
        {isAuthenticated && user && (
          <div className="flex justify-center gap-3">
            <UserDropdownMenu />
            <DashboardDialog />
          </div>
        )}
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
                  Make changes to your account here. Click save when you're done.
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
                  Make changes to your account here. Click save when you're done.
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
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
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
