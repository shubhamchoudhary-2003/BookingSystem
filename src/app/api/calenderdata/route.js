import { NextResponse } from "next/server";
import { connect } from "../../../dbconfig/dbConfig";

// import{ Booking }from "@/models/bookingModel";
import Booking from "../../../models/bookingModel";
connect();

export async function GET(request) {
  try {
    const dateCounts = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$dateOfBooking" },
          },
          count: { $sum: "$numberOfBookings" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      dateCounts: dateCounts.map((date) => ({
        date: new Date(date.date),
        count: date.count,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
}





