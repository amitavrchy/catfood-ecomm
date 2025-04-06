'use client';
import Image from 'next/image';
import React from 'react';

const HomeImageSection2 = () => {
  return (
    <section className="px-4 py-10 max-w-7xl mx-auto space-y-6">
      {/* Row 1 - Single Image */}
      <div className="w-full h-[300px] relative overflow-hidden rounded-xl">
        <Image
          src="/1.jpeg"
          alt="Main Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Row 2 - Three Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[2, 3, 5].map((num) => (
          <div key={num} className="w-full h-[200px] relative overflow-hidden rounded-xl">
            <Image
              src={`/${num}.jpeg`}
              alt={`Banner ${num}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeImageSection2;
