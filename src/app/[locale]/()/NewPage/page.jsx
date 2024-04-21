"use client";
import { useState, useEffect } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedService: "",
    preferredContact: "",
    numberOfBookings: "",
    dateOfBooking: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post("/api/calenderdata");
  //       const dateCounts = response.data.dateCounts;

  //       // Filter dates with count greater than 15
  //       const filteredDates = dateCounts.filter((date) => date.count > 15);

  //       // Extract only the date values
  //       const filteredDateValues = filteredDates.map((date) => date.date);

  //       setDatesWithCountGreaterThan15(filteredDateValues);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("/api/users", formData);
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
        {/* <Select
          // id="selectedService"
          name="selectedService"
          value={formData.selectedService}
          onValueChange={() => setFormData({...formData, selectedService: value})} 
        >
          <SelectTrigger className="w-full border rounded px-3 py-2">
            <SelectValue placeholder="Select Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Medication">Medication</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select> */}
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
        {/* <Select
          id="preferredContact"
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <SelectTrigger className="w-full border rounded px-3 py-2">
            <SelectValue placeholder="Select Contact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
          </SelectContent>
        </Select> */}
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
        {/* <input
          type="date"
          id="dateOfBooking"
          name="dateOfBooking"
          value={formData.dateOfBooking}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        /> */}
        <DatePicker
          className="w-full border rounded px-3 py-2"
          selected={formData.dateOfBooking}
          onChange={(date) =>
            setFormData({
              ...formData,
              dateOfBooking: date,
            })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
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

export default BookingForm;
