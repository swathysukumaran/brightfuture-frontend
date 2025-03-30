import React, { useState } from "react";

// Image Imports (Replace with your actual image paths)
import testimonial1 from "../../assets/testimonial1.jpg";
import testimonial2 from "../../assets/testimonial2.jpg";
import testimonial3 from "../../assets/testimonial3.jpg";
import testimonial4 from "../../assets/testimonial4.png";
import testimonial5 from "../../assets/testimonal5.png";
import heroImage from "../../assets/hero-image.png";
import studentteacher from "../../assets/studentteacher.jpg";
import { Link } from "react-router-dom";

const testimonials = [
  {
    img: testimonial1,
    text: "Bright Futures Tutoring helped my son improve his math grades significantly!",
    author: "Jane D.",
  },
  {
    img: testimonial3,
    text: "The tutors are patient and knowledgeable. Highly recommend!",
    author: "Michael S.",
  },
  {
    img: testimonial2,
    text: "My daughter's confidence has soared since she started tutoring.",
    author: "Emily R.",
  },
  {
    img: testimonial4,
    text: "Amazing experience! My child now enjoys learning.",
    author: "Sarah K.",
  },
  {
    img: testimonial5,
    text: "Highly professional tutors who truly care about students.",
    author: "David L.",
  },
];

const HomePage: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="font-roboto text-text-color min-h-screen bg-primary-bg px-4 sm:px-6 md:px-8 lg:px-20">
      {/* Hero Section */}
      <section className="relative mt-1">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center p-4 bg-opacity-50">
          <h1 className="font-lora text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Empowering Students for Bright Futures
          </h1>
          <p className="text-white mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
            Personalized tutoring for K-12 students.
          </p>
          <Link
            to="/browse"
            className="bg-secondary-button text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="my-8 sm:my-12">
        <h2 className="font-lora text-2xl sm:text-3xl font-semibold mb-4 text-center">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <p className="mb-4 text-sm sm:text-base">
              At Bright Futures Tutoring, we believe that every student has the
              potential to succeed with the right support and guidance. Our
              mission is to empower K-12 students with the knowledge, skills,
              and confidence they need to excel in their studies and beyond.
            </p>
            <p className="mb-4 text-sm sm:text-base">
              We offer personalized tutoring services, both online and
              in-person, tailored to meet each student's unique learning needs.
              Whether a student is looking to master foundational skills, tackle
              advanced coursework, or prepare for exams, our experienced tutors
              provide targeted instruction that makes learning engaging and
              effective.
            </p>
            <p className="mb-4 text-sm sm:text-base md:hidden lg:block">
              Our team consists of highly qualified educators with expertise in
              a variety of subjects, from elementary literacy and math to high
              school science, English, and test preparation. We take a
              student-centered approach, adapting our teaching methods to suit
              different learning styles and academic goals.
            </p>
            <p className="mb-4 text-sm sm:text-base hidden lg:block">
              At Bright Futures Tutoring, we foster a supportive and encouraging
              learning environment where students feel motivated to overcome
              challenges and achieve their full potential.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-4 md:mb-0">
            <img
              src={studentteacher}
              alt="Student and Teacher"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary-bg py-6 sm:py-8 md:py-10 px-2 sm:px-4 rounded-lg mb-8">
        <h2 className="font-lora text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Testimonials
        </h2>
        <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full bg-white p-4 sm:px-4 sm:py-6 md:p-8 rounded-lg shadow-md text-center flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center"
              >
                <img
                  src={testimonial.img}
                  alt={`Testimonial ${index + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-2 sm:mb-0"
                />
                <div>
                  <p className="mb-2 text-sm sm:text-base">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-sm sm:text-base">
                    - {testimonial.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full text-sm sm:text-base"
            aria-label="Previous testimonial"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full text-sm sm:text-base"
            aria-label="Next testimonial"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-button text-white p-6 mt-8 rounded-t-lg">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Contact Info */}
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm sm:text-base">
              Email: contact@brightfutures.com
            </p>
            <p className="text-sm sm:text-base">Phone: (123) 456-7890</p>
            <p className="text-sm sm:text-base">
              Address: 123 Learning Lane, Tutortown
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/browse"
                  className="hover:underline text-sm sm:text-base"
                >
                  Browse Tutors
                </a>
              </li>
              <li>
                <a
                  href="/appointments"
                  className="hover:underline text-sm sm:text-base"
                >
                  View Appointments
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="hover:text-gray-300 text-sm sm:text-base">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-300 text-sm sm:text-base">
                Instagram
              </a>
              <a href="#" className="hover:text-gray-300 text-sm sm:text-base">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 border-t border-gray-400 pt-4 text-sm">
          © {new Date().getFullYear()} Bright Futures Tutoring. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
