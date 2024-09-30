"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const [montage] = useState("Ja");

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
            <h2 className="text-lg font-semibold mb-6">Plan je afhaling</h2>

            {/* Referentienummer */}
            <div className="w-full max-w-md bg-gray-100 p-5 rounded-lg shadow-md">
                <div className="mb-4">
                    <p className="text-sm font-semibold">Referentienummer:</p>
                    <p className="text-gray-500">000000000000000000000000</p>
                </div>

                {/* Datum en tijd kiezen */}
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Kies uw afzet moment</label>
                    <input
                        type="date"
                        className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    />
                    <input
                        type="time"
                        className="w-full p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    />
                </div>

                {/* Demontage informatie */}
                <div className="mb-4">
                    <span className="font-semibold">Montage bij afhaling: </span>
                    <p className="text-gray-500">{montage}</p>
                </div>

                {/* Adres */}
                <div className="mb-4">
                    <p className="font-semibold">Adres:</p>
                    <p className="text-gray-500">Teststraat 123, 0000, Testdrop</p>
                </div>

                {/* Boeken knop */}
                <button className="bg-gray-300 text-black py-2 rounded w-full active:bg-gray-200">
                    Afhaal moment boeken
                </button>
            </div>
        </div>
    );
}

