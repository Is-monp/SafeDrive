import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BlinksYawnsChartProps {
  data: { time: string; blinks: number; yawns: number }[];
}

export function BlinksYawnsChart({ data }: BlinksYawnsChartProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-lg text-white/90">Parpadeos y Bostezos en el Tiempo</h3>
        <p className="text-xs text-white/40 mt-1">Mediciones por minuto</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#ffffff"
            opacity={0.05}
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="#ffffff"
            tick={{ fill: '#ffffff40', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#ffffff10' }}
          />
          <YAxis
            stroke="#ffffff"
            tick={{ fill: '#ffffff40', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#ffffff10' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0B0F19',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
            labelStyle={{ color: '#ffffff60', fontSize: '12px' }}
          />
          <Legend
            wrapperStyle={{ color: '#ffffff60', fontSize: '12px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="blinks"
            stroke="#60a5fa" // blue-400
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#60a5fa', strokeWidth: 0 }}
            name="Parpadeos"
          />
          <Line
            type="monotone"
            dataKey="yawns"
            stroke="#22d3ee" // cyan-400 from PERCLOS chart
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#22d3ee', strokeWidth: 0 }}
            name="Bostezos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
