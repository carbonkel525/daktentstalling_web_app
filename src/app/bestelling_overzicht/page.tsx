'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface OrderDetails {
  id: string
  amount: number
  status: string
  items: string[]
  // Voeg hier meer velden toe zoals nodig
}

export default function BestellingOverzicht() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
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
      } catch (err) {
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bedankt voor je bestelling!</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">Bestellingsoverzicht</h2>
        <p>Bestelnummer: {orderDetails.id}</p>
        <p>Totaalbedrag: €{(orderDetails.amount / 100).toFixed(2)}</p>
        <p>Status: {orderDetails.status}</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Bestelde items:</h3>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}