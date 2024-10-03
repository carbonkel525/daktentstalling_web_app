'use client'
import Button from '@/components/Button'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getBoekingOnRef } from '@/firebase/firebase'

interface BoekingInformationProps {
    firstName: string
    lastName: string
    email: string
    phone: string
    startDate: string
    endDate: string
    typeCover: string
    luifel: boolean
    demontage: boolean
    ref: string
}

export default function StallingOverzicht() {
    const [boekingInformation, setBoekingInformation] = useState<BoekingInformationProps | null>(null)

    const { id } = useParams()

    useEffect(() => {
        const fetchStallingDetails = async () => {
            if (!id) {
                return
            }
            try {
                if (typeof id === 'string') {
                    const boeking = await getBoekingOnRef(id)
                    if (boeking) {
                        setBoekingInformation(boeking as BoekingInformationProps)
                    } else {
                        console.error('Boeking not found')
                    }
                } else {
                    console.error('Invalid id type:', typeof id)
                }
                console.log(id)
            } catch (error: unknown) {
                console.error('Fout bij het ophalen van stallinggegevens:', error)
            }
        }
        fetchStallingDetails()
    }, [id])


    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Afhaal moment geboekt</h1>
            <div className="bg-gray-100 shadow-md rounded-md px-8 pt-6 pb-8 mb-4 max-w-xl w-full">
                <p className="text-lg font-bold">Bedankt voor het boeken van een afhaal moment!</p>
                <div className='flex justify-between'>
                    <p className='text-lg'>Referentienummer boeking:</p>
                    <p className='text-lg'>{id}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-lg'>Naam: </p>
                    <p className='text-lg'>{boekingInformation?.firstName} {boekingInformation?.lastName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-lg'>E-mail: </p>
                    <p className='text-lg'>{boekingInformation?.email}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-lg'>Telefoonnummer: </p>
                    <p className='text-lg'>{boekingInformation?.phone}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-lg'>Daktent afgezet op: </p>
                    <p className='text-lg'>{boekingInformation?.startDate}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-lg'>Daktent afhalen op: </p>
                    <p className='text-lg'>{boekingInformation?.endDate}</p>
                </div>
                <p className="text-lg font-bold pt-2">Je ontvangt ook een e-mail met de details van je afhaal moment.</p>
            </div>
            <div className='w-96'>
                <Button text={"Terug naar hoofdpagina"} route={"/"} />
            </div>
        </div>
    )
}
