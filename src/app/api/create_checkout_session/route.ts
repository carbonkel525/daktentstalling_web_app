import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51PCfeIJAdyDva545kf5k5jcsvP4f3dRx9TAqARZ3gdZlYNRzgsaRYZH43IWuz31nTwKKOHRkxPTvXYgYvd49t8Cu00PvQfwLAh"!, {
  apiVersion: "2024-06-20", // Use the latest API version
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { demonteer, luifel, firstName, lastName, email, phone, startDate, typeCover } = body;
    console.log("Received data:", body);

    const refBoeking = generateRandomRefBoeking();
    const refStalling = genereateRandomRefStalling();

    // Bereken het totale bedrag
    const amount = 4950 + (demonteer ? 4995 : 0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["bancontact", "card", "ideal"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Daktent Stalling",
            },
            unit_amount: amount, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/bestelling_overzicht?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        demonteer: demonteer.toString(),
        luifel: luifel.toString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        startDate: startDate,
        typeCover: typeCover,
        refBoeking: refBoeking,
        refStalling: refStalling,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}

function generateRandomRefBoeking(length: number = 15): string {
  if (length < 15) {
    throw new Error(
      "Length must be at least 15 to include 'DTS' and 12 digits."
    );
  }

  const randomDigits = Array.from({ length: length - 3 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `DTS${randomDigits}`;
}

function genereateRandomRefStalling(length: number = 15): string {
  if (length < 15) {
    throw new Error(
      "Length must be at least 15 to include 'DTS' and 12 digits."
    );
  }

  const randomDigits = Array.from({ length: length - 3 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `ST${randomDigits}`;
}

