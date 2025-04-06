'use client';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function CategoryDashboard() {
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        if (!res.ok) throw new Error('Failed to fetch categories');

        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error(err);
        setErrorMessage('Error fetching categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }

    setErrorMessage('');
    const method = editingCategory ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/category', {
        method,
        body: JSON.stringify({
          id: editingCategory?._id,
          name: categoryName.trim(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to save category');

      const data = await res.json();
      toast.success(editingCategory ? 'Category updated!' : 'Category added!');

      setCategoryName('');
      setEditingCategory(null);
      setCategories((prev) =>
        editingCategory
          ? prev.map((cat) => (cat._id === editingCategory._id ? { ...cat, name: categoryName.trim() } : cat))
          : [...prev, { _id: data.categoryId, name: categoryName.trim() }]
      );
    } catch (err) {
      console.error(err);
      toast.error('Operation failed. Please try again.');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await fetch('/api/category', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to delete category');

      toast.success('Category deleted!');
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg border">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Categories</h1>

      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

      <div className="grid grid-cols-2 gap-6">
        {/* Add/Edit Category Section */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>

          <input
            type="text"
            placeholder="Category Name"
            className="w-full px-4 py-2 border rounded mb-3"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <button
            onClick={handleSaveCategory}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
          >
            {editingCategory ? 'Update' : 'Add'}
          </button>
        </div>

        {/* Existing Categories Section */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3">Existing Categories</h2>

          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <span className="font-semibold">{cat.name}</span>
                  <div>
                    <button
                      onClick={() => {
                        setCategoryName(cat.name);
                        setEditingCategory(cat);
                      }}
                      className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
