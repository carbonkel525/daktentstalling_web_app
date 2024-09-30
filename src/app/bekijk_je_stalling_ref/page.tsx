"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BoekJeStalling() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-white">
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 bg-gray-300 text-black py-1 px-3 rounded"
            >
                Terug
            </button>
            <h1 className="text-2xl font-bold mb-8">DAKTENTSTALLING</h1>
            <h2 className="text-lg font-semibold p-1">Bekijk je stalling</h2>
            <p className="pb-2">Vul je referentienummer in:</p>
            <input
                type="number"
                placeholder="000000000000"
                className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out max-w-sm"
            />
            <div className="flex flex-col space-y-4 w-full max-w-sm">
                <Link href="/bekijk_je_stalling">
                    <button className="bg-gray-300 text-black py-2 w-full rounded active:bg-gray-200">
                        Doorgaan
                    </button>
                </Link>
            </div>
        </div>
    );
}
