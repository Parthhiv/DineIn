import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
        type: 'String',
        required: true
    },
    location: {
        type: 'String',
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    contact: {
        type: 'String',
        required: true
    }, 
    description: {
        type: 'String',
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    price: {
        type: 'String',
        required: true
    },
    rating: {
        type: Number
    }

  },
  { timestamps: true }
);



export default mongoose.model("Restaurant", RestaurantSchema);