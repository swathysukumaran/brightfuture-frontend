import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { API_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-primary-bg w-full">
      {/* Logo and Title */}
      <div className="flex items-center justify-between bg-secondary-bg w-full py-3 px-4 md:py-4 md:justify-center">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/home")}
            className="w-auto h-10 sm:h-12 md:h-16 cursor-pointer"
          />
          <h1 className="ml-2 font-lora text-xl sm:text-2xl md:text-3xl font-semibold">
            Bright Futures
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-primary p-1"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation - Desktop */}
      <div className="hidden md:flex gap-6 lg:gap-16 p-3 bg-secondary-bg items-center justify-center w-full">
        <Link
          to="/browse"
          className="flex items-center gap-2 hover:text-primary-button transition-colors"
        >
          Browse Tutors
        </Link>
        <Link
          to="/appointments"
          className="flex text-primary items-center gap-2 hover:text-primary-button transition-colors"
        >
          View Appointments
        </Link>
        <Link
          to="/contacts"
          className="flex text-primary items-center gap-2 hover:text-primary-button transition-colors"
        >
          Contact us
        </Link>
        <Button
          variant="ghost"
          className="bg-secondary-button text-white hover:bg-primary-button transition-colors"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {/* Navigation - Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 p-4 bg-secondary-bg shadow-md">
          <Link
            to="/browse"
            className="flex items-center gap-2 py-2 border-b border-gray-200 hover:text-primary-button"
            onClick={() => setMobileMenuOpen(false)}
          >
            Browse Tutors
          </Link>
          <Link
            to="/appointments"
            className="flex text-primary items-center gap-2 py-2 border-b border-gray-200 hover:text-primary-button"
            onClick={() => setMobileMenuOpen(false)}
          >
            View Appointments
          </Link>
          <Link
            to="/contacts"
            className="flex text-primary items-center gap-2 py-2 border-b border-gray-200 hover:text-primary-button"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact us
          </Link>
          <Button
            variant="ghost"
            className="mt-2 bg-secondary-button text-white hover:bg-primary-button w-full"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
