import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    emailAddress: {
      type: String,
      required: [true, "Please provide your email address"],
    },
    phoneNum: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

var Contact = mongoose.model("Contact", contactSchema);

export default Contact;
