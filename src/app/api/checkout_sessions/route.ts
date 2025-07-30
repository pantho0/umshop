import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST(req: NextRequest) {
  const { items, userData } = await req.json();
  const headersList = await headers();
  const origin = headersList.get("origin");

  try {
    // Create Checkout Session from items in the Redux store
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
