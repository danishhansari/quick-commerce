import crypto from "crypto";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: Request) {
  const { razorpayOrderId, razorpaySignature, razorpayPaymentId, id } =
    await req.json();

  const isAuthentic = validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    razorpaySignature,
    process.env.RAZORPAY_SECRET!
  );

  console.log("Verification", isAuthentic);

  if (!isAuthentic) {
    return Response.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }
  return Response.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}
