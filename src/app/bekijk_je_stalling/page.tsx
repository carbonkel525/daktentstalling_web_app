"use client";
import { useRouter } from "next/navigation";

export default function BekijkJeStalling() {
  const router = useRouter();

  // Functie om terug te gaan naar de vorige pagina
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-white">
      {/* Hoofdtitel */}
      <h1 className="text-2xl font-bold mb-4">DAKTENTSTALLING</h1>

      {/* Ondertitel */}
      <h2 className="text-lg font-semibold mb-6">Bekijk je stalling</h2>

      {/* Formulier met details */}
      <div className="w-full max-w-md bg-gray-100 p-5 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Type Daktent:</p>
          <p className="text-gray-500">Soft Cover</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Luifel:</p>
          <p className="text-gray-500">Ja</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Montage bij afhaling:</p>
          <p className="text-gray-500">Ja</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Daktent afgezet op:</p>
          <p className="text-gray-500">01/09/2024</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Daktent afhalen op:</p>
          <p className="text-gray-500">TBD</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Naam:</p>
          <p className="text-gray-500 flex items-center">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            Pietje Puk
          </p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Email:</p>
          <p className="text-gray-500 flex items-center">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            pietjepuk@gmail.com
          </p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Gsm:</p>
          <p className="text-gray-500 flex items-center">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            0477777777
          </p>
        </div>

        {/* Betalingsinformatie */}
        <div className="border-t border-gray-300 my-4 py-2">
          <p>Je betaalt maandelijks: <strong>€29.95</strong></p>
        </div>

        {/* Terug knop */}
        <button
          onClick={handleBack}
          className="bg-gray-300 text-black py-2 rounded w-full active:bg-gray-200"
        >
          Terug
        </button>
      </div>
    </div>
  );
}
