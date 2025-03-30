import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { API_URL } from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import emilyCarter from "../../assets/emily-carter.jpg";
import jonathanReid from "../../assets/jonathan-reid.jpg";
import samanthaLopez from "../../assets/samantha-lopez.jpg";
import davidThompson from "../../assets/david-thompson.jpg";
import rachelKim from "../../assets/rachel-kim.jpg";
import marcusPatel from "../../assets/marcus-patel.jpg";

// Set timezone to user's local
moment.tz.setDefault(moment.tz.guess());
const localizer = momentLocalizer(moment);

interface Tutor {
  _id: number;
  name: string;
  title: string;
  education: string;
  experience: string;
  bio: string;
  subjects: string[];
  availability: { start: string; end: string }[];
  profilePicture: string;
}

interface AppointmentResponse {
  _id: string;
  tutorId: string;
  studentId: string;
  start: string; // From API dates are strings
  end: string;
  title: string;
  __v?: number;
}

interface Appointment {
  _id?: string;
  start: Date;
  end: Date;
  tutorId: string | number;
  studentId?: string | number;
  title?: string;
}

const StudentDashboard: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [newAppointment, setNewAppointment] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const studentId = 1;

  const imageMap: { [key: string]: string } = {
    "Emily Carter": emilyCarter,
    "Jonathan Reid": jonathanReid,
    "Samantha Lopez": samanthaLopez,
    "David Thompson": davidThompson,
    "Rachel Kim": rachelKim,
    "Marcus Patel": marcusPatel,
  };

  // This function ensures we have proper Date objects for the calendar
  const prepareDatesForCalendar = (appointments: Appointment[]) => {
    return appointments.map((appointment) => {
      // Create fresh date objects for the calendar
      const start = new Date(appointment.start.getTime());
      const end = new Date(appointment.end.getTime());

      return {
        ...appointment,
        start,
        end,
      };
    });
  };

  useEffect(() => {
    const fetchTutorsAndAppointments = async () => {
      setIsLoading(true);
      try {
        const [tutorResponse, appointmentResponse] = await Promise.all([
          fetch(`${API_URL}/api/tutors`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(`${API_URL}/api/appointments`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

        const tutorsData = await tutorResponse.json();
        let appointmentsData = await appointmentResponse.json();

        // Add defensive checks
        console.log("Raw appointments data:", appointmentsData);
        console.log("Type:", typeof appointmentsData);
        console.log("Is Array:", Array.isArray(appointmentsData));

        // Ensure appointmentsData is an array
        if (!Array.isArray(appointmentsData)) {
          appointmentsData = Array.isArray(appointmentsData?.data)
            ? appointmentsData.data
            : [];
          console.log("After conversion:", appointmentsData);
        }

        // Update appointment formatting to ensure valid dates
        const formattedAppointments = appointmentsData.map(
          (appointment: AppointmentResponse) => {
            // Create proper Date objects with validation
            const startDate = new Date(appointment.start);
            const endDate = new Date(appointment.end);

            // Ensure dates are valid
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              console.warn("Invalid date detected:", appointment);
              // Return a safe default if dates are invalid
              const defaultStart = new Date();
              const defaultEnd = new Date(defaultStart.getTime() + 3600000);
              return {
                ...appointment,
                start: defaultStart,
                end: defaultEnd,
              };
            }

            return {
              ...appointment,
              start: startDate,
              end: endDate,
            };
          }
        );
        setTutors(Array.isArray(tutorsData) ? tutorsData : []);
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set empty arrays on error
        setTutors([]);
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorsAndAppointments();
  }, [studentId]);

  const handleTutorClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleSlotSelect = ({ start, end }: { start: Date; end: Date }) => {
    if (selectedTutor) {
      // Create fresh Date objects
      const freshStart = new Date(start.getTime());
      const freshEnd = new Date(end.getTime());

      setSelectedSlot({ start: freshStart, end: freshEnd });
      setNewAppointment({ start: freshStart, end: freshEnd });
    } else {
      alert("Please select a tutor first");
    }
  };

  const eventStyleGetter = (event: Appointment) => {
    // Ensure we're working with valid Date objects
    const eventStart =
      event.start instanceof Date ? event.start : new Date(event.start);
    const eventEnd =
      event.end instanceof Date ? event.end : new Date(event.end);

    // Check if the dates are valid before comparing
    if (isNaN(eventStart.getTime()) || isNaN(eventEnd.getTime())) {
      return {}; // Return empty style for invalid dates
    }

    if (
      selectedSlot &&
      eventStart.getTime() === selectedSlot.start.getTime() &&
      eventEnd.getTime() === selectedSlot.end.getTime()
    ) {
      return {
        style: {
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "1px solid #388E3C",
          borderRadius: "5px",
        },
      };
    }
    return {};
  };

  const handleBookAppointment = async () => {
    if (newAppointment && selectedTutor) {
      try {
        const response = await fetch(`${API_URL}/api/appointments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            tutorId: selectedTutor._id,
            start: newAppointment.start,
            end: newAppointment.end,
            title: `Appointment with ${selectedTutor.name}`,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw data;

        // Create a proper appointment object with Date objects
        const newAppointmentObj = {
          ...data,
          start: new Date(data.start),
          end: new Date(data.end),
        };

        setAppointments([...appointments, newAppointmentObj]);
        setNewAppointment(null);
        alert("Appointment Booked");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
  };

  const formatAppointmentTime = (date: Date) => {
    return moment(date).format("MMM D, YYYY h:mm a");
  };

  // Prepare calendar-safe appointments
  const calendarAppointments = prepareDatesForCalendar(appointments);

  return (
    <div className="p-3 sm:p-4 md:p-6 font-roboto text-text-color bg-primary-bg min-h-screen">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center">
        Available Tutors
      </h2>

      {isLoading ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-lg p-4 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform hover:scale-102 transition-transform duration-300"
              onClick={() => handleTutorClick(tutor)}
            >
              <img
                src={imageMap[tutor.name]}
                alt={tutor.name}
                className="w-full h-40 sm:h-48 object-cover rounded-md mb-3 sm:mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                {tutor.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{tutor.title}</p>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
                {tutor.bio.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white z-[100] w-[95%] sm:w-[90%] md:max-w-3xl p-3 sm:p-4 md:p-6 max-h-[90vh] overflow-y-auto flex flex-col mx-auto">
          {selectedTutor && (
            <>
              <DialogHeader className="mb-3 sm:mb-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <img
                    src={imageMap[selectedTutor.name] || "/fallback-image.jpg"}
                    alt={selectedTutor.name}
                    className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full"
                  />
                  <div className="text-center sm:text-left w-full">
                    <DialogTitle className="text-xl sm:text-2xl mb-1">
                      {selectedTutor?.name}
                    </DialogTitle>
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedTutor.title}
                    </p>
                  </div>
                </div>
                <DialogDescription className="mt-3 text-sm sm:text-base">
                  {selectedTutor?.bio}
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 mt-4">
                <div className="mb-3 text-sm sm:text-base font-medium">
                  Select a time slot for your appointment:
                </div>
                <div className="calendar-container h-[300px] sm:h-[350px] md:h-[400px]">
                  {/* Use the prepared appointments here */}
                  <Calendar
                    localizer={localizer}
                    events={calendarAppointments}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSlotSelect}
                    eventPropGetter={eventStyleGetter}
                    style={{ height: "100%", width: "100%" }}
                    views={["month", "week", "day"]}
                    defaultView="month"
                    formats={{
                      dateFormat: "D",
                      dayFormat: "ddd D/M",
                      monthHeaderFormat: "MMMM YYYY",
                      dayHeaderFormat: "ddd D MMM",
                      dayRangeHeaderFormat: ({ start, end }) =>
                        `${moment(start).format("MMM D")} - ${moment(
                          end
                        ).format("MMM D, YYYY")}`,
                    }}
                    messages={{
                      today: "Today",
                      previous: "Back",
                      next: "Next",
                    }}
                  />
                </div>

                {newAppointment && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="font-medium text-sm sm:text-base">
                      Selected Time Slot:
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {formatAppointmentTime(newAppointment.start)} -{" "}
                      {moment(newAppointment.end).format("h:mm a")}
                    </p>
                  </div>
                )}

                {newAppointment && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleBookAppointment}
                      className="bg-secondary-button hover:bg-primary-button text-white font-semibold py-2 px-4 sm:px-6 rounded-md transition-colors text-sm sm:text-base"
                    >
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add basic responsive styles for the calendar */}
      <style>{`
        /* Base styles for the calendar */
  .rbc-calendar {
    width: 100%;
    font-size: 12px;
  }
  
  /* Make the toolbar more responsive */
  .rbc-toolbar {
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .rbc-toolbar-label {
    margin: 5px 0;
    width: 100%;
    text-align: center;
  }
  
  .rbc-btn-group {
    margin: 3px;
  }
  
  .rbc-btn-group button {
    padding: 4px 8px;
  }
  
  /* Make cells more compact on small screens */
  .rbc-month-view {
    height: 100%;
  }
  
  .rbc-month-row, .rbc-row-content {
    min-height: 40px;
  }
  
  .rbc-header {
    padding: 3px;
  }
  
  .rbc-date-cell {
    padding: 2px;
    font-size: 11px;
  }
  
  /* Dialog content positioning */
  .dialog-content {
    display: flex;
    flex-direction: column;
    max-height: 90vh;
  }
  
  /* Responsive improvements for larger screens */
  @media (min-width: 640px) {
    .rbc-calendar {
      font-size: 14px;
    }
    
    .rbc-toolbar {
      flex-direction: row;
      justify-content: space-between;
    }
    
    .rbc-toolbar-label {
      width: auto;
      margin: 0;
    }
    
    .rbc-btn-group button {
      padding: 6px 12px;
    }
    
    .rbc-date-cell {
      padding: 3px;
      font-size: 12px;
    }
    
    .rbc-month-row, .rbc-row-content {
      min-height: 50px;
    }
  }
  
  @media (min-width: 768px) {
    .rbc-calendar {
      font-size: 16px;
    }
    
    .rbc-date-cell {
      padding: 4px;
      font-size: 14px;
    }
    
    .rbc-month-row, .rbc-row-content {
      min-height: 60px;
    }
  }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
