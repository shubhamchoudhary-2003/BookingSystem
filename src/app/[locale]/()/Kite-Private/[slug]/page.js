"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page({ params }) {
  const p = useTranslations("Index");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedService: params.slug || "", // Initialize with params.slug if available
    preferredContact: "",
    numberOfBookings: "4",
    dateOfBooking: null,
    address: "noneed",
  });
  const [loading, setLoading] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const [success, setSuccess] = useState(false); // State to track success
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

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateOfBooking: date,
      numberOfBookings: "", // Reset the number of bookings when a new date is selected
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/calenderdata");
      const { dateCounts } = response.data;
      const disabledDates = dateCounts
        .filter((dateCount) => dateCount.count > 13)
        .map((dateCount) => new Date(dateCount.date));
      setDisabledDates(disabledDates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting
    try {
      const response = await axios.post("/api/users", formData);
      if (response.data.success) {
        toast.success(
          "Booking created successfully. We will contact you soon."
        ); // Display success toast
        setSuccess(true); // Set success state to true
        console.log("Booking created successfully:", response.data.data);
        // Clear the form data after successful submission
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          selectedService: params.slug || "",
          preferredContact: "",
          numberOfBookings: "4",
          dateOfBooking: null,
          address: "noneed",
        });
      } else {
        toast.error("Failed to create booking"); // Display error toast
        console.error("Failed to create booking:", response.data.message);
      }
    } catch (error) {
      toast.error("Error creating booking"); // Display error toast
      console.error("Error creating booking:", error.message);
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 space-y-6">
        {success && ( // Display success message if success state is true
          <p className="text-green-500">{p("Scess")}</p>
        )}
        <h2 className="text-4xl font-bold">{params.slug}</h2>
        <p className="text-gray-500 dark:text-gray-400">{p("Ptext")}</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              {p("nameLabel")}
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
              {p("emailLabel")}
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
              {p("phoneNumberLabel")}
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
          {params.slug ? (
            <input
              type="hidden"
              id="selectedService"
              name="selectedService"
              value={params.slug}
              onChange={handleChange}
            />
          ) : (
            <div className="mb-4">
              <label htmlFor="selectedService" className="block mb-1">
                {p("selectedServiceLabel")}
              </label>
              <input
                type="text"
                id="selectedService"
                name="selectedService"
                value={formData.selectedService}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="preferredContact" className="block mb-1">
              {p("preferredContactLabel")}
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">{p("selectContactOption")}</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Signal">Signal</option>
            </select>
          </div>

          <div className="mb- hidden">
            <label htmlFor="numberOfBookings" className="block mb-1">
              {p("numberOfBookingsLabel")}
            </label>
            <input
              type="number"
              id="numberOfBookings"
              name="numberOfBookings"
              value="4"
              onChange={handleChange}
              min="1"
              max="15" // Maximum of 14 bookings
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBooking" className="block mb-1">
              {p("dateOfBookingLabel")}
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
              minDate={new Date()} // Set minimum date to current date
            />
          </div>

          <div className="mb-4 hidden">
            <label htmlFor="address" className="block mb-1">
              {p("addressLabel")}
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
              {p("submitButtonLabel")}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] bg-cover bg-center bg-[url('https://kite-mallorca.com/images/flying-friends/Privatlesson_with_Dani_15x6_1600wide.webp')] rounded-lg overflow-hidden shadow-lg md:ml-8 mt-8 md:mt-0" />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      )}
    </div>
  );
}
