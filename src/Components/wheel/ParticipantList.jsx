import React, { useState } from 'react';
import { Pencil, Trash2, Users, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParticipantList({ participants, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const startEdit = (participant) => {
    setEditingId(participant.id);
    setEditingName(participant.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = (participant) => {
    if (editingName.trim()) {
      onEdit(participant.id, editingName.trim());
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleKeyDown = (e, participant) => {
    if (e.key === 'Enter') {
      saveEdit(participant);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Participantes ({participants.length})
        </h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {participants.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <Users className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-lg">Aún no hay participantes</p>
              <p className="text-sm">Agrega nombres para comenzar</p>
            </motion.div>
          ) : (
            participants.map((participant, index) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-all duration-200 bg-white group"
              >
                {editingId === participant.id ? (
                  <>
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-4 h-4 rounded-full shadow-md flex-shrink-0"
                        style={{ backgroundColor: participant.color }}
                      />
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, participant)}
                        className="flex-1 font-medium text-gray-800 text-lg border-2 border-purple-300 focus:border-purple-500 px-3 py-1 rounded"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => saveEdit(participant)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="border border-gray-300 hover:bg-gray-100 px-2 py-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full shadow-md"
                        style={{ backgroundColor: participant.color }}
                      />
                      <span className="font-medium text-gray-800 text-lg">
                        {participant.name}
                      </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(participant)}
                        className="hover:bg-blue-50 hover:text-blue-600 p-1 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(participant.id)}
                        className="hover:bg-red-50 hover:text-red-600 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}