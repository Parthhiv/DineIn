import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    rest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  },
  { timestamps: true }
);



export default mongoose.model("Admin", AdminSchema);