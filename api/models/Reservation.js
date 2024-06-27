import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    date: {
        type: Date,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rest: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
  },
  { timestamps: true }
);



export default mongoose.model("Reservation", ReservationSchema);