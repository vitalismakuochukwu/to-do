import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import type { Todo } from './types/Todo';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoRow } from './components/TodoRow';

// Main App
const App = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [isAdding, setIsAdding] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'All' | 'To-do' | 'Completed'>('All');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'To-do') return !todo.completed; // Only show uncompleted tasks
    if (filter === 'Completed') return todo.completed; // Only show completed tasks
    return true; // Show all tasks
  });

  return (
    <div className="min-h-screen bg-linear-to-tr from-blue-900 via-blue-700 to-blue-400 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="w-full max-w-4xl"> {/* Reduced max-width */}

        <div className="bg-blue-200 rounded-2xl shadow-2xl p-8 min-h-[400px] flex flex-col relative overflow-hidden"> {/* Reduced min-height */}
          {editingTodo ? (
            <TodoForm 
              initialData={editingTodo}
              onSave={(data) => {
                updateTodo(editingTodo.id, data);
                setEditingTodo(null);
              }} 
              onCancel={() => setEditingTodo(null)} 
            />
          ) : isAdding ? (
            <TodoForm 
              onSave={(data) => {
                addTodo(data);
                setIsAdding(false);
              }} 
              onCancel={() => setIsAdding(false)} 
            />
          ) : (
            <>
              {/* Header Navigation */}
              <div className="flex flex-col mb-8 gap-6">
                <h1 className="text-gray-100 text-3xl font-bold drop-shadow-sm text-center">React To-Do List</h1>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setIsAdding(true)}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <FiPlus strokeWidth={3} /> Add a new to-do
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setFilter('All')}
                    className={`px-15 py-2 rounded-lg font-bold shadow-sm transition-all ${
                      filter === 'All' ? 'bg-blue-400 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('To-do')}
                    className={`px-15 py-2 rounded-lg font-bold shadow-sm transition-all border border-gray-200 ${
                      filter === 'To-do' ? 'bg-gray-100 text-blue-600 border-blue-200' : 'bg-white text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    To-do
                  </button>
                  <button
                    onClick={() => setFilter('Completed')}
                    className={`px-15 py-2 rounded-lg font-bold shadow-sm transition-all border border-gray-200 ${
                      filter === 'Completed' ? 'bg-gray-100 text-blue-600 border-blue-200' : 'bg-white text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Completed
                  </button>
                </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-sm border-b border-gray-200">
                      <th className="p-4 font-bold">Task</th>
                      <th className="p-4 font-bold">Description</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">When</th>
                      <th className="p-4 font-bold">Priority</th>
                      <th className="p-4 font-bold">Fullfilment</th>
                      <th className="p-4 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTodos.map((todo) => (
                      <TodoRow 
                        key={todo.id} 
                        todo={todo} 
                        onDelete={deleteTodo} 
                        onToggle={toggleComplete} 
                        onEdit={setEditingTodo}
                      />
                    ))}
                  </tbody>
                </table>
                {filteredTodos.length === 0 && (
                  <div className="text-center py-20 text-gray-400 italic">No tasks found in this category.</div>
                )}
              </div>
            </>
          )}

          <footer className="mt-8 pt-4 border-t border-gray-200 text-gray-400 text-xs">
            Patryk Kielian © 2023 all rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App
