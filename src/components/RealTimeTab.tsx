import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@radix-ui/themes';
import { Play, Square, AlertTriangle, CheckCircle, Moon, Coffee, Wifi, WifiOff } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { PERCLOSChart } from './PERCLOSChart';
import { BlinksYawnsChart } from './BlinksYawnsChart';

type DriverState = 'normal' | 'microsleep' | 'fatigue' | 'drowsiness';

interface Metrics {
  state: DriverState;
  perclos: number;
  blinks: number;
  yawns: number;
}

export function RealTimeTab() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [metrics, setMetrics] = useState<Metrics>({
    state: 'normal',
    perclos: 0,
    blinks: 0,
    yawns: 0,
  });
  const [perclosHistory, setPerclosHistory] = useState<{ time: string; value: number }[]>([]);
  const [blinksYawnsHistory, setBlinksYawnsHistory] = useState<{ time: string; blinks: number; yawns: number }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getStateConfig = (state: DriverState) => {
    switch (state) {
      case 'normal':
        return {
          label: 'Normal',
          color: 'from-emerald-400 to-green-500',
          bgColor: 'bg-emerald-500/5',
          borderColor: 'border-emerald-500/20',
          textColor: 'text-emerald-400',
          glowColor: 'shadow-emerald-500/10',
          icon: CheckCircle
        };
      case 'microsleep':
        return {
          label: 'Microsueño',
          color: 'from-rose-400 to-red-500',
          bgColor: 'bg-rose-500/5',
          borderColor: 'border-rose-500/20',
          textColor: 'text-rose-400',
          glowColor: 'shadow-rose-500/10',
          icon: AlertTriangle
        };
      case 'fatigue':
        return {
          label: 'Fatiga',
          color: 'from-amber-400 to-orange-500',
          bgColor: 'bg-amber-500/5',
          borderColor: 'border-amber-500/20',
          textColor: 'text-amber-400',
          glowColor: 'shadow-amber-500/10',
          icon: Coffee
        };
      case 'drowsiness':
        return {
          label: 'Somnolencia',
          color: 'from-sky-400 to-blue-500',
          bgColor: 'bg-sky-400/5',
          borderColor: 'border-sky-400/20',
          textColor: 'text-sky-400',
          glowColor: 'shadow-sky-500/10',
          icon: Moon
        };
    }
  };

  const updateMetrics = () => {
    const newPerclos = Math.random() * 100;
    const newBlinks = Math.floor(Math.random() * 30);
    const newYawns = Math.floor(Math.random() * 10);
    
    let newState: DriverState = 'normal';
    if (newPerclos > 80 || newYawns > 7) {
      newState = 'microsleep';
    } else if (newPerclos > 60 || newYawns > 5) {
      newState = 'fatigue';
    } else if (newPerclos > 40 || newYawns > 3) {
      newState = 'drowsiness';
    }

    setMetrics({
      state: newState,
      perclos: newPerclos,
      blinks: newBlinks,
      yawns: newYawns,
    });

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

    setPerclosHistory(prev => {
      const newHistory = [...prev, { time: timeStr, value: newPerclos }];
      return newHistory.slice(-20);
    });

    setBlinksYawnsHistory(prev => {
      const newHistory = [...prev, { time: timeStr, blinks: newBlinks, yawns: newYawns }];
      return newHistory.slice(-20);
    });
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    updateMetrics();
    intervalRef.current = setInterval(updateMetrics, 2000);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPerclosHistory([]);
    setBlinksYawnsHistory([]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const stateConfig = getStateConfig(metrics.state);
  const StateIcon = stateConfig.icon;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Control Panel */}
      <motion.div
        className="rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Play className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
            <h2 className="font-semibold text-base sm:text-lg text-white/90">
              Monitoreo en Tiempo Real
            </h2>
          </div>
          <p className="text-white/40 text-sm sm:text-base px-2">
            Sistema de detección de fatiga y somnolencia del conductor en vivo.
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
          {/* Connection Status */}
          <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border w-fit ${
            isConnected
              ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Conectado</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Desconectado</span>
              </>
            )}
          </div>

          {/* Start/Stop Button */}
          <Button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            size="2"
            disabled={!isConnected}
            className={`${
              isMonitoring
                ? 'bg-linear-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700'
                : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            } shadow-xl ${
              isMonitoring ? 'shadow-rose-500/20' : 'shadow-blue-500/30'
            } border-0 px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-6 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full sm:w-auto shrink-0 text-sm sm:text-base`}
          >
            {isMonitoring ? (
              <>
                <Square className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current shrink-0" />
                <span className="truncate">Detener Monitoreo</span>
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current shrink-0" />
                <span className="truncate">Iniciar Monitoreo</span>
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      {isMonitoring && (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Driver State */}
            <motion.div
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40">Estado del Conductor</span>
                  <div className={`p-1.5 sm:p-2 rounded-lg ${stateConfig.bgColor} ${stateConfig.borderColor} border`}>
                    <StateIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${stateConfig.textColor}`} />
                  </div>
                </div>
                <div className={`font-extrabold text-xl sm:text-2xl ${stateConfig.textColor}`}>
                  {stateConfig.label}
                </div>
              </div>
            </motion.div>

            {/* PERCLOS */}
            <MetricCard
              title="PERCLOS"
              value={`${metrics.perclos.toFixed(1)}%`}
              color="cyan"
            />

            {/* Blinks */}
            <MetricCard
              title="Parpadeos"
              value={metrics.blinks.toString()}
              color="blue"
              subtitle="por minuto"
            />

            {/* Yawns */}
            <MetricCard
              title="Bostezos"
              value={metrics.yawns.toString()}
              color="indigo"
              subtitle="por minuto"
            />
          </motion.div>

          {/* Charts */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PERCLOSChart data={perclosHistory} />
            <BlinksYawnsChart data={blinksYawnsHistory} />
          </motion.div>
        </>
      )}

      {!isMonitoring && (
        <motion.div
          className="text-center py-16 sm:py-20 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/2 border border-white/10 mb-4 sm:mb-6 shadow-lg">
            <Play className="h-7 w-7 sm:h-9 sm:w-9 text-white/20" />
          </div>
          <p className="text-white/40 text-sm sm:text-base md:text-lg px-4">Click "Start Monitoring" to begin tracking driver metrics</p>
        </motion.div>
      )}
    </div>
  );
}
