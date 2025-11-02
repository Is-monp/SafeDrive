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
  // Estados para los inputs en formato datetime-local (YYYY-MM-DDTHH:mm)
  const [startDate, setStartDate] = useState('2025-10-01T08:00');
  const [endDate, setEndDate] = useState('2025-11-01T18:00');
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

  // Función para convertir el formato datetime-local a ISO 8601 con zona horaria
  const convertToISO = (datetimeLocal: string): string => {
    // Entrada esperada: "2025-11-02T14:30" (formato datetime-local)
    // Parsear el datetime-local
    const [datePart, timePart] = datetimeLocal.split("T");

    if (!datePart || !timePart) {
      throw new Error("Formato de fecha inválido");
    }

    const dateComponents = datePart.split("-").map(Number);
    const timeComponents = timePart.split(":").map(Number);

    const year = dateComponents[0]!;
    const month = dateComponents[1]!;
    const day = dateComponents[2]!;
    const hour = timeComponents[0]!;
    const minute = timeComponents[1]!;

    // Crear el objeto Date en UTC (ajustado a zona horaria -05:00)
    const date = new Date(Date.UTC(year, month - 1, day, hour + 5, minute));

    // Formato ISO con zona horaria fija (-05:00)
    const iso = date.toISOString().replace("Z", "-05:00");

    return iso;
  };

  const handleFetchData = () => {
    // Convertir las fechas al formato ISO antes de hacer la petición
    const startDateISO = convertToISO(startDate);
    const endDateISO = convertToISO(endDate);

    console.log('Fecha inicio (ISO):', startDateISO);
    console.log('Fecha fin (ISO):', endDateISO);

    // Aquí usarías startDateISO y endDateISO para la petición al backend
    setShowData(true);
  };

  const states = [
    {
      name: 'Normal',
      value: historicalData.normalTime,
      color: 'bg-emerald-400',
      bgColor: 'bg-emerald-400',
      textColor: 'text-white/90'
    },
    {
      name: 'Fatiga',
      value: historicalData.fatigueTime,
      color: 'bg-amber-400',
      bgColor: 'bg-amber-400',
      textColor: 'text-white/90'
    },
    {
      name: 'Somnolencia',
      value: historicalData.drowsinessTime,
      color: 'bg-sky-400',
      bgColor: 'bg-sky-400',
      textColor: 'text-white/90'
    },
    {
      name: 'Microsueño',
      value: historicalData.microsleepTime,
      color: 'bg-rose-400',
      bgColor: 'bg-rose-400',
      textColor: 'text-white/90'
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
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
          <h2 className="font-semibold text-base sm:text-lg text-white/90">
            Búsqueda de Datos Históricos
          </h2>
        </div>
        <p className="text-white/40 text-sm sm:text-base md:text-x px-2">
          Consulta datos almacenados en AWS RDS por rango de fechas.
        </p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-xs uppercase tracking-wider text-white/40">Fecha Inicio</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white/90 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg h-10 sm:h-11 text-sm [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-xs uppercase tracking-wider text-white/40">Fecha Fin</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white/90 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg h-10 sm:h-11 text-sm [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <Button
            onClick={handleFetchData}
            className="bg-blue-700 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500 border-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-sm sm:text-base"
          >
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
            <div className="relative overflow-hidden rounded-xl border border-sky-400/20 bg-sky-400/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-sky-400/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Registros encontrados</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{historicalData.totalSessions}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-sky-300 to-sky-400 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-blue-400/20 bg-blue-400/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-blue-400/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">PERCLOS Promedio</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{historicalData.avgPerclos}%</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-blue-400 to-blue-500 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-indigo-500/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Total Parpadeos</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{historicalData.avgBlinks}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-indigo-500 to-indigo-600 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-blue-700/20 bg-blue-700/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-blue-700/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Total Bostezos</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{historicalData.avgYawns}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-blue-700 to-blue-800 opacity-10 blur-2xl rounded-full" />
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
              <h3 className="font-semibold text-base sm:text-lg text-white/90">Distribución de Estados</h3>
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
