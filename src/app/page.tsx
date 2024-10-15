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
        <div className="flex flex-col bg-secondary p-5 border-border border-2 rounded-md">
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
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
