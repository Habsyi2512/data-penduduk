import { Legend } from "@headlessui/react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export default function JumlahPendudukChart() {
const data = [
{
name: 'Tanjungpinang',
uv: 4000,
pv: 2400,
},
{
name: 'Batam',
uv: 3000,
pv: 1398,
},
{
name: 'Anambas',
uv: 2000,
pv: 9800,
},
{
name: 'Karimun',
uv: 2780,
pv: 3908,
},
{
name: 'Bintan',
uv: 1890,
pv: 4800,
},
{
name: 'Lingga',
uv: 2390,
pv: 3800,
},
{
name: 'Natuna',
uv: 3490,
pv: 4300,
},
];
return (
<BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
</BarChart>
);
}
