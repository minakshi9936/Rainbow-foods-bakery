'use client';

import { Heart, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every product is crafted with passion and care using traditional recipes',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients sourced from trusted suppliers',
    },
    {
      icon: Users,
      title: 'Family Owned',
      description: 'A family business serving the community for over 20 years',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Rainbow Foods & Bakery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since 2003, Rainbow Foods & Bakery has been a cornerstone of our community,
            providing fresh, delicious baked goods that bring joy to every occasion. Our
            master bakers combine time-honored techniques with creative innovation to deliver
            products that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/40 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
