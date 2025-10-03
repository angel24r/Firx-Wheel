import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

export default function WinnerHistory({ winners }) {
  return (
    <div className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Historial de Ganadores
        </h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {winners.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <Trophy className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-lg">Sin sorteos aún</p>
              <p className="text-sm">El historial aparecerá aquí</p>
            </motion.div>
          ) : (
            winners.map((winner, index) => (
              <motion.div
                key={winner.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-yellow-100 bg-gradient-to-r from-yellow-50 to-orange-50"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-gray-800 text-lg">
                    {winner.participant_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {format(new Date(winner.timestamp), 'HH:mm - dd/MMM', { locale: es })}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}