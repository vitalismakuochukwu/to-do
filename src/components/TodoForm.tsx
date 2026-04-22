import React, { useState } from 'react';
import type{ Todo, Priority } from '../types/Todo';

interface TodoFormProps {
  onSave: (todo: Omit<Todo, 'id' | 'completed'>) => void;
  onCancel: () => void;
  initialData?: Todo;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Omit<Todo, 'id' | 'completed'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    priority: initialData?.priority || 'Medium',
    fulfillment: initialData?.fulfillment || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-xl w-full max-w-4xl mx-auto animate-in fade-in zoom-in duration-200">
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">
        {initialData ? 'Edit to-do:' : 'Add a new to-do:'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Name:</label>
            <input autoFocus required type="text" placeholder="name for the task" className="w-full p-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description:</label>
            <input type="text" placeholder="short description" className="w-full p-2 border rounded-lg" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Category:</label>
            <input type="text" placeholder="e.g. household" className="w-full p-2 border rounded-lg" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="dd/mm/yyyy" className="p-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            <input type="text" placeholder="hh:mm" className="p-2 border rounded-lg" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-1">Priority:</label>
            <select className="w-full p-2 border rounded-lg bg-white" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Fullfilment:</label>
            <input type="range" min="0" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" value={formData.fulfillment} onChange={(e) => setFormData({ ...formData, fulfillment: parseInt(e.target.value) })} />
            <div className="text-right text-sm font-bold text-blue-600">{formData.fulfillment}%</div>
          </div>
          <div className="flex gap-4 pt-4 justify-end">
            <button type="button" onClick={onCancel} className="px-8 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};