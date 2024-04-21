"use client";
// page.jsx
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useTranslations } from "next-intl";
const localizer = momentLocalizer(moment);

const Page = () => {
  const [events, setEvents] = useState([]);
  const t = useTranslations("Index");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/calenderdata"); // Replace with your endpoint
      const { dateCounts } = response.data;
      const formattedEvents = dateCounts.map((dateCount) => ({
        start: new Date(dateCount.date),
        end: new Date(dateCount.date),
        title: `Bookings: ${dateCount.count}`,
        count: dateCount.count // Adding count property to events
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const eventStyleGetter = (event) => {
    // Customize the style of events here if needed
    return {
      style: {
        backgroundColor: event.count > 15 ? "green" : "red",
      },
    };
  };

  const handleButtonClick = () => {
    fetchData(); // Call fetchData when button is clicked
  };

  return (
    <div style={{ height: 500 }}>
      <button onClick={handleButtonClick}>Fetch Data</button> {/* Button to fetch data */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Page;
