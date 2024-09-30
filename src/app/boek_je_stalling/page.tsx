"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-white">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-gray-300 text-black py-1 px-3 rounded"
      >
        Terug
      </button>
      {/* Hoofdtitel */}
      <h1 className="text-2xl font-bold mb-4">DAKTENTSTALLING</h1>

      {/* Ondertitel */}
      <h2 className="text-lg font-semibold mb-6">Boek je stalling</h2>

      {/* Formulier */}
      <div className="w-full max-w-md bg-gray-100 p-5 rounded-lg shadow-md">
        <label className="block mb-2">Type Daktent</label>
        <select className="w-full mb-4 p-2 bg-white border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out">
          <option disabled selected>Type Daktent</option>
          <option>Luifel</option>
          <option>Anders</option>
        </select>


        {/* Demontage Toggle */}
        <div className="flex justify-between items-center mb-4">
          <span>Luifel</span>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={demonteer}
              onChange={handleLuifelChange}
            />
            <div className={`toggle-bg w-12 h-6 bg-gray-300 rounded-full shadow-inner relative ${luifel ? "bg-green-600" : ""
              }`}>
              <div
                className={`toggle-dot w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${luifel ? "translate-x-6" : "translate-x-0"
                  }`}
              ></div>
            </div>
          </label>
        </div>

        {/* Demontage Toggle */}
        <div className="flex justify-between items-center mb-4">
          <span>Demontage (inclusief montage bij afhaling)</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={demonteer}
              onChange={handleDemonteerChange}
            />
            <div className={`toggle-bg w-12 h-6 bg-gray-300 rounded-full shadow-inner relative ${demonteer ? "bg-green-600" : ""
              }`}>
              <div
                className={`toggle-dot w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${demonteer ? "translate-x-6" : "translate-x-0"
                  }`}
              ></div>
            </div>
          </label>
        </div>

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
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
        />
        <input
          type="tel"
          placeholder="Gsm"
          className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
        />

        {/* Betalingsinformatie */}
        <div className="border-t border-gray-300 my-4 py-2">
          <p>Je betaalt eenmalig: {luifel && <strong>€49.95</strong>}</p>
          <p>Je betaalt maandelijks: <strong>€49.50</strong></p>
        </div>

        {/* Doorgaan knop */}
        <button className="bg-gray-300 text-black py-2 rounded w-full active:bg-gray-200">
          Doorgaan
        </button>
      </div>
    </div>
  );
}
