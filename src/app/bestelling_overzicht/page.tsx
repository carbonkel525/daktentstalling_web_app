'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/Button'

interface OrderDetailsProps {
  id: string
  amount: number
  status: string
  items: string[]
  ref: string
  firstName: string
  lastName: string
  email: string
  phone: string
  startDate: string
  typeCover: string
  luifel: string
  endDate?: string
}

export default function BestellingOverzicht() {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError('Geen sessie-ID gevonden')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/order_details?session_id=${sessionId}`)

        if (!response.ok) {
          throw new Error('Fout bij het ophalen van bestellingsgegevens')
        }
        const data = await response.json()
        setOrderDetails(data)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        console.error('Fout bij het ophalen van bestellingsgegevens:', error)
        setError('Er is een fout opgetreden bij het laden van de bestellingsgegevens')
      } finally {
        setLoading(false)
      }
    }



    fetchOrderDetails()
  }, [sessionId])

  if (loading) return <div>Laden...</div>
  if (error) return <div>Fout: {error}</div>
  if (!orderDetails) return <div>Geen bestellingsgegevens gevonden</div>

  return (
    <Suspense>
      <div className="p-6 min-h-screen flex">
        <h1 className="text-2xl font-bold mb-4 mx-auto flex justify-center">Bedankt voor je bestelling!</h1>
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100 max-w-96">
          <h2 className="text-xl font-semibold mb-2">Bestellingsoverzicht</h2>
          <p>Bestelnummer: {orderDetails.ref}</p>
          <p>Totaalbedrag: €{(orderDetails.amount / 100).toFixed(2)}</p>
          {orderDetails.status === 'paid' && <p>Betaald!</p>}
          <h3 className="text-lg font-semibold mt-4 mb-2">Contactgegevens:</h3>
          <p>Naam: {orderDetails.firstName} {orderDetails.lastName}</p>
          <p>Email: {orderDetails.email}</p>
          <p>Telefoonnummer: {orderDetails.phone}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Stallinggegevens:</h3>
          <p>Startdatum: {orderDetails.startDate}</p>
          {orderDetails.endDate && <p>Einddatum: {orderDetails.endDate}</p>}
          {!orderDetails.endDate && <p>Einddatum: nog te boeken</p>}
          <p>Type cover: {orderDetails.typeCover}</p>
          <p>Luifel: {orderDetails.luifel}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Bestelde items:</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='max-w-96'>
          <Button text={"Terug naar hoofdpagina"} route={"/"} />
        </div>
      </div>
    </Suspense>
  )
}