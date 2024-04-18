"use client"
import React from "react";
import { DayPicker } from "react-day-picker";

const ClacENd = () => {
  const bookings = [
    { date: "2024 -04-15", bookNO: 10 },
    { date: "2024 -04-15", bookNO: 20 },
    { date: "2024 -04-15", bookNO: 17 },
    { date: "2024 -04-15", bookNO: 18 },
  ];

  const filteredDates = bookings
    .filter((booking) => booking.number > 16)
    .map((booking) => new Date(booking.date));

  return (
    <div>
      <DayPicker
        // selected={startDate}
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
