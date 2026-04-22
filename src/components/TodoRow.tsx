import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Todo } from '../types/Todo';

export const TodoRow: React.FC<{
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
}> = ({ todo, onDelete, onToggle, onEdit }) => (
  <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${todo.completed ? 'opacity-60' : ''}`}>
    <td className="p-4">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.name}</span>
      </div>
    </td>
    <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{todo.description || '-'}</td>
    <td className="p-4 text-sm">{todo.category || '-'}</td>
    <td className="p-4 text-sm">{todo.date ? `${todo.date} ${todo.time}` : '-'}</td>
    <td className="p-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        todo.priority === 'High' ? 'bg-red-100 text-red-600' : 
        todo.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
        'bg-green-100 text-green-600'
      }`}>
        {todo.priority}
      </span>
    </td>
    <td className="p-4 text-sm">{todo.fulfillment}%</td>
    <td className="p-4">
      <div className="flex gap-2">
        <button onClick={() => onEdit(todo)} className="text-gray-400 hover:text-blue-600 transition-colors"><FiEdit2 /></button>
        <button onClick={() => onDelete(todo.id)} className="text-gray-400 hover:text-red-600 transition-colors"><FiTrash2 /></button>
      </div>
    </td>
  </tr>
);