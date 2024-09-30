import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10">
      {/* Hoofdtitel */}
      <h1 className="text-2xl font-bold mb-8">DAKTENTSTALLING</h1>

      {/* Ondertitel */}
      <h2 className="text-lg font-semibold mb-6">
        Boek je stalling of plan je afhaling
      </h2>

      {/* Knoppen */}
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Link href="/boek_je_stalling" className="block">
          <button className="bg-gray-300 text-black py-2 w-full rounded active:bg-gray-200">
            Boek je stalling
          </button>
        </Link>
        <Link href="/plan_je_afhaling_ref" className="block">
          <button className="bg-gray-300 text-black py-2 w-full rounded active:bg-gray-200">
            Plan je afhaling
          </button>
        </Link>
        <Link href="/bekijk_je_stalling_ref" className="block">
          <button className="bg-gray-300 text-black py-2 w-full rounded active:bg-gray-200">
            Bekijk je stalling
          </button>
        </Link>
      </div>
    </div>
  );
}
