"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial selected date
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/users?date=${selectedDate.toISOString()}`);
      setBookings(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Fetch data on date change

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div>
      <h1>Bookings</h1>
      <input type="date" value={selectedDate.toISOString().slice(0, 10)} onChange={handleDateChange} />
      {loading && <p>Loading bookings...</p>}
      {error && <p>Error: {error}</p>}
      {bookings.length > 0 && (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>{booking.details}</li> // Replace with booking details property
          ))}
        </ul>
      )}
      {bookings.length === 0 && !loading && <p>No bookings found for this date.</p>}
    </div>
  );
};

export default Bookings;
