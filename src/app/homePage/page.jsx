import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import LatestProducts from '@/components/Latest'
import Navbar from '@/components/Navbar'
import React from 'react'

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <LatestProducts />  
        <Footer />
    </>
  )
}

export default HomePage