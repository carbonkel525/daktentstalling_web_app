import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Card, CardContent } from './ui/card'

export default function Testimonials() {

    const testimonials = [
        {
            name: 'Jef',
            rating: '⭐⭐⭐⭐⭐',
            text: 'Ik ben heel tevreden over de service van daktentstalling.be. De stalling is veilig en makkelijk te boeken.'
        },
        {
            name: 'Katrien',
            rating: '⭐⭐⭐⭐',
            text: 'De stalling is goed verzekerd en ik kan mijn daktent makkelijk afhalen.'
        },
        {
            name: 'Tom',
            rating: '⭐⭐⭐⭐⭐',
            text: 'Ik ben heel tevreden over de service van daktentstalling.be. De stalling is veilig en makkelijk te boeken.'
        },
    ]

  return (
    <Carousel className="max-w-xs">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="py-7">
              <Card className='h-auto rounded-2xl opacity-80'>
                <CardContent className="flex flex-col items-center justify-center p-4">
                    <p className="text-center text-sm text-muted-foreground">{testimonial.name}</p>
                    <p className="text-center text-sm text-muted-foreground">{testimonial.rating}</p>
                    <p className="text-center text-lg font-semibold mb-2">&quot;{testimonial.text}&quot;</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
