import { NextResponse } from "next/server";
import { ApiError } from "@/helpers/ApiError.js";
import { connect } from "@/dbconfig/dbConfig.js";
import Booking from "@/models/bookingModel.js"; 

connect();

export async function POST(request) {
  try {
    const {
      name,
      email,
      phoneNumber,
      selectedService,
      preferredContact,
      numberOfBookings,
      dateOfBooking,
      address,
    } = await request.json();

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !selectedService ||
      !preferredContact ||
      !numberOfBookings ||
      !dateOfBooking ||
      !address
    ) {
        console.log("hi")
      throw new ApiError(400, "All fields are necessary");
    }

    const newBooking = await Booking.create({
      name,
      email,
      phoneNumber,
      selectedService,
      preferredContact,
      numberOfBookings,
      dateOfBooking,
      address,
    });

    if (!newBooking) {
      throw new ApiError(500, "Unable to save booking data");
    }

    
    return NextResponse.json(
      {
        message: "Booking created successfully",
        success: true,
        data: newBooking,
      },
      { status: 200 }
    );
  } catch (error) {
    const response = NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: error.statusCode || 500,
      }
    );

    return response;
  }
}
