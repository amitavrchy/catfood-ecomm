"use client"
import CategoryCards from '@/components/CategoryCards'
import CategorySlider from '@/components/CategoryNav'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import HomeImageSection1 from '@/components/homeImageSection1/page'
import HomeImageSection2 from '@/components/HomeImageSection2'
import LatestProducts from '@/components/Latest'
import Navbar from '@/components/Navbar'
import RestHome from '@/components/RestHome'
import TabbedHome from '@/components/TabbedHome/page'
import React from 'react'
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Filter 1...</div>}>
        <Navbar />
        <Hero />
        <CategoryCards />
        <LatestProducts />
        <TabbedHome />
        <RestHome />
      </Suspense>
      <Footer />
    </>
  )
}

export default HomePage