import crypto from "crypto";

export async function POST(req: Request) {
  const { razorpayOrderId, razorpaySignature, razorpayPaymentId, id } =
    await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

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
