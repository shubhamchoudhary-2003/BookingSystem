"use client"
// pages/booking-page.jsx
// pages/page.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data.bookings);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>Name:</strong> {booking.name}, <strong>Email:</strong> {booking.email}, <strong>Date:</strong> {new Date(booking.dateOfBooking).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
