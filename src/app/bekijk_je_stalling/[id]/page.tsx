"use client";
import Header from "@/components/Header";
import { getBoekingOnRef } from "@/firebase/firebase";
import { DocumentData } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BekijkJeStalling() {
  const router = useRouter();
  const { id } = useParams();

  const [boeking, setBoeking] = useState<DocumentData | null>(null);
  useEffect(() => {
    // Fetch data
    const fetchBoeking = async () => {
      if (typeof id === "string") {
        const boeking = await getBoekingOnRef(id);
        if (boeking) {
          setBoeking(boeking);
        }
        if (!boeking) {
          router.push("/plan_je_afhaling_ref");
        }
      }
    };
    fetchBoeking();
  }, [id, router]);

  // Functie om terug te gaan naar de vorige pagina
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      {/* Hoofdtitel */}
      <Header />

      {/* Ondertitel */}
      <h2 className="text-lg font-semibold mb-6">Bekijk je stalling</h2>

      {/* Formulier met details */}
      <div className="w-full max-w-md p-5 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Type Daktent:</p>
          <p>{boeking ? boeking.typeCover : "N/A"}</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Luifel:</p>
          <p>{boeking && boeking.luifel ? "Ja" : "N/A"}</p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Montage bij afhaling:</p>
          <p>{boeking && boeking.demontage ? "Ja" : "N/A"}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Daktent afgezet op:</p>
          <p>{boeking ? boeking.startDate : "N/A"}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Daktent afhalen op:</p>
          <p>{boeking && boeking.endDate ? boeking.endDate : "N/A"}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Naam:</p>
          <p className="flex items-center">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            <p>
              {boeking ? `${boeking.firstName || ""} ${boeking.lastName || ""}`.trim() : "N/A"}
            </p>
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Email:</p>
          <p className="flex items-center">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            <p>{boeking ? boeking.email : "N/A"}</p>
          </p>
        </div>

        <div className="flex justify-between mb-4">
          <p className="font-semibold">Gsm:</p>
          <p className="flex items-center">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            <p className="">{boeking ? boeking.phone : "N/A"}</p>
          </p>
        </div>

        {/* Betalingsinformatie */}
        <div className="border-t my-4 py-2">
          <p>Je betaalt maandelijks: <strong>€29.95</strong></p>
        </div>

        {/* Terug knop */}
        <button
          onClick={handleBack}
          className=" py-2 rounded w-full"
        >
          Terug
        </button>
      </div>
    </div>
  );
}
