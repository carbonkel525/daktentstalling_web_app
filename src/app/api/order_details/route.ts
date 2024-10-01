import { addBoeking, getBoekingOnRef, removeBoekingOnRef } from "@/firebase/firebase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    // Haal de Stripe sessie op
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const ref = generateRandomRef();
    // Controleer of de betaling succesvol is geweest
    if (session.payment_status === "paid") {
      
      // Voeg de boeking toe aan Firebase
      await addBoeking({
        ref: ref,
        demontage: session.metadata?.demonteer || "", // Veronderstelt dat metadata is toegevoegd in de sessie
        fullName: session.metadata?.fullName || "",
        email: session.metadata?.email || "",
        phone: session.metadata?.phone || "",
        startDate: session.metadata?.startDate || "",
        endDate: session.metadata?.endDate || "",
        typeCover: session.metadata?.typeCover || "",
        luifel: session.metadata?.luifel || "",
      });

      
    } else {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const orderDetails = {
      id: session.id,
      amount: session.amount_total,
      status: session.payment_status,
      items: session.line_items?.data.map((item) => item.description) || [],
      ref: ref,
    };

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json(
      { error: "Error retrieving order details" },
      { status: 500 }
    );
  }
}

function generateRandomRef(length: number = 15): string {
  // Zorg ervoor dat de lengte van het cijfergedeelte minstens 3 is (voor 'DTS' en 12 cijfers)
  if (length < 15) {
    throw new Error(
      "Length must be at least 15 to include 'DTS' and 12 digits."
    );
  }

  const randomDigits = Array.from({ length: length - 3 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Voeg 'DTS' toe aan het begin van het nummer
  return `DTS${randomDigits}`;
}
