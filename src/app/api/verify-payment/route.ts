import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { confirmOrder } from "@/services/order";

export async function POST(req: NextRequest) {
  const { session_id, orderData } = await req.json();

  if (!session_id) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    // Verify the payment by retrieving the session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check if payment was successful
    if (session.payment_status === "paid") {
      // Update order status to Paid and add payment details
      const finalOrderData = {
        ...orderData,
        // status: "Paid",
        // paymentId: session.payment_intent,
        // paidAt: new Date().toISOString(),
      };

      // Create the order in your database with final status
      const order = await confirmOrder(finalOrderData);

      return NextResponse.json({
        success: true,
        orderId: order.data.orderId || orderData.orderId,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment not completed",
      });
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
