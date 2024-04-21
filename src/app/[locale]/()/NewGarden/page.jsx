"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";

const NewGarden = () => {
  const p = useTranslations("Index");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedService: "",
    preferredContact: "",
    numberOfBookings: "",
    dateOfBooking: null, // Initialize as null
    address: "noneed",
  });

  const [disabledDates, setDisabledDates] = useState([]);
  const t = useTranslations("Index");
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/calenderdata");
      const { dateCounts } = response.data;
      const disabledDates = dateCounts
        .filter((dateCount) => dateCount.count > 14)
        .map((dateCount) => new Date(dateCount.date));
      setDisabledDates(disabledDates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert date to string before submission
    const formattedFormData = {
      ...formData,
      dateOfBooking: formData.dateOfBooking.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
    console.log(formattedFormData);
    try {
      const response = await axios.post("/api/users", formattedFormData);
      if (response.data.success) {
        console.log("User created successfully:", response.data.data);
      } else {
        console.error("Failed to create user:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="selectedService" className="block mb-1">
          Selected Service
        </label>
        <select
          id="selectedService"
          name="selectedService"
          value={formData.selectedService}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Service</option>
          <option value="Medication">Medication</option>
          <option value="Transportation">Transportation</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="preferredContact" className="block mb-1">
          Preferred Contact
        </label>
        <select
          id="preferredContact"
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Contact</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Signal">Signal</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="numberOfBookings" className="block mb-1">
          Number of Bookings
        </label>
        <input
          type="number"
          id="numberOfBookings"
          name="numberOfBookings"
          value={formData.numberOfBookings}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBooking" className="block mb-1">
          Date of Booking
        </label>
        <DatePicker
          className="w-full border rounded px-3 py-2"
          selected={formData.dateOfBooking}
          onChange={(date) =>
            setFormData({
              ...formData,
              dateOfBooking: date,
            })
          }
          filterDate={(date) => {
            return !disabledDates.find(
              (disabledDate) =>
                date.getDate() === disabledDate.getDate() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getFullYear() === disabledDate.getFullYear()
            );
          }}
        />
      </div>

      <div className="mb-4 hidden">
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value="power"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        ></textarea>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary-foreground hover:text-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewGarden;
