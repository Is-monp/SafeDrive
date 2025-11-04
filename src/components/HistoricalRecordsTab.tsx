import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@radix-ui/themes';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, Activity, Search } from 'lucide-react';
import { PERCLOSChart } from './PERCLOSChart';
import { BlinksYawnsChart } from './BlinksYawnsChart';

interface Alert {
  perclos: number;
  blinks: number;
  yawns: number;
  time: string;
}

interface EstadoPercent {
  FATIGA: number;
  MICROSUEÑO: number;
  NORMAL: number;
  SOMNOLENCIA: number;
}

interface AlertStats {
  avg_perclos: number;
  total_blinks: number;
  total_yawns: number;
  estado_percent: EstadoPercent;
  total_records: number;
}

interface ApiResponse {
  alerts: Alert[];
  alert_stats: AlertStats;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);

  // Data from API
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    avgPerclos: 0,
    avgBlinks: 0,
    avgYawns: 0,
    totalSessions: 0,
    normalTime: 0,
    fatigueTime: 0,
    drowsinessTime: 0,
    microsleepTime: 0,
  });

  // Historical chart data
  const [perclosHistory, setPerclosHistory] = useState<{ time: string; value: number }[]>([]);
  const [blinksYawnsHistory, setBlinksYawnsHistory] = useState<{ time: string; blinks: number; yawns: number }[]>([]);

  // Función para convertir el formato datetime-local a ISO 8601
  const convertToISO = (datetimeLocal: string): string => {
    // Agrega segundos y la Z al final, sin cambiar la hora
    return `${datetimeLocal}:00Z`;
  };

  const handleFetchData = async () => {
    // Validate that dates are not empty :(
    if (!startDate || !endDate) {
      alert('Por favor, selecciona ambas fechas (inicio y fin).');
      return;
    }

    // Validate that start date is before end date
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin.');
      return;
    }

    setIsLoading(true);
    setNoDataFound(false);
    setShowData(false);

    try {
      // Convertir las fechas al formato ISO antes de hacer la petición
      const startDateISO = convertToISO(startDate);
      const endDateISO = convertToISO(endDate);

      console.log('Fecha inicio (ISO):', startDateISO);
      console.log('Fecha fin (ISO):', endDateISO);

      // Fetch data from API with POST method and date range in body
      const response = await fetch('https://safedrive.ddns.net:8080/history/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: startDateISO,
          end: endDateISO,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }

      const data: ApiResponse = await response.json();

      // Check if no data was found, para que no se con
      if (!data.alerts || data.alerts.length === 0) {
        setNoDataFound(true);
        return;
      }

      // Process alerts for charts
      const perclosData: { time: string; value: number }[] = [];
      const blinksYawnsData: { time: string; blinks: number; yawns: number }[] = [];

      data.alerts.forEach((alert) => {
        const alertDate = new Date(alert.time);
        // Usar métodos UTC para mostrar la hora en UTC, no en zona horaria local
        const timeStr = alertDate.toLocaleString('es-ES', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC' // IMPORTANTE: Esto fuerza que se muestre la hora UTC
        });

        perclosData.push({
          time: timeStr,
          value: alert.perclos
        });

        blinksYawnsData.push({
          time: timeStr,
          blinks: alert.blinks,
          yawns: alert.yawns
        });
      });

      setPerclosHistory(perclosData);
      setBlinksYawnsHistory(blinksYawnsData);

      // Process alert_stats for cards and state distribution 
      const stats = data.alert_stats;

      setHistoricalData({
        avgPerclos: stats.avg_perclos,
        avgBlinks: stats.total_blinks,
        avgYawns: stats.total_yawns,
        totalSessions: stats.total_records,
        normalTime: stats.estado_percent.NORMAL,
        fatigueTime: stats.estado_percent.FATIGA,
        drowsinessTime: stats.estado_percent.SOMNOLENCIA,
        microsleepTime: stats.estado_percent.MICROSUEÑO,
      });

      setShowData(true);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      alert('Error al obtener los datos históricos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const states = [
    {
      name: 'Normal',
      value: historicalData.normalTime,
      color: 'bg-emerald-400',
    },
    {
      name: 'Fatiga',
      value: historicalData.fatigueTime,
      color: 'bg-amber-400',
    },
    {
      name: 'Somnolencia',
      value: historicalData.drowsinessTime,
      color: 'bg-sky-400',
    },
    {
      name: 'Microsueño',
      value: historicalData.microsleepTime,
      color: 'bg-rose-400',
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
          Consulta datos almacenados en AWS RDS por rango de fechas (UTC).
        </p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-xs uppercase tracking-wider text-white/40">Fecha Inicio (UTC)</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white/90 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg h-10 sm:h-11 text-sm [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-xs uppercase tracking-wider text-white/40">Fecha Fin (UTC)</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white/90 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg h-10 sm:h-11 text-sm [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <Button
            onClick={handleFetchData}
            disabled={isLoading}
            className="bg-blue-700 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500 border-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="truncate">{isLoading ? 'Cargando...' : 'Obtener Datos Históricos'}</span>
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
            <div className="relative overflow-hidden rounded-xl  bg-sky-400/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-sky-400/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Registros encontrados</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{historicalData.totalSessions}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-sky-300 to-sky-400 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl  bg-blue-400/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-blue-400/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">PERCLOS Promedio</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{Math.round(historicalData.avgPerclos)}%</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-blue-400 to-blue-500 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl border  bg-indigo-500/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-indigo-500/10">
              <div className="relative z-10">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Total Parpadeos</div>
                <div className="text-2xl sm:text-3xl tabular-nums text-white/90">{historicalData.avgBlinks}</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-indigo-500 to-indigo-600 opacity-10 blur-2xl rounded-full" />
            </div>

            <div className="relative overflow-hidden rounded-xl  bg-blue-700/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg shadow-blue-700/10">
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
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${state.color} shadow-lg shrink-0`} />
                      <span className="text-xs sm:text-sm text-white/70">{state.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm tabular-nums text-white/90">{state.value}%</span>
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

          {/* Historical Charts */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PERCLOSChart data={perclosHistory} />
            <BlinksYawnsChart data={blinksYawnsHistory} />
          </motion.div>
        </div>
      )}

      {!showData && !noDataFound && (
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

      {noDataFound && (
        <motion.div
          className="text-center py-16 sm:py-20 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/20 border border-red-500/20 mb-4 sm:mb-6 shadow-lg">
            <Search className="h-7 w-7 sm:h-9 sm:w-9 text-red-500/60" />
          </div>
          <h3 className="text-white/70 text-lg sm:text-xl font-semibold mb-2">No se encontraron datos</h3>
          <p className="text-white/40 text-sm sm:text-base md:text-lg px-4">No hay registros en el rango de fechas seleccionado. Intenta con otro rango.</p>
        </motion.div>
      )}
    </div>
  );
}