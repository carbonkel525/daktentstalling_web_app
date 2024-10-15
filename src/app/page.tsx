"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ArrowIcon from "@/assets/scribble-svgrepo-com.svg";
import Image from "next/image";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col p-10">
      <Header />
      <div className="flex flex-grow justify-center items-center py-16">
        <div className="flex bg-card p-8 rounded-lg w-full max-w-6xl">
          <div className="flex flex-col w-1/2 pr-8">
            <div className="bg-secondary p-5 border-border border-2 rounded-md">
              <div className="text-center">
                <h2 className="px-2 text-3xl font-semibold">Daktent opslaan?</h2>
              </div>
              <div className="flex">
                <div className="pt-3">
                  <p className="text-lg text-left font-semibold">Veilig</p>
                  <p className="text-lg text-left font-semibold">Verzekerd</p>
                  <p className="text-lg text-left font-semibold">Makkelijk boeken</p>
                </div>
                <Image src={ArrowIcon} alt="arrow" className="w-24 h-32 mx-auto" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-base font-semibold mb-6">
                  Boek je stalling of plan je afhaling
                </h2>
                <div className="flex flex-col space-y-4 w-full max-w-sm">
                  <Button onClick={() => router.push("/boek_je_stalling")} className="font-semibold">
                    Boek je stalling
                  </Button>
                  <Button onClick={() => router.push("/plan_je_afhaling_ref")} className="font-semibold">
                    Plan je afhaling
                  </Button>
                  <Button onClick={() => router.push("/bekijk_je_stalling_ref")} className="font-semibold">
                    Bekijk je stalling
                  </Button>
                </div>
              </div>
            </div>
            <Testimonials />
          </div>
          <div className="w-1/2 pl-8">
            <h3 className="text-2xl font-semibold mb-4">Contact Informatie</h3>
            <p className="mb-2">Email: info@daktentstalling.be</p>
            <p className="mb-2">Telefoon: +32 477 24 90 19</p>
            <p className="mb-4">Adres: Depot Wilaert-Van Boom, Liezele-dorp 22-24, 2870 Puurs-St-Amands</p>
            
            <h3 className="text-2xl font-semibold mb-4">Onze Locatie</h3>
            <div className="bg-secondary h-64 rounded-lg mb-4">
              {/* Placeholder for map or image */}
              <p className="text-center pt-28">Kaart of afbeelding hier</p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">Onze Faciliteiten</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary h-32 rounded-lg">
                <p className="text-center pt-14">Foto 1</p>
              </div>
              <div className="bg-secondary h-32 rounded-lg">
                <p className="text-center pt-14">Foto 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 