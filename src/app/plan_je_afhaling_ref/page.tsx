"use client"

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { getBoekingOnRef } from "@/firebase/firebase";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PlanJeAfhalingRef() {
    const router = useRouter();
    const [ref, setRef] = useState("");
    const [, setLoading] = useState(false);
    const [, setError] = useState("");

    const handleGetBoekingOnRef = async () => {
        setLoading(true);
        const boeking = await getBoekingOnRef(ref);
        if (boeking) {
            router.push(`/plan_je_afhaling/${ref}`);
        } else {
            setError("Geen boeking gevonden met dit referentienummer");
        }
        setLoading(false);
    }


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
                type="string"
                placeholder="DTS000000000000"
                className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out max-w-sm"
                onChange={(e) => setRef(e.target.value)}
            />
            <div className="w-full max-w-sm">
                <Button onClick={handleGetBoekingOnRef}></Button>
            </div>
        </div>
    );
}
