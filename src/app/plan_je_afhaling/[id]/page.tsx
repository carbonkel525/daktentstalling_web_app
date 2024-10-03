"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { getBoekingOnRef, updatePickupDateBoeking, updatePickupDateStalling } from "@/firebase/firebase";

export default function PlanJeAfhaling() {
    const router = useRouter();
    const { id } = useParams();
    const [boekingMontage, setBoekingMontage] = useState("");
    const [pickupDate, setPickupDate] = useState("");

    useEffect(() => {
        // Fetch data
        const fetchBoeking = async () => {
            if (typeof id === 'string') {
                const boeking = await getBoekingOnRef(id);
                if (boeking && boeking.demontage == "false") {
                    setBoekingMontage("Nee");
                } else if (boeking && boeking.demontage == "true") {
                    setBoekingMontage("Ja");
                }
                if (!boeking) {
                    router.push("/plan_je_afhaling_ref");
                }
            }
        };
        fetchBoeking();
    }, [id, router]);

    const sendEmailToAdmins = async () => {
        // Send email to admins
        try {
            const response = await fetch("/api/send-email-to-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    receiver: "losanton280@gmail.com",
                    subject: "Afhaal moment informatie",
                    message: "Er is een nieuwe afhaling gepland!",
                }),
            });
            if (response.ok) {
                router.push(`/stalling_overzicht/${id}`);
                const data = {
                    ref: id.toString(),
                    pickupDate: pickupDate
                };
                await updatePickupDateStalling(data);
                await updatePickupDateBoeking(data);
            } else {
                console.error("E-mail verzenden mislukt: ", response);
            }
        } catch (error) {
            console.error("E-mail verzenden mislukt: ", error);
        }
    }



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
            <h2 className="text-lg font-semibold mb-6">Plan je afhaling</h2>

            {/* Referentienummer */}
            <div className="w-full max-w-md bg-gray-100 p-5 rounded-lg shadow-md">
                <div className="mb-4">
                    <p className="text-sm font-semibold">Referentienummer:</p>
                    <p className="text-gray-500">{id}</p>
                </div>

                {/* Datum en tijd kiezen */}
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Kies uw afhaal moment</label>
                    <input
                        type="date"
                        className="w-full mb-2 p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
                        onChange={(e) => setPickupDate(e.target.value)}
                    />
                    <input
                        type="time"
                        className="w-full p-2 border rounded shadow-sm focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    />
                </div>

                {/* Demontage informatie */}
                <div className="mb-4">
                    <span className="font-semibold">Montage bij afhaling: </span>
                    <p className="text-gray-500">{boekingMontage}</p>
                </div>

                {/* Adres */}
                <div className="mb-4">
                    <p className="font-semibold">Adres:</p>
                    <p className="text-gray-500">Depot Wilaert-Van Boom, Liezele-dorp 22-24, 2870 Puurs-St-Amands</p>
                </div>

                {/* Boeken knop */}
                <Button text={"Afhaal moment boeken"} onClick={sendEmailToAdmins} />
            </div>
        </div>
    );
}

