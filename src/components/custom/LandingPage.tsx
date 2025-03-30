import { useState } from "react";
import logo from "../../assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Login from "./Login";
import Register from "./Register";
import tutorImage from "../../assets/tutor-student.jpg";
import { BookOpen, Calendar, Users, Menu, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  type DialogContentType = "login" | "register" | null;
  const [dialogContent, setDialogContent] = useState<DialogContentType>(null);

  const openRegisterDialog = () => {
    setDialogContent("register");
  };

  const openLoginDialog = () => {
    setDialogContent("login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className=" bg-primary-bg  flex flex-col gap-1 justify-between w-full">
        <div className="flex items-center justify-center bg-secondary-bg w-full py-4 px-2">
          <img
            src={logo}
            alt="logo"
            // Navigate to Browse Tutors
            className="w-auto h-12 sm:h-16 md:h-20 cursor-pointer"
          />
          <header className="p-4 text-center font-lora text-3xl font-semibold">
            Bright Futures Tutoring
          </header>
        </div>

        <div className="flex gap-16 p-2  bg-secondary-bg items-center justify-center w-full">
          <nav className="hidden md:flex items-center space-x-8">
            <Dialog
              open={dialogContent === "login"}
              onOpenChange={() =>
                dialogContent === "login" && setDialogContent(null)
              }
            >
              <DialogTrigger asChild>
                <Button variant="outline" onClick={openLoginDialog}>
                  Log in
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-900">
                <DialogHeader>
                  <DialogTitle>Log in to your account</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to access your tutoring dashboard
                  </DialogDescription>
                </DialogHeader>
                <Login />
              </DialogContent>
            </Dialog>
            <Dialog
              open={dialogContent === "register"}
              onOpenChange={() =>
                dialogContent === "register" && setDialogContent(null)
              }
            >
              <DialogTrigger asChild>
                <Button onClick={openRegisterDialog} className="text-gray-600">
                  Sign up
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-gray-900">
                <DialogHeader>
                  <DialogTitle>Create an account</DialogTitle>
                  <DialogDescription>
                    Join Bright Futures Tutoring to access personalized learning
                  </DialogDescription>
                </DialogHeader>
                <Register
                  onLoginClick={() => {
                    setDialogContent("login");
                  }}
                />
              </DialogContent>
            </Dialog>
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-1">
        <section className="flex flex-col md:flex-row items-center justify-between mx-auto">
          <div className="w-full md:w-1/2">
            <img src={tutorImage} alt="Student learning with a tutor" />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 leading-tight">
              Unlock your academic potential
            </h1>
            <p className="text-xl text-gray-600 py-2">
              Discover personalized tutoring sessions powered by expert
              educators, designed to match your learning style, pace, and
              educational goals.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Dialog
                open={dialogContent === "register"}
                onOpenChange={() =>
                  dialogContent === "register" && setDialogContent(null)
                }
              >
                <DialogTrigger asChild>
                  <Button
                    className="text-lg text-gray-600 border-gray-600"
                    onClick={openRegisterDialog}
                  >
                    Find a tutor
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>
                      Enter your details to register for tutoring
                    </DialogDescription>
                  </DialogHeader>
                  <Register
                    onLoginClick={() => {
                      setDialogContent("login");
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-700">
                Education That's Truly Personal
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We don't just follow a standard curriculum—we build learning
                experiences around your unique educational needs and goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary-700">
                    Expert Tutors
                  </h3>
                  <p className="text-gray-600">
                    Our qualified educators are carefully selected for their
                    subject expertise and teaching abilities, ensuring quality
                    instruction for every student.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary-700">
                    Customized Learning
                  </h3>
                  <p className="text-gray-600">
                    Our tutoring plans are tailored to each student's learning
                    style, addressing specific challenges and building on their
                    strengths.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary-700">
                    Flexible Scheduling
                  </h3>
                  <p className="text-gray-600">
                    Choose between online and in-person sessions at times that
                    work for your busy schedule, making learning accessible and
                    convenient.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default LandingPage;
