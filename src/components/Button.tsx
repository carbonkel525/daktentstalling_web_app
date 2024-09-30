import Link from 'next/link'
import React from 'react'

interface ButtonProps {
  text: string
  route?: string // Route is nu optioneel
}

export default function Button(props: ButtonProps) {
  // Als er geen route is opgegeven, render de button zonder Link
  return props.route ? (
    <Link href={props.route} className="block">
      <button className="bg-gray-300 text-black py-2 w-full rounded active:bg-gray-200">
        {props.text}
      </button>
    </Link>
  ) : (
    <button className="bg-gray-300 text-black py-2 w-full rounded active:bg-gray-200">
      {props.text}
    </button>
  )
}

