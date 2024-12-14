import { InputPendudukProps } from '@/interface/interface';
import React from 'react';

interface IdProps {
    id: string; // properti id yang Anda ingin masukkan
}

export type DebugPendudukProps = InputPendudukProps & IdProps; // Menggabungkan IdProps ke dalam InputPendudukProps

interface DebugProps {
    data_penduduk: DebugPendudukProps[]; // Gunakan DebugPendudukProps di sini
}

const Debug: React.FC<DebugProps> = ({ data_penduduk }) => {
    return (
        <div>
            <h1>Debug Data</h1>
            {data_penduduk.map((penduduk) => (
                <ul key={penduduk.id}>
                    <li>ID: {penduduk.id}</li>
                    <li>Nama: {penduduk.nama}</li>
                    <li>kelamin: {penduduk.jenis_kelamin.jenis_kelamin}</li>
                    <li>id golongan darah: {penduduk.gol_darahs.id}</li>
                    <li>golongan darah: {penduduk.gol_darahs.gol_darah}</li>
                </ul>
            ))}
        </div>
    );
};

export default Debug;
