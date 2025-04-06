'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tag, Grid3X3 } from 'lucide-react'; // Example icons

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

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

  const handleCategoryClick = (cat) => {
    router.push(`/products?category=${cat.name}`);
  };

  return (
    <section className="py-10 px-4 mt-10 mx-auto">
      <h2 className="text-gray-700 text-3xl font-bold mb-10 text-center">কোন ধরণের পণ্যটি খুজছেন?</h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {categories.map((cat, index) => (
          <motion.div
            key={cat._id}
            onClick={() => handleCategoryClick(cat)}
            className="cursor-pointer bg-white border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Icon Placeholder */}
            <div className="bg-primary/10 text-primary p-3 rounded-full mb-3">
              {index % 2 === 0 ? <Tag className="w-6 h-6" /> : <Grid3X3 className="w-6 h-6" />}
            </div>
            <span className="text-sm font-medium text-gray-800">{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
