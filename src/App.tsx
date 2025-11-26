import React, { useState, useEffect } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { Category } from './types';
import { CategoryCard } from './components/CategoryCard';
import { AddCategoryModal } from './components/AddCategoryModal';
import { saveToStorage, loadFromStorage } from './utils/storage';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Client', color: '#FF005C', tasks: [] },
  { id: '2', name: 'Biz System', color: '#00F0FF', tasks: [] },
  { id: '3', name: 'Web & Funnel', color: '#FFD600', tasks: [] },
  { id: '4', name: 'AI & Tech', color: '#00FF85', tasks: [] },
  { id: '5', name: 'Learning', color: '#9D4EDD', tasks: [] },
  { id: '6', name: 'Personal', color: '#FF6B35', tasks: [] },
];

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage();
    setCategories(stored || DEFAULT_CATEGORIES);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      saveToStorage(categories);
    }
  }, [categories]);

  const updateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('DELETE THIS CATEGORY AND ALL ITS TASKS?')) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color,
      tasks: [],
    };
    setCategories([...categories, newCategory]);
  };

  const totalTasks = categories.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const completedTasks = categories.reduce(
    (sum, cat) => sum + cat.tasks.filter((task) => task.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-4 border-black bg-[#00F0FF] p-6 neo-shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black border-2 border-black">
                <ListTodo size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold uppercase">
                  MY PRODUCTIVITY POWER
                </h1>
                <p className="text-lg font-semibold mt-1">
                  {completedTasks}/{totalTasks} TASKS COMPLETED
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[#FF005C] text-white border-3 border-black hover:bg-black transition-colors flex items-center gap-2 font-bold uppercase neo-shadow"
            >
              <Plus size={20} />
              NEW CATEGORY
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onUpdateCategory={updateCategory}
              onDeleteCategory={deleteCategory}
            />
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16 border-4 border-black bg-white neo-shadow">
            <p className="text-2xl font-bold uppercase mb-4">NO CATEGORIES YET</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[#FF005C] text-white border-3 border-black hover:bg-black transition-colors font-bold uppercase neo-shadow"
            >
              CREATE YOUR FIRST CATEGORY
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddCategoryModal onClose={() => setShowAddModal(false)} onAdd={addCategory} />
      )}
    </div>
  );
}

export default App;
