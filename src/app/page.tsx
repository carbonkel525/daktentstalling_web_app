import Header from "@/components/Header";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-10">
      {/* Hoofdtitel */}
      <Header />
      {/* Ondertitel */}
      <h2 className="text-lg font-semibold mb-6">
        Boek je stalling of plan je afhaling
      </h2>

      {/* Knoppen */}
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Button text={"Boek je stalling"} route="/boek_je_stalling"/>
        <Button text={"Plan je afhaling"} route="/plan_je_afhaling_ref"/>
        <Button text={"Bekijk je stalling"} route="/bekijk_je_stalling_ref"/>
      </div>
    </div>
  );
}
