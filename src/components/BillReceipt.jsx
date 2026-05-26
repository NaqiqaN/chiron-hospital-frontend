function BillReceipt({ bill, onClose }) {
  if (!bill) {
    return null;
  }

  const totalAmount = Number(bill.hours) * Number(bill.feePerHour);
  const billDate = new Date().toLocaleString();

  return (
    <div className="bill-receipt">
      <div className="bill-header">
        <div>
          <p className="bill-label">Patient Discharge Bill</p>
          <h2>Chiron Hospital</h2>
        </div>
        <button className="close-bill-btn" onClick={onClose}>Clear Bill</button>
      </div>

      <div className="bill-meta">
        <p><b>Bill Date:</b> {billDate}</p>
        <p><b>Bill No:</b> CH-{bill.patientId}-{bill.appointmentNumber}</p>
      </div>

      <table className="bill-table">
        <tbody>
          <tr><td>Patient ID</td><td>{bill.patientId}</td></tr>
          <tr><td>Patient Name</td><td>{bill.patientName}</td></tr>
          <tr><td>Diagnosis</td><td>{bill.diagnosis}</td></tr>
          <tr><td>Doctor</td><td>Dr. {bill.doctorName}</td></tr>
          <tr><td>Specialization</td><td>{bill.specialization}</td></tr>
          <tr><td>Appointment Time</td><td>{bill.appointmentTime}</td></tr>
          <tr><td>Hours Admitted</td><td>{bill.hours}</td></tr>
          <tr><td>Fee Per Hour</td><td>Rs.{bill.feePerHour}</td></tr>
        </tbody>
      </table>

      <div className="bill-total">
        <span>Total Amount</span>
        <strong>Rs.{totalAmount}</strong>
      </div>
    </div>
  );
}

export default BillReceipt;
