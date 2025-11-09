import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Label } from 'recharts';

interface PERCLOSChartProps {
  data: { time: string; value: number }[];
}

export function PERCLOSChart({ data }: PERCLOSChartProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-white/90">PERCLOS (Porcentaje de Ciere de ojos)</h3>
        <p className="text-xs text-white/40 mt-1">Métrica principal de fatiga detectada en tiempo real, por minuto.</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="perclosGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.05} vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#ffffff"
            tick={{ fill: '#ffffff40', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#ffffff10' }}
          >
            <Label
              value="Tiempo"
              position="insideBottom"
              offset={0}
              style={{ fill: '#ffffff60', fontSize: 12 }}
            />
          </XAxis>
          <YAxis
            stroke="#ffffff"
            tick={{ fill: '#ffffff40', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#ffffff10' }}
            domain={[0, 100]}
          >
            <Label
              value="PERCLOS (%)"
              angle={-90}
              position="insideLeft"
              offset={10}
              style={{ fill: '#ffffff60', fontSize: 12, textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0B0F19', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
            labelStyle={{ color: '#ffffff60', fontSize: '12px' }}
            itemStyle={{ color: '#22d3ee' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22d3ee"
            strokeWidth={2.5}
            fill="url(#perclosGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#22d3ee', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
