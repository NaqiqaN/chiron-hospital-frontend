function AppointmentForm({
  patientId,
  setPatientId,
  patientName,
  setPatientName,
  diagnosis,
  setDiagnosis,
  conditions,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  bookAppointment,
  appointmentTime,
  setAppointmentTime
}) {
  return (
    <div>
      <h2>Book Appointment</h2>

      <div className="form-box">
        <input type="text" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />

        <input type="text" placeholder="Enter Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />

        <select value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}>
          <option value="">Select Condition</option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>

        <input type="text" placeholder="Preferred Time (Example: 10:00 AM)" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />

        <select value={selectedDoctor.id} onChange={(e) => {
          const doctor = doctors.find((doc) => doc.id === e.target.value);
          setSelectedDoctor(doctor);
        }}>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>

        <button onClick={bookAppointment}>Book Appointment</button>
      </div>

      <hr />
    </div>
  );
}

export default AppointmentForm;