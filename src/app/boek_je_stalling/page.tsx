"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BoekJeStalling() {
  const router = useRouter();

  const [demonteer, setDemonteer] = useState(false);
  const [luifel, setLuifel] = useState(false);

  const handleDemonteerChange = () => {
    setDemonteer(!demonteer);
  };

  const handleLuifelChange = () => {
    setLuifel(!luifel);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create a Checkout Session
    const response = await fetch('/api/create_checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        demonteer,
        luifel,
      }),
    });

    if (response.ok) {
      const { sessionId } = await response.json();
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Failed to create checkout session');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-white">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-gray-300 text-black py-1 px-3 rounded"
      >
        Terug
      </button>
      {/* Hoofdtitel */}
      <Header />

      {/* Ondertitel */}
      <h2 className="text-lg font-semibold mb-6">Boek je stalling</h2>

      {/* Formulier */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-100 p-5 rounded-lg shadow-md">
        <label className="block mb-2">Type Daktent</label>
        <select className="w-full mb-4 p-2 bg-white border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out">
          <option disabled selected>Type Daktent</option>
          <option>Soft Cover</option>
          <option>Hard Cover</option>
          <option>Anders</option>
        </select>

        {/* Demontage Toggle */}
        <Toggle label={"Luifel"} checked={luifel} onChange={handleLuifelChange}/>
        {/* Demontage Toggle */}
        <Toggle label={"Demontage/montage"} checked={demonteer} onChange={handleDemonteerChange}/>

        {/* Datum en tijd kiezen */}
        <div className="mb-4">
          <label className="block mb-2">Kies uw afzet moment</label>
          <input
            type="date"
            className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
          />
          <input
            type="time"
            className="w-full p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
          />
        </div>

        {/* Invoervelden voor Naam, Email en Gsm */}
        <input
          type="text"
          placeholder="Naam"
          className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
          required
        />
        <input
          type="tel"
          placeholder="Gsm"
          className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
          required
        />

        {/* Betalingsinformatie */}
        <div className="border-t border-gray-300 my-4 py-2">
          <p>Je betaalt eenmalig: {demonteer && <strong>€49.95</strong>}</p>
          <p>Je betaalt maandelijks: <strong>€49.50</strong></p>
        </div>

        {/* Doorgaan knop */}
        <Button text={"Boek je stalling"} type="submit" />
      </form>
    </div>
  );
}