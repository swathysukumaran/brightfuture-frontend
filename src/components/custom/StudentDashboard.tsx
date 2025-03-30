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
  const studentId = 1;

  interface Appointment {
    _id?: string;
    start: Date;
    end: Date;
    tutorId: string | number;
    studentId?: string | number;
    title?: string;
  }
  const imageMap: { [key: string]: string } = {
    "Emily Carter": emilyCarter,
    "Jonathan Reid": jonathanReid,
    "Samantha Lopez": samanthaLopez,
    "David Thompson": davidThompson,
    "Rachel Kim": rachelKim,
    "Marcus Patel": marcusPatel,
  };

  useEffect(() => {
    const fetchTutorsAndAppointments = async () => {
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
          // It might be an object with a data property or some other structure
          appointmentsData = Array.isArray(appointmentsData?.data)
            ? appointmentsData.data
            : [];

          console.log("After conversion:", appointmentsData);
        }

        // Now safely map over the array
        const formattedAppointments = appointmentsData.map(
          (appointment: AppointmentResponse) => ({
            ...appointment,
            start: new Date(appointment.start),
            end: new Date(appointment.end),
          })
        );

        setTutors(Array.isArray(tutorsData) ? tutorsData : []);
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set empty arrays on error
        setTutors([]);
        setAppointments([]);
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
      setSelectedSlot({ start, end });
      setNewAppointment({ start, end });
    } else {
      alert("Please select a tutor first");
    }
  };
  const eventStyleGetter = (event: Appointment) => {
    const eventStart =
      event.start instanceof Date ? event.start : new Date(event.start);
    const eventEnd =
      event.end instanceof Date ? event.end : new Date(event.end);

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

        setAppointments([...appointments, data]);
        setNewAppointment(null);
        alert("Appointment Booked");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
  };

  return (
    <div className="p-6 font-roboto text-text-color bg-primary-bg min-h-screen">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleTutorClick(tutor)}
          >
            <img
              src={imageMap[tutor.name]}
              alt={tutor.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{tutor.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{tutor.title}</p>
            <p className="text-xs text-gray-500">
              {tutor.bio.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white z-[100] w-full max-w-2xl p-4 max-h-[90vh] overflow-y-auto">
          {selectedTutor && (
            <>
              <DialogHeader>
                {selectedTutor && (
                  <img
                    src={imageMap[selectedTutor.name] || "/fallback-image.jpg"}
                    alt={selectedTutor.name}
                    className="h-32 w-32 object-cover rounded-full mb-4 mx-auto"
                  />
                )}
                <DialogTitle>{selectedTutor?.name}</DialogTitle>
                <DialogDescription>{selectedTutor?.bio}</DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <Calendar
                  localizer={localizer}
                  events={appointments}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSlotSelect}
                  eventPropGetter={eventStyleGetter}
                  style={{ height: 500 }}
                />
                {newAppointment && (
                  <div className="mt-4">
                    <p>
                      <strong>Selected Slot:</strong>
                    </p>
                    <p>
                      {newAppointment.start.toLocaleString()} -{" "}
                      {newAppointment.end.toLocaleString()}
                    </p>
                  </div>
                )}
                {newAppointment && (
                  <div className="mt-4">
                    <button
                      onClick={handleBookAppointment}
                      className="bg-secondary-button hover:bg-primary-button text-white font-semibold py-2 px-6 rounded-md transition-colors"
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
    </div>
  );
};

export default StudentDashboard;
