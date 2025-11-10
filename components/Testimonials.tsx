'use client';

import { Star } from 'lucide-react';

const Testimonials = () => {
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

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/40 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-black">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
