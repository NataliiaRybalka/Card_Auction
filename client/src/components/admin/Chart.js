import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import './Admin.css';

export const Chart = ({ title, entity }) => {

  return (
    <div>
      <h3 className={'chartTitle'}>{title}</h3>

      <LineChart width={500} height={300} data={entity} margin={{ top: 10, right: 50, left: 10, bottom: 100 }} className={`chart chart${title}`}>
      <CartesianGrid strokeDasharray='3 3' style={{color: 'red'}} />
        <XAxis dataKey='created_at' interval={0} angle={-45} dy={50} style={{fontSize: '15px'}} stroke='white' />
        <YAxis stroke='white' style={{fontSize: '15px'}} />
        <Line dataKey='total' stroke='black' />
      </LineChart>
    </div>
  );
};