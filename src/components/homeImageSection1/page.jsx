'use client';
import Image from 'next/image';
import React from 'react';

const HomeImageSection1 = () => {
  return (
    <div className="w-full h-[200px] relative overflow-hidden">
      <Image
        src="/1.jpeg" // make sure it's in the public folder
        alt="Homepage Banner"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
};

export default HomeImageSection1;
