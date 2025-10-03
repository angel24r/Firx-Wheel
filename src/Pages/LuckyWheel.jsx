import React, { useState } from 'react';
import ParticipantForm from '../Components/wheel/ParticipantForm';
import ParticipantList from '../Components/wheel/ParticipantList';
import SpinWheel from '../Components/wheel/SpinWheel';
import WinnerHistory from '../Components/wheel/WinnerHistory';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF8FA3', '#6C5CE7', '#00B894', '#FDCB6E', '#E17055'
];

export default function LuckyWheel() {
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);

  const handleAddParticipant = (name) => {
    const color = COLORS[participants.length % COLORS.length];
    setParticipants([...participants, { id: Date.now(), name, color }]);
  };

  const handleUpdateParticipant = (id, name) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const handleDeleteParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleWinner = (participant) => {
    setWinners([
      ...winners,
      {
        id: Date.now(),
        participant_name: participant.name,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mb-4">
            Firx Wheel
          </h1>
          <p className="text-xl text-gray-600">
            ¡Queremos ver sangre!
          </p>
        </div>

        {/* Formulario de entrada */}
        <div className="mb-8 max-w-2xl mx-auto">
          <ParticipantForm
            onSubmit={handleAddParticipant}
            editingParticipant={null}
            onCancel={null}
          />
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Lista de participantes */}
          <div className="lg:col-span-1">
            <ParticipantList
              participants={participants}
              onEdit={handleUpdateParticipant}
              onDelete={handleDeleteParticipant}
            />
          </div>

          {/* Columna central: Ruleta */}
          <div className="lg:col-span-2">
            <SpinWheel participants={participants} onWinner={handleWinner} />

            {/* Historial de ganadores debajo en móvil */}
            <div className="mt-8 lg:hidden">
              <WinnerHistory winners={winners} />
            </div>
          </div>
        </div>

        {/* Historial de ganadores en desktop */}
        <div className="hidden lg:block mt-8 max-w-4xl mx-auto">
          <WinnerHistory winners={winners} />
        </div>
      </div>
    </div>
  );
}
