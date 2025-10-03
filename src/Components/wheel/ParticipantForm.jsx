import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ParticipantForm({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del participante..."
        className="flex-1 text-lg border-2 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500"
      />
      <button
        type="submit"
        className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-md"
      >
        <Plus className="w-5 h-5 mr-2" />
        Agregar
      </button>
    </form>
  );
}
