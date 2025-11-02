import { motion } from 'motion/react';

interface MetricCardProps {
  title: string;
  value: string;
  color: 'cyan' | 'blue' | 'indigo' | 'purple';
  subtitle?: string;
}

export function MetricCard({ title, value, color, subtitle }: MetricCardProps) {
  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-500',
      bg: 'bg-cyan-500/5',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/10',
    },
    blue: {
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/10',
    },
    indigo: {
      gradient: 'from-indigo-400 to-purple-500',
      bg: 'bg-indigo-500/5',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      glow: 'shadow-indigo-500/10',
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500',
      bg: 'bg-purple-500/5',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/10',
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-lg ${colors.glow}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative z-10">
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mb-2 sm:mb-3">{title}</div>
        <div className={`text-2xl sm:text-3xl tabular-nums ${colors.text}`}>{value}</div>
        {subtitle && <div className="text-xs text-white/30 mt-1 sm:mt-1.5">{subtitle}</div>}
      </div>
      <div className={`absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br ${colors.gradient} opacity-10 blur-2xl rounded-full`} />
    </motion.div>
  );
}
