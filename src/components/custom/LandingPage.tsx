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
      {/* Header */}
      <div className="bg-primary-bg flex flex-col gap-1 justify-between w-full">
        {/* Logo and title */}
        <div className="flex items-center justify-between bg-secondary-bg w-full py-3 px-4 md:justify-center">
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="w-auto h-10 sm:h-12 md:h-16 cursor-pointer"
            />
            <header className="p-2 md:p-4 text-center font-lora text-xl sm:text-2xl md:text-3xl font-semibold">
              Bright Futures
            </header>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex p-2 bg-secondary-bg items-center justify-center w-full">
          <nav className="flex items-center space-x-8">
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
              <DialogContent className="bg-white text-gray-900 w-[95%] max-w-md mx-auto">
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
              <DialogContent className="bg-white text-gray-900 w-[95%] max-w-md mx-auto">
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
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-secondary-bg shadow-md">
            <div className="flex flex-col items-center py-4 space-y-4">
              <Button
                variant="ghost"
                onClick={() => {
                  openLoginDialog();
                  setIsMenuOpen(false);
                }}
                className="w-full max-w-xs"
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  openRegisterDialog();
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 w-full max-w-xs"
              >
                Sign up
              </Button>
            </div>
          </div>
        )}
      </div>

      <section className="mt-1">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between mx-auto">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <img
              src={tutorImage}
              alt="Student learning with a tutor"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 order-1 md:order-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-700 leading-tight">
              Unlock your academic potential
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 py-2">
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
                    className="text-base sm:text-lg text-gray-600 border-gray-600 w-full sm:w-auto"
                    onClick={openRegisterDialog}
                  >
                    Find a tutor
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-900 w-[95%] max-w-md mx-auto">
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
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary-700">
                Education That's Truly Personal
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                We don't just follow a standard curriculum—we build learning
                experiences around your unique educational needs and goals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-md">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-primary-700">
                    Expert Tutors
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our qualified educators are carefully selected for their
                    subject expertise and teaching abilities, ensuring quality
                    instruction for every student.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-primary-700">
                    Customized Learning
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our tutoring plans are tailored to each student's learning
                    style, addressing specific challenges and building on their
                    strengths.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md sm:col-span-2 md:col-span-1">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-primary-700">
                    Flexible Scheduling
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
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

      {/* Dialogs for Mobile */}
      <Dialog
        open={dialogContent === "login"}
        onOpenChange={() => dialogContent === "login" && setDialogContent(null)}
      >
        <DialogContent className="bg-white text-gray-900 w-[95%] max-w-md mx-auto">
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
        <DialogContent className="bg-white text-gray-900 w-[95%] max-w-md mx-auto">
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
    </div>
  );
}

export default LandingPage;
