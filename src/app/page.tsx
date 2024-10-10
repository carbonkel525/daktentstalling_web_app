"use client"

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="min-h-screen p-10">
      <Header />
      <div className="flex flex-col justify-center items-center pt-48">
        <h2 className="text-lg font-semibold mb-6">
          Boek je stalling of plan je afhaling
        </h2>
        <div className="flex flex-col space-y-4 w-full max-w-sm">
          <Button onClick={() => router.push("/boek_je_stalling")}>Boek je stalling</Button>
          <Button onClick={() => router.push("/plan_je_afhaling_ref")}>Plan je afhaling</Button>
          <Button onClick={() => router.push("/bekijk_je_stalling_ref")}>Bekijk je stalling</Button>
        </div>
      </div>
    </div>
  );
}
