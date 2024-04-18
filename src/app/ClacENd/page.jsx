"use client";import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

const ClacENd = () => {
  const [startDate, setStartDate] = useState(new Date()); // Initialize startDate to current date
  const bookings = [
    { date: "2024-04-15", bookNO: 10 },
    { date: "2024-04-15", bookNO: 20 },
    { date: "2024-04-15", bookNO: 17 },
    { date: "2024-04-15", bookNO: 18 },
  ];

  const filteredDates = bookings
    .filter((booking) => booking.bookNO > 16)
    .map((booking) => new Date(booking.date));

  return (
    <div className="mx-auto max-w-lg">
      <DayPicker
        className="w-full border border-gray-200 rounded-md shadow-md p-2"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
        dateFormat={"dd/MM/yyyy"}
        excludeDates={filteredDates}
      />
    </div>
  );
};

export default ClacENd;
