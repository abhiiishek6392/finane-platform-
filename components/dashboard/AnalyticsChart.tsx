"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface ChartProps {
  data: { period: string; income: number; expense: number; }[];
}

export default function AnalyticsChart({ data }: ChartProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="border-neutral-800 bg-neutral-950 text-white">
        <CardHeader><CardTitle className="text-xl font-bold tracking-tight">Performance Metrics</CardTitle></CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="period" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#171717", borderColor: "#404040", color: "#fff" }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "10px" }} />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Inflows" />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Outflows" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}