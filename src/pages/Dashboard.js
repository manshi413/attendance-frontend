import React, { useState, useEffect } from "react";
import { getAttendance, markAttendance } from "../services/api";
import './Dashboard';

const Dashboard = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    studentId: "",
    date: "",
    status: "Present", // Default status
  });

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data } = await getAttendance();
      setAttendanceRecords(data);
    };

    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendance(newRecord);
    const { data } = await getAttendance();
    setAttendanceRecords(data);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Mark Attendance</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={newRecord.studentId}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={newRecord.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h3>Attendance Records</h3>
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record._id}>
            {record.studentId.name} - {record.date.split("T")[0]} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;