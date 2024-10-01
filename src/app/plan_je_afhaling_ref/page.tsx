"use client"

import Button from "@/components/Button";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { getBoeking } from "@/firebase/firebase";

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
            <Header />
            <h2 className="text-lg font-semibold p-1">Plan je afhaling</h2>
            <p className="pb-2">Vul je referentienummer in:</p>
            <input
                type="number"
                placeholder="000000000000"
                className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out max-w-sm"
            />
            <div className="flex flex-col space-y-4 w-full max-w-sm">
                <Button text={"Doorgaan"} route="/plan_je_afhaling" onClick={getBoeking} />
            </div>
        </div>
    );
}
