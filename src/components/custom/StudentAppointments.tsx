import React, { useState, useEffect } from "react";
import moment from "moment";
import { API_URL } from "@/config/api";

// Interface for data from API
interface AppointmentResponse {
  _id: string;
  tutorId: string;
  studentId: string;
  start: string; // API returns dates as strings
  end: string;
  title: string;
  __v: number;
}

// Interface for processed appointments with proper Date objects
interface Appointment {
  _id: string;
  tutorId: string;
  studentId: string;
  start: Date;
  end: Date;
  title: string;
}

const StudentAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudentAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        let data = await response.json();

        // Ensure data is an array
        if (!Array.isArray(data)) {
          data = Array.isArray(data?.data) ? data.data : [];
          console.log("Converted data to array:", data);
        }

        // Convert string dates to Date objects with validation
        const formattedAppointments = data.map(
          (appointment: AppointmentResponse) => {
            const startDate = new Date(appointment.start);
            const endDate = new Date(appointment.end);

            // Validate dates
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              console.warn("Invalid date detected:", appointment);
              // Return with default dates if invalid
              return {
                ...appointment,
                start: new Date(),
                end: new Date(Date.now() + 3600000),
              };
            }

            return {
              ...appointment,
              start: startDate,
              end: endDate,
            };
          }
        );

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching student appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentAppointments();
  }, []);

  const formatDate = (date: Date) => {
    return moment(date).format("MMM D, YYYY");
  };

  const formatTime = (date: Date) => {
    return moment(date).format("h:mm a");
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 font-roboto text-text-color bg-primary-bg min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center font-lora">
        My Appointments
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-pulse text-center">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
          </div>
        </div>
      ) : appointments.length > 0 ? (
        <div className="overflow-x-auto">
          {/* Desktop/Tablet View - Table */}
          <table className="hidden sm:table w-full text-left table-auto border-collapse shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 font-semibold">Title</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">{appointment.title}</td>
                  <td className="px-4 py-3">{formatDate(appointment.start)}</td>
                  <td className="px-4 py-3">
                    {formatTime(appointment.start)} -{" "}
                    {formatTime(appointment.end)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View - Card List */}
          <div className="sm:hidden space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-lg shadow p-4 border-l-4 border-primary-button"
              >
                <h3 className="font-medium text-base mb-2">
                  {appointment.title}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {formatDate(appointment.start)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">
                      {formatTime(appointment.start)} -{" "}
                      {formatTime(appointment.end)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 sm:p-10 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-base sm:text-lg text-gray-600">
            No appointments booked yet.
          </p>
          <p className="mt-2 text-sm sm:text-base text-primary-600">
            Book a session with one of our tutors to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAppointments;
