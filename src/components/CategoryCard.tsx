import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { Category, Task } from '../types';

interface CategoryCardProps {
  category: Category;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
      };
      onUpdateCategory({
        ...category,
        tasks: [...category.tasks, newTask],
      });
      setNewTaskText('');
      setIsAddingTask(false);
    }
  };

  const toggleTask = (taskId: string) => {
    onUpdateCategory({
      ...category,
      tasks: category.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const deleteTask = (taskId: string) => {
    onUpdateCategory({
      ...category,
      tasks: category.tasks.filter((task) => task.id !== taskId),
    });
  };

  const moveTask = (taskId: string, direction: 'up' | 'down') => {
    const index = category.tasks.findIndex((task) => task.id === taskId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === category.tasks.length - 1)
    ) {
      return;
    }

    const newTasks = [...category.tasks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newTasks[index], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[index]];

    onUpdateCategory({
      ...category,
      tasks: newTasks,
    });
  };

  const completedCount = category.tasks.filter((task) => task.completed).length;

  return (
    <div className="border-4 border-black neo-shadow bg-white">
      <div
        className="p-4 border-b-4 border-black flex justify-between items-center"
        style={{ backgroundColor: category.color }}
      >
        <div>
          <h2 className="text-xl font-bold uppercase">{category.name}</h2>
          <p className="text-sm font-semibold mt-1">
            {completedCount}/{category.tasks.length} COMPLETED
          </p>
        </div>
        <button
          onClick={() => onDeleteCategory(category.id)}
          className="p-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
          title="Delete Category"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {category.tasks.map((task, index) => (
          <div
            key={task.id}
            className="border-3 border-black p-3 bg-white flex items-center gap-3 neo-shadow-sm"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-6 h-6 border-3 border-black cursor-pointer accent-black"
            />
            <span
              className={`flex-1 font-semibold ${
                task.completed ? 'line-through opacity-50' : ''
              }`}
            >
              {task.text}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => moveTask(task.id, 'up')}
                disabled={index === 0}
                className="p-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => moveTask(task.id, 'down')}
                disabled={index === category.tasks.length - 1}
                className="p-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ChevronDown size={16} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 bg-[#FF005C] text-white hover:bg-white hover:text-[#FF005C] border-2 border-black transition-colors"
                title="Delete Task"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        {isAddingTask ? (
          <div className="border-3 border-black p-3 bg-[#00F0FF] neo-shadow-sm">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="ENTER TASK..."
              className="w-full p-2 border-3 border-black font-semibold uppercase placeholder:text-black placeholder:opacity-50 bg-white"
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={addTask}
                className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase"
              >
                ADD
              </button>
              <button
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskText('');
                }}
                className="px-4 py-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-bold uppercase"
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full p-3 border-3 border-black bg-[#00F0FF] hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 font-bold uppercase neo-shadow-sm"
          >
            <Plus size={20} />
            ADD TASK
          </button>
        )}
      </div>
    </div>
  );
};
