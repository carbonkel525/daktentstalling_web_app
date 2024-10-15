"use client"

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Header from "@/components/Header";
import Toggle from "@/components/Toggle";
import { Button } from "@/components/ui/button";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BoekJeStalling() {

  const [demonteer, setDemonteer] = useState(false);
  const [luifel, setLuifel] = useState(false);
  const [typeCover, setTypeCover] = useState("");
  const [startDate, setStartDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleDemonteerChange = () => {
    setDemonteer(!demonteer);
  };

  const handleLuifelChange = () => {
    setLuifel(!luifel);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    try {
      // Maak een Stripe Checkout-sessie aan
      const response = await fetch('/api/create_checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          demonteer: demonteer,
          luifel: luifel,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          startDate: startDate,
          typeCover: typeCover,
        }),
      });


      if (response.ok) {
        const { sessionId } = await response.json();
        const stripe = await stripePromise;

        // Redirect naar Stripe Checkout
        const { error } = await stripe!.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Stripe redirect error:', error);
        }
      } else {
        console.error('Failed to create Stripe checkout session');
      }
    } catch (error) {
      console.error("Error in handleSubmit: ", error);
    }
  };




  return (
    <div className="p-10">
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen p-6">

        <h2 className="text-lg font-semibold mb-6">Boek je stalling</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md p-5 rounded-lg shadow-md bg-card">
          <label className="block mb-2">Type Daktent</label>
          <select
            className="w-full mb-4 p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
            value={typeCover} // Gebruik value hier
            onChange={(e) => setTypeCover(e.target.value)}
          >
            <option disabled value="">Type Daktent</option> {/* Gebruik value="" om de placeholder te maken */}
            <option value="Soft Cover">Soft Cover</option>
            <option value="Hard Cover">Hard Cover</option>
            <option value="Anders">Anders</option>
          </select>


          <Toggle label={"Luifel"} checked={luifel} onChange={handleLuifelChange} />
          <Toggle label={"Demontage/montage"} checked={demonteer} onChange={handleDemonteerChange} />

          <div className="mb-4">
            <label className="block mb-2">Kies uw afzet moment</label>
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="time"
              className="w-full p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
            />
          </div>

          <input
            type="text"
            placeholder="Voornaam"
            className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
            required
            onChange={(e) => setFirstName(e.target.value)}

          />
          <input
            type="text"
            placeholder="Achternaam"
            className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
            required
            onChange={(e) => setLastName(e.target.value)}

          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Gsm"
            className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
            required
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Betalingsinformatie */}
          <div className="border-t my-4 py-2">
            <p>Je betaalt eenmalig: {demonteer && <strong>€49.95</strong>}</p>
            <p>Je betaalt maandelijks: <strong>€49.50</strong></p>
          </div>

          {/* Doorgaan knop */}
          <Button type="submit" className="w-full">Doorgaan</Button>
        </form>
      </div>
    </div>
  );
}