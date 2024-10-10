import { addBoeking, addStalling, getBoekingOnRef } from "@/firebase/firebase";
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

    const refBoeking = session.metadata?.refBoeking;
    const refStalling = session.metadata?.refStalling;

    // Controleer of er al een boeking met hetzelfde referentienummer bestaat
    const existingBoeking = refBoeking ? await getBoekingOnRef(refBoeking) : null;
    if (existingBoeking) {
      return NextResponse.json(existingBoeking, { status: 200 });
   }
   

    // Controleer of de betaling succesvol is geweest
    if (session.payment_status === "paid" && refBoeking) {
      
      // Voeg de boeking toe aan Firebase als deze nog niet bestaat
      await addBoeking({
        ref: refBoeking,
        demontage: session.metadata?.demonteer || "",
        firstName: session.metadata?.firstName || "",
        lastName: session.metadata?.lastName || "",
        email: session.metadata?.email || "",
        phone: session.metadata?.phone || "",
        startDate: session.metadata?.startDate || "",
        endDate: session.metadata?.endDate || "",
        typeCover: session.metadata?.typeCover || "",
        luifel: session.metadata?.luifel || "",
      });

      // Voeg de stalling toe aan Firebase
      await addStalling({
        tenantFirstName: session.metadata?.firstName || "",
        tenantLastName: session.metadata?.lastName || "",
        startDate: session.metadata?.startDate || "",
        endDate: session.metadata?.endDate || "",
        status: "active",
        tenantEmail: session.metadata?.email || "",
        stallingRef: refStalling || "",
        boekingRef: refBoeking,
      });
    } else {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Stuur de ordergegevens terug
    const orderDetails = {
      id: session?.id,
      amount_total: session?.amount_total,
      status_status: session?.payment_status,
      items: session.line_items?.data.map((item) => item.description) || [],
      ref: refBoeking,
      firstName: session.metadata?.firstName || "",
      lastName: session.metadata?.lastName || "",
      email: session.metadata?.email || "",
      phone: session.metadata?.phone || "",
      startDate: session.metadata?.startDate || "",
      typeCover: session.metadata?.typeCover || "",
      luifel: session.metadata?.luifel || "",
      endDate: session.metadata?.endDate || "",
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


