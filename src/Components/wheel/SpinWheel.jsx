import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Sparkles } from 'lucide-react';

export default function SpinWheel({ participants, onWinner }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const spinWheel = () => {
    if (participants.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const winnerIndex = Math.floor(Math.random() * participants.length);
    const degreesPerSegment = 360 / participants.length;
    const targetRotation = rotation + 360 * 8 + (360 - (winnerIndex * degreesPerSegment + degreesPerSegment / 2));

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(participants[winnerIndex]);
      onWinner(participants[winnerIndex]);
    }, 5000);
  };

  const segmentAngle = participants.length > 0 ? 360 / participants.length : 0;

  return (
    <div className="p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Ruleta de la Suerte
            <Sparkles className="w-8 h-8 text-pink-600" />
          </h2>
          <p className="text-gray-500">
            {participants.length > 0 
              ? '¡Haz clic en el botón para girar!' 
              : 'Agrega participantes para comenzar'}
          </p>
        </div>

        {/* Contenedor centrado de la ruleta */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative w-[450px] h-[450px] flex items-center justify-center">
            {/* Flecha indicadora superior */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
              <div className="relative">
                <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[40px] border-t-red-600 drop-shadow-2xl" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[32px] border-t-red-500" />
              </div>
            </div>

            {/* Sombra de fondo */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-20 blur-3xl" />

            {/* Ruleta */}
            <motion.div
              className="relative w-[400px] h-[400px] rounded-full shadow-2xl"
              style={{ rotate: rotation }}
              animate={{ rotate: rotation }}
              transition={{ duration: 5, ease: [0.17, 0.67, 0.35, 0.96] }}
            >
              <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                className="w-full h-full rounded-full"
              >
                <circle cx="200" cy="200" r="200" fill="white" />
                {participants.length > 0 && participants.map((participant, index) => {
                  const startAngle = index * segmentAngle;
                  const endAngle = (index + 1) * segmentAngle;
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;
                  const x1 = 200 + 200 * Math.cos(startRad);
                  const y1 = 200 + 200 * Math.sin(startRad);
                  const x2 = 200 + 200 * Math.cos(endRad);
                  const y2 = 200 + 200 * Math.sin(endRad);
                  const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                  const pathData = [
                    `M 200 200`,
                    `L ${x1} ${y1}`,
                    `A 200 200 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');

                  const midAngle = ((startAngle + endAngle) / 2 - 90) * Math.PI / 180;
                  const textRadius = 130;
                  const textX = 200 + textRadius * Math.cos(midAngle);
                  const textY = 200 + textRadius * Math.sin(midAngle);
                  const textRotation = (startAngle + endAngle) / 2;

                  return (
                    <g key={participant.id}>
                      <path
                        d={pathData}
                        fill={participant.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill="white"
                        fontSize="15"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                        style={{
                          textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                          pointerEvents: 'none'
                        }}
                      >
                        {participant.name}
                      </text>
                    </g>
                  );
                })}
                <circle cx="200" cy="200" r="198" fill="none" stroke="white" strokeWidth="4" />
              </svg>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white shadow-2xl border-4 border-purple-500 z-20 flex items-center justify-center overflow-hidden">
                <motion.img
                  src="/pokefirx-logo.png"
                  alt="PokeFirx"
                  className="w-40 h-40 object-contain"
                  animate={isSpinning ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isSpinning ? Infinity : 0, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Botón y mensaje ganador */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={spinWheel}
            disabled={participants.length === 0 || isSpinning}
            className="w-64 h-16 text-xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-xl transform hover:scale-105 transition-all duration-200 rounded-xl flex items-center justify-center"
          >
            {isSpinning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Play className="w-6 h-6" />
                </motion.div>
                ¡Girando!
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-3" />
                ¡GIRAR RULETA!
              </>
            )}
          </button>

          {winner && !isSpinning && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white shadow-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                className="flex items-center gap-3"
              >
                <Trophy className="w-10 h-10" />
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider">¡Ganador!</p>
                  <p className="text-3xl font-black">{winner.name}</p>
                </div>
                <Sparkles className="w-10 h-10" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}