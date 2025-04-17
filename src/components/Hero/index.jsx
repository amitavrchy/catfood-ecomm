"use client"
import React, { useState, useEffect } from 'react';
import 'animate.css';

const sliderItems = [
    {
        id: 1,
        title: "এক্সক্লুসিভ অফার, ৪০% ছাড়",
        description: "গেমিং এর দুনিয়ায় হারিয়ে যান, প্লেস্টেশন ৫ পাওয়া যাচ্ছে",
        primaryBtnName: "এখন কিনুন",
        primaryBtnURL: "#",
        secondaryBtnName: "আরো দেখুন",
        secondaryBtnURL: "#",
        productImageURL: "https://i.ibb.co/TxgxrNgh/header-playstation-image-Dg2-F6g-Fl.png"
    },
    {
        id: 2,
        title: "আর মাত্র কয়েক ঘন্টা বাকি!",
        description: "সেরা গেমিং অভিজ্ঞতা অর্জন করুন",
        primaryBtnName: "এখন কিনুন",
        primaryBtnURL: "#",
        secondaryBtnName: "আরো জানুন",
        secondaryBtnURL: "#",
        productImageURL: "https://i.ibb.co.com/7tD7xnHv/header-headphone-image-Hdy-T0g-V.png"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[500px] md:min-h-screen lg:min-h-screen flex items-center justify-center overflow-hidden bg-gray-200">
            {sliderItems.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute w-full h-full flex items-center justify-center transition-transform duration-1000 ${index === currentSlide ? 'translate-x-0 animate__animated animate__slideInRight' : 'translate-x-full opacity-0'
                        }`}
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
                        <div className="text-center md:text-left max-w-lg">
                            <p className="mt-4 text-lg text-sky-700 animate__animated animate__fadeInLeft animate__delay-1s">
                                {slide.title}
                            </p>
                            <h1 className="text-4xl md:text-5xl mt-2 mb-8 font-bold text-gray-700 animate__animated animate__fadeInLeft">
                                {slide.description}
                            </h1>
                            <div className="mt-6 flex gap-4 animate__animated animate__fadeInUp animate__delay-2s justify-center md:justify-start lg:justify-start">
                                <a href={slide.primaryBtnURL} className="px-6 py-3 bg-[#439DDF] text-white rounded-lg hover:bg-blue-700">
                                    {slide.primaryBtnName}
                                </a>
                                <a href={slide.secondaryBtnURL} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                                    {slide.secondaryBtnName}
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block animate__animated animate__fadeInRight animate__delay-1s">
                            <img src={slide.productImageURL} alt={slide.title} className="w-[400px] h-auto rounded-xl shadow-lg" />
                        </div>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
                {sliderItems.map((_, index) => (
                    <span
                        key={index}
                        className={`w-4 h-4 rounded-full cursor-pointer transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400'
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Hero;
