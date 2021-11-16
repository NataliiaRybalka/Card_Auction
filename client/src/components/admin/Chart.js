import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import './Admin.css';

const data = [
  {
    name: "Page A",
    pv: 240
  },
  {
    name: "Page B",
    pv: 139
  },
  {
    name: "Page C",
    pv: 980
  },
  {
    name: "Page D",
    pv: 390
  },
  {
    name: "Page E",
    pv: 480
  },
  {
    name: "Page F",
    pv: 380
  },
  {
    name: "Page G",
    pv: 430
  }
];

export const Chart = () => {

  return (
    <div>
      <h3>Users</h3>

      <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} dx={20} />
        <YAxis />
        <Line dataKey="pv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};