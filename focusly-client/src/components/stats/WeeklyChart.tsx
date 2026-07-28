import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';

export interface WeeklyChartData {
  shortDay: string;
  longDayDate: string;
  count: number;
  isToday: boolean;
}

interface WeeklyChartProps {
  data: WeeklyChartData[];
  className?: string;
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data, className }) => {
  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <CardContent className="p-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#2a2a35" />
              <XAxis 
                dataKey="shortDay" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9094a4', fontSize: 13 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9094a4', fontSize: 13 }} 
                allowDecimals={false}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as WeeklyChartData;
                    return (
                      <div className="bg-[#121216] text-[#f8f9fa] px-3 py-2 rounded-md shadow-lg text-[13px] border border-[#2a2a35]">
                        <span className="font-medium text-white">{d.count} Pomodoros</span> – {d.longDayDate}
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 4, 4]} maxBarSize={40}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isToday ? '#6c63ff' : '#3f3f4e'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyChart;
