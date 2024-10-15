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
    <div className="flex flex-col p-4 md:p-10">
      <Header />
      <div className="flex flex-grow justify-center items-center py-8 md:py-16">
        <div className="flex flex-col md:flex-row bg-card p-4 md:p-8 rounded-lg w-full max-w-6xl">
          <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <div className="bg-secondary p-5 border-border border-2 rounded-md">
              <div className="text-center">
                <h2 className="px-2 text-2xl md:text-3xl font-semibold">Daktent opslaan?</h2>
              </div>
              <div className="flex">
                <div className="pt-3">
                  <p className="text-base md:text-lg text-left font-semibold">Veilig</p>
                  <p className="text-base md:text-lg text-left font-semibold">Verzekerd</p>
                  <p className="text-base md:text-lg text-left font-semibold">Makkelijk boeken</p>
                </div>
                <Image src={ArrowIcon} alt="arrow" className="w-20 h-28 md:w-24 md:h-32 mx-auto" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-sm md:text-base font-semibold mb-6">
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
            <div className="mt-8">
              <Testimonials />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Contact Informatie</h3>
            <p className="mb-2">Email: info@daktentstalling.be</p>
            <p className="mb-2">Telefoon: +32 477 24 90 19</p>
            <p className="mb-4">Depot Wilaert-Van Boom, Liezele-dorp 22-24, 2870 Puurs-St-Amands</p>
            
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Onze Locatie</h3>
            <div className="w-full h-48 md:h-64 rounded-lg mb-4 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.4483297160577!2d4.276110077104712!3d51.06327347171564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3ed034acf13ff%3A0x9a539c0b341254fd!2sWillaert-Van%20Boom!5e0!3m2!1snl!2sbe!4v1729022428808!5m2!1snl!2sbe" 
                width="100%" 
                height="100%"
              ></iframe>
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Onze Faciliteiten</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary h-24 md:h-32 rounded-lg">
                <p className="text-center pt-10 md:pt-14">Foto 1</p>
              </div>
              <div className="bg-secondary h-24 md:h-32 rounded-lg">
                <p className="text-center pt-10 md:pt-14">Foto 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}