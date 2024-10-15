"use client";

import * as React from "react";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";

export default function Header() {

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>DAKTENTSTALLING.BE</h1>
        <div className="pl-4">
          <ModeToggle />
        </div>
      </div>
      <p className="underline underline-offset-4 cursor-pointer" onClick={() => router.push("/contact")}>Contact</p>
    </div>
  )
}
