import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  selectedService: {
    type: String,
    required: true
  },
  preferredContact: {
    type: String,
    required: true
  },
  numberOfBookings: {
    type: Number,
    required: true
  },
  dateOfBooking: {
    type: Date,
    required: true
  },
  address: {
    type: String,
   
  }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;