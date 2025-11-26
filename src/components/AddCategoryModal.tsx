import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCategoryModalProps {
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

const COLORS = ['#FF005C', '#00F0FF', '#FFD600', '#00FF85', '#9D4EDD', '#FF6B35'];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim(), selectedColor);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-black neo-shadow-lg max-w-md w-full">
        <div className="bg-[#FF005C] p-4 border-b-4 border-black flex justify-between items-center">
          <h2 className="text-2xl font-bold uppercase">NEW CATEGORY</h2>
          <button
            onClick={onClose}
            className="p-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase mb-2">CATEGORY NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="ENTER NAME..."
              className="w-full p-3 border-3 border-black font-semibold uppercase placeholder:text-black placeholder:opacity-50"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-3">SELECT COLOR</label>
            <div className="grid grid-cols-3 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-16 border-4 border-black transition-all ${
                    selectedColor === color ? 'neo-shadow' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="flex-1 py-3 bg-black text-white border-3 border-black hover:bg-white hover:text-black transition-colors font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CREATE
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white text-black border-3 border-black hover:bg-black hover:text-white transition-colors font-bold uppercase"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
