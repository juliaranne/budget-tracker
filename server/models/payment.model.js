import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Missing category"],
    },
    amount: {
      type: Number,
      required: [true, "Missing amount"],
    },
    date: {
      type: Date,
      required: [true, "Missing date"],
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
