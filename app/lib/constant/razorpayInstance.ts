import Razorpay from "razorpay";

export const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET,
});
