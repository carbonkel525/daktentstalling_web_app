'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface OrderDetailsProps {
  id: string
  amount_total: number
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
  demontage: string
}

export default function BestellingOverzicht() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  console.log('Session ID ontvangen:', sessionId);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError('Geen sessie-ID gevonden');
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`/api/order_details?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Fout bij het ophalen van bestellingsgegevens');
        }
        const data = await response.json();
        console.log('data details:', data);  // Log de data die je ophaalt
        setOrderDetails(data);
      } catch (error: unknown) {
        console.error('Fout bij het ophalen van bestellingsgegevens:', error);
        setError('Er is een fout opgetreden bij het laden van de bestellingsgegevens');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderDetails();
  }, [sessionId]);
  

  if (loading) return <div>Laden...</div>
  if (error) return <div>Fout: {error}</div>
  if (!orderDetails) return <div>Geen bestellingsgegevens gevonden</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Bedankt voor je bestelling!</h1>
      <div className="shadow-md rounded-sm px-8 pt-6 pb-8 mb-4 bg-gray-100 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-2">Bestellingsoverzicht</h2>
        <div className='flex justify-between'>
          <p>Bestelnummer: </p>
          <p>{orderDetails.ref}</p>
        </div>
        <div className='flex justify-between'>
          <p>Totaalbedrag: </p>
          <p>€{(orderDetails.amount_total / 100).toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
          <p>Betaling: </p>
          {orderDetails.status === 'paid' && <p>paid</p>}
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Contactgegevens:</h3>
        <div className='flex justify-between'>
          <p>Naam: </p>
          <p>{orderDetails.firstName} {orderDetails.lastName}</p>
        </div>
        <div className='flex justify-between'>
          <p>Email: </p>
          <p>{orderDetails.email}</p>
        </div>
        <div className='flex justify-between'>
          <p>Telefoonnummer: </p>
          <p>{orderDetails.phone}</p>
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Stallinggegevens:</h3>
        <div className='flex justify-between'>
          <p>Startdatum: </p>
          <p>{orderDetails.startDate}</p>
        </div>
        <div className='flex justify-between'>
          <p>Einddatum: </p>
          <p>{orderDetails.endDate ? orderDetails.endDate : "nog te boeken"}</p>
        </div>
        <div className='flex justify-between'>
          <p>Type cover: </p>
          <p>{orderDetails.typeCover}</p>
        </div>
        <div className='flex justify-between'>
          <p>Luifel: </p>
          <p>{!orderDetails.luifel ? "Ja" : "Nee"}</p>
        </div>
        <div className='flex justify-between'>
          <p>Demontage bij afzetten: </p>
          <p>{orderDetails.demontage ? "Ja" : "Nee"}</p>
        </div>
      </div>
      <div className="mt-4 min-w-96">
        <Button onClick={() => router.push("/")}></Button>
      </div>
    </div>
  )
}

