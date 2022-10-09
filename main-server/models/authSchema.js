import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    dealer: String,
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "This email item is already exist"],
    },
    phone: String,
    password: { type: String, required: [true, "Please an a password"] },
    userIcon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var User = mongoose.model("User", userSchema);

export default User;
