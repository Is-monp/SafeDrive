import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@radix-ui/themes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, Activity, Search } from 'lucide-react';

interface HistoricalData {
  avgPerclos: number;
  avgBlinks: number;
  avgYawns: number;
  totalSessions: number;
  normalTime: number;
  fatigueTime: number;
  drowsinessTime: number;
  microsleepTime: number;
}

export function HistoricalRecordsTab() {
  const [startDate, setStartDate] = useState('2025-10-01T08:00:00-05:00');
  const [endDate, setEndDate] = useState('2025-11-01T18:00:00-05:00');
  const [showData, setShowData] = useState(false);

  // Mock data
  const [historicalData] = useState<HistoricalData>({
    avgPerclos: 32.5,
    avgBlinks: 18.3,
    avgYawns: 2.1,
    totalSessions: 47,
    normalTime: 68.2,
    fatigueTime: 18.5,
    drowsinessTime: 10.1,
    microsleepTime: 3.2,
  });

  const handleFetchData = () => {
    setShowData(true);
  };

  const states = [
    {
      name: 'Normal',
      value: historicalData.normalTime,
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-400',
      textColor: 'text-emerald-400'
    },
    {
      name: 'Fatiga',
      value: historicalData.fatigueTime,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-400',
      textColor: 'text-amber-400'
    },
    {
      name: 'Somnolencia',
      value: historicalData.drowsinessTime,
      color: 'from-sky-400 to-blue-500',
      bgColor: 'bg-sky-400',
      textColor: 'text-sky-400'
    },
    {
      name: 'Microsueño',
      value: historicalData.microsleepTime,
      color: 'from-rose-400 to-red-500',
      bgColor: 'bg-rose-400',
      textColor: 'text-rose-400'
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Date Range Selection */}
      <motion.div
        className="rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
          <h2 className="text-base sm:text-lg text-white/90">Seleccionar Rango de Fechas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-xs uppercase tracking-wider text-white/40">Fecha y Hora de Inicio</Label>
            <Input
              id="startDate"
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white/90 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg h-10 sm:h-11 text-sm"
              placeholder="YYYY-MM-DDTHH:MM:SS-05:00"
            />
            <p className="text-xs text-white/30">Formato: YYYY-MM-DDTHH:MM:SS-05:00</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-xs uppercase tracking-wider text-white/40">Fecha y Hora de Fin</Label>
            <Input
              id="endDate"
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white/90 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg h-10 sm:h-11 text-sm"
              placeholder="YYYY-MM-DDTHH:MM:SS-05:00"
            />
            <p className="text-xs text-white/30">Formato: YYYY-MM-DDTHH:MM:SS-05:00</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <Button
            onClick={handleFetchData}
            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 border-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-sm sm:text-base"
          >
            <Search className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">Obtener Datos Históricos</span>
          </Button>
        </div>
      </motion.div>

      {/* Historical Data Display */}
      {showData && (
        <div className="space-y-6 sm:space-y-8">
          {/* Summary Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-cyan-500/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Sesiones Totales</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-cyan-400">{historicalData.totalSessions}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-cyan-400 to-blue-500 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-blue-500/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">PERCLOS Promedio</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-blue-400">{historicalData.avgPerclos}%</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-blue-400 to-indigo-500 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-indigo-500/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Parpadeos Promedio</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-indigo-400">{historicalData.avgBlinks}</div>
                <div className="text-xs text-white/30 mt-1 sm:mt-1.5">por minuto</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-indigo-400 to-purple-500 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-purple-500/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Bostezos Promedio</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-purple-400">{historicalData.avgYawns}</div>
                <div className="text-xs text-white/30 mt-1 sm:mt-1.5">por minuto</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-purple-400 to-pink-500 opacity-10 blur-2xl rounded-full" />
            </div>
          </motion.div>

          {/* State Distribution */}
          <motion.div
            className="rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
              <h3 className="text-base sm:text-lg text-white/90">Distribución de Estados</h3>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {states.map((state, index) => (
                <motion.div
                  key={state.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${state.bgColor} shadow-lg shrink-0`} />
                      <span className="text-xs sm:text-sm text-white/70">{state.name}</span>
                    </div>
                    <span className={`text-xs sm:text-sm tabular-nums ${state.textColor}`}>{state.value}%</span>
                  </div>
                  <div className="h-2 sm:h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      className={`h-full bg-linear-to-r ${state.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${state.value}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {!showData && (
        <motion.div
          className="text-center py-16 sm:py-20 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/2 border border-white/10 mb-4 sm:mb-6 shadow-lg">
            <Calendar className="h-7 w-7 sm:h-9 sm:w-9 text-white/20" />
          </div>
          <p className="text-white/40 text-sm sm:text-base md:text-lg px-4">Selecciona un rango de fechas y haz clic en "Obtener Datos Históricos"</p>
        </motion.div>
      )}
    </div>
  );
}
