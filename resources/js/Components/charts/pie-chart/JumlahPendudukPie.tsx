import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Data untuk Pie chart
const pageData = [
{ name: 'Page A', uv: 2000, pv: 2400, fill: '#f7c873' },
{ name: 'Page B', uv: 3400, pv: 1398, fill: '#6a4c9c' },
{ name: 'Page C', uv: 2900, pv: 3800, fill: '#5b8c89' },
{ name: 'Page D', uv: 1800, pv: 1908, fill: '#ff6347' },
{ name: 'Page E', uv: 1800, pv: 4008, fill: '#3b9b8b' },
{ name: 'Page F', uv: 1800, pv: 2708, fill: '#f6a3c0' },
{ name: 'Page G', uv: 1800, pv: 1208, fill: '#c3a8e8' },
];

// Bentuk aktif untuk Pie chart
const activeShape = {
fill: 'green', // Warna merah saat bagian pie chart aktif
};

// Fungsi komponen untuk menampilkan Pie chart
export default function JumlahPendudukPie() {
return (
<ResponsiveContainer width={500} height={300}>
    <PieChart>
        <Tooltip />
        <Pie data={pageData} dataKey="pv" fill="fill" activeShape={activeShape} />
    </PieChart>
</ResponsiveContainer>
);
}
