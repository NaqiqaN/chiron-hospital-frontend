function DashboardStats({ appointments, doctors }) {
  const totalAppointments = appointments.length;
  const totalDoctors = doctors.length;
  const bookedSlots = appointments.length;
  const availableSlots = 13 - bookedSlots;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>{totalAppointments}</h3>
        <p>Total Appointments</p>
      </div>

      <div className="stat-card">
        <h3>{totalDoctors}</h3>
        <p>Doctors</p>
      </div>

      <div className="stat-card">
        <h3>{bookedSlots}</h3>
        <p>Booked Slots</p>
      </div>

      <div className="stat-card">
        <h3>{availableSlots}</h3>
        <p>Available Slots</p>
      </div>
    </div>
  );
}

export default DashboardStats;