import { useEffect, useState } from "react";
import AppointmentList from "./components/AppointmentList";
import AppointmentForm from "./components/AppointmentForm";
import "./App.css";
import DashboardStats from "./components/DashboardStats";
import SlotTable from "./components/SlotTable";
const doctors = [
  { id: "D01", name: "Sharma", specialization: "Cardiology" },
  { id: "D02", name: "Mehta", specialization: "Neurology" },
  { id: "D03", name: "Iyer", specialization: "Orthopedic" },
  { id: "D04", name: "Khan", specialization: "Gynecology" },
  { id: "D05", name: "Das", specialization: "Psychiatry" },
  { id: "D06", name: "Patel", specialization: "Pediatrics" }
];

const conditions = [
  "Fever",
  "Cough",
  "Asthma",
  "Anxiety",
  "Insomnia",
  "Arthritis",
  "PCOS",
  "Hypoglycemia",
  "Osteoporosis"
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
  "09:00 PM"
];

function App() {

  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [diagnosis, setDiagnosis] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  function fetchAppointments() {

    fetch("https://hospital-management-system-98vl.onrender.com/hospital/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }

  function bookAppointment() {

    if (!patientId || !patientName || !diagnosis || !appointmentTime) {
      alert("Please fill all fields before booking.");
      return;
    }

    const bookingData = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      patientId: patientId,
      patientName: patientName,
      diagnosis: diagnosis,
      feePerHour: 200,
      appointmentTime: appointmentTime
    };

    fetch("https://hospital-management-system-98vl.onrender.com/hospital/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    })
      .then((response) => response.text())
      .then((data) => {

        alert(data);

        setPatientId("");
        setPatientName("");
        setDiagnosis("");
        setAppointmentTime("");
        setSelectedDoctor(doctors[0]);

        fetchAppointments();
      });
  }

  function dischargePatient(patientId) {

    console.log("Discharging patient:", patientId);

    const hours = prompt("Enter hours admitted:");

    if (!hours) {
      return;
    }

    fetch(`https://hospital-management-system-98vl.onrender.com/hospital/discharge/${patientId}/${hours}`)
      .then((response) => response.text())
      .then((data) => {

        console.log("Backend response:", data);

        alert(data);

        fetchAppointments();
      })
      .catch((error) => {

        console.log("Discharge error:", error);

        alert("Discharge failed");
      });
  }

  return (
    <div className="app-container">

      <h1>Chiron Hospital</h1>
      <DashboardStats appointments={appointments} doctors={doctors} />

      <AppointmentForm
        patientId={patientId}
        setPatientId={setPatientId}
        patientName={patientName}
        setPatientName={setPatientName}
        diagnosis={diagnosis}
        setDiagnosis={setDiagnosis}
        conditions={conditions}
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
        appointmentTime={appointmentTime}
        setAppointmentTime={setAppointmentTime}
        bookAppointment={bookAppointment}
        timeSlots={timeSlots}
      />

      <AppointmentList
        appointments={appointments}
        dischargePatient={dischargePatient}
      />

      <SlotTable appointments={appointments} doctors={doctors} />

    </div>
  );
}

export default App;