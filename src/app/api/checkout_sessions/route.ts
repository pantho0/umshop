// app/api/checkout_sessions/route.js
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { items, orderData } = await req.json();
  const headersList = await headers();
  const origin = headersList.get("origin");

  try {
    // Create checkout session with order ID in metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Ensure integer value
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderData.orderId}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: orderData.orderId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
