import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  role: "student" | "guardian";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  school: string;
  grade: string;
  agreePolicy: boolean;
  receiveUpdates: boolean;
}

export default function AdmissionsForm() {
  const [formData, setFormData] = useState<FormData>({
    role: "student",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Canada",
    school: "",
    grade: "",
    agreePolicy: false,
    receiveUpdates: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!", formData);
    alert("Form submitted successfully!");
  };

  return (
    <section className="bg-secondary-button p-4 sm:p-5 md:p-6 rounded-lg w-full max-w-lg mx-auto my-6 sm:my-10 md:my-16 text-white shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
        Speak To An Admissions Advisor Today
      </h2>
      <p className="text-sm sm:text-base text-center mb-4">
        Interested in learning more about CGA's online high school? Please
        complete the form below to speak with one of our Admissions Advisors.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Role Selection Buttons */}
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "student" })}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded text-sm sm:text-base transition-colors ${
              formData.role === "student"
                ? "bg-white text-secondary-button"
                : "bg-transparent border-white hover:bg-white/10"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "guardian" })}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded text-sm sm:text-base transition-colors ${
              formData.role === "guardian"
                ? "bg-white text-red-800"
                : "bg-transparent border-white hover:bg-white/10"
            }`}
          >
            Guardian
          </button>
        </div>

        {/* Form Grid for larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 text-black rounded"
            required
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 text-black rounded"
            required
          />
        </div>

        {/* Email and Phone */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 text-black rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 text-black rounded"
          required
        />

        {/* Country Selection */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 text-black rounded"
        >
          <option value="Canada">Canada</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
        </select>

        {/* School and Grade in grid on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            name="school"
            placeholder="Current School"
            value={formData.school}
            onChange={handleChange}
            className="w-full p-2 text-black rounded"
          />
          <input
            type="text"
            name="grade"
            placeholder="Current Grade/Year Level"
            value={formData.grade}
            onChange={handleChange}
            className="w-full p-2 text-black rounded"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 text-sm sm:text-base">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreePolicy"
              checked={formData.agreePolicy}
              onChange={handleChange}
              className="mr-2 mt-1"
              required
            />
            <span>
              I agree to the{" "}
              <a href="#" className="underline hover:text-white/80">
                privacy policy
              </a>
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              name="receiveUpdates"
              checked={formData.receiveUpdates}
              onChange={handleChange}
              className="mr-2 mt-1"
            />
            <span>
              I want to receive study pathways, free resources, and guidance.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-white hover:bg-gray-100 font-semibold rounded text-secondary-button transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg mt-4"
        >
          SUBMIT
        </button>
      </form>
    </section>
  );
}
