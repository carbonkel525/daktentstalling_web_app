"use client";

import * as React from "react";
import { ModeToggle } from "./ModeToggle";


export default function Header() {

  
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-8">DAKTENTSTALLING</h1>
      <ModeToggle />
    </div>
  )
}
