'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CategoryNav() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    variableWidth: true,
    responsive: [
      { breakpoint: 1300, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("category") === cat.name) {
      params.delete("category");
    } else {
      params.set("category", cat.name);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm px-4 py-3">
      <Slider {...settings}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <div
              key={cat._id}
              className="!w-auto"
            >
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`mx-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer whitespace-nowrap
                  ${
                    isActive
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-800 hover:bg-primary hover:text-white"
                  }`}
              >
                {cat.name}
              </button>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
