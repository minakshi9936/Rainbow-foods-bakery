'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Local Customer',
    text: 'The best bakery in town! Their sourdough bread is absolutely incredible, and the staff is always so friendly. I come here every weekend.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    location: 'Regular Customer',
    text: 'Rainbow Foods made our wedding cake and it was stunning! Not only did it look beautiful, but it tasted amazing. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    location: 'Food Blogger',
    text: 'As a food blogger, I have high standards. Rainbow Foods & Bakery exceeds them all. Fresh ingredients, authentic recipes, and wonderful service.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    location: 'Business Owner',
    text: 'We order pastries from Rainbow Foods for all our office meetings. The quality is consistently excellent and delivery is always on time.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      if (!carouselApi) return;
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-pink-400">
            Voices Of Delight
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Genuine stories from the community that inspires every batch we bake
          </p>
        </div>

        <Carousel
          className="relative"
          setApi={setCarouselApi}
          opts={{ align: 'start', loop: true }}
        >
          <CarouselContent className="pb-12">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-4 md:basis-1/2 xl:basis-1/3"
              >
                <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/20 via-white/5 to-transparent p-8 shadow-[0px_20px_45px_-25px_rgba(244,114,182,0.45)] backdrop-blur">
                  <div className="mb-5 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    “{testimonial.text}”
                  </p>
                  <div className="mt-8">
                    <p className="text-base font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-pink-200/80">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-white/10 text-white hover:bg-pink-500/90 border-white/10" />
          <CarouselNext className="hidden md:flex bg-white/10 text-white hover:bg-pink-500/90 border-white/10" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
