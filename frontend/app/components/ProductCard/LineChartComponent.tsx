"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  price: number;
}

const mockData: DataPoint[] = [
  { month: "Jan", price: 100 },
  { month: "Feb", price: 101 },
  { month: "Mar", price: 200 },
  { month: "Apr", price: 160 },
  { month: "May", price: 90 },
  { month: "Jun", price: 1500 },
  
];

const LineChartComponent: React.FC = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3F6212" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
