<?php

namespace App\Helpers;

use Carbon\Carbon;

class PendudukHelper
{
    public static function formatPendudukData($item)
    {
        return [
            'id' => $item->id,
            'nik' => $item->nik,
            'nama' => $item->nama,
            'tempat_lahir' => $item->tempat_lahir,
            'tanggal_lahir' => Carbon::parse($item->tanggal_lahir)->format('Y-m-d'),
            'jenis_kelamin' => [
                'id' => $item->jenis_kelamin->id,
                'jenis_kelamin' => $item->jenis_kelamin->jenis_kelamin,
            ],
            'gol_darahs' => [
                'id' => $item->gol_darah->id,
                'gol_darah' => $item->gol_darah->gol_darah,
            ],
            'agama' => [
                'id' => $item->agama->id,
                'agama' => $item->agama->agama,
            ],
            'status_kawin' => [
                'id' => $item->status_kawin->id,
                'status' => $item->status_kawin->status,
            ],
            'pekerjaan' => [
                'id' => $item->pekerjaan->id,
                'pekerjaan' => $item->pekerjaan->pekerjaan,
            ],
            'kewarganegaraan' => [
                'id' => $item->kewarganegaraan->id,
                'kewarganegaraan' => $item->kewarganegaraan->kewarganegaraan,
            ],
            'alamat' => [
                'id' => $item->alamat->id,
                'alamat' => $item->alamat->alamat,
                'kelurahan_id' => $item->alamat->kelurahan_id,
                'kelurahan_nama' => $item->alamat->village->name,
                'kecamatan_nama' => $item->alamat->village->district->name,
                'kabupaten_nama' => $item->alamat->village->district->regency->name,
            ],
        ];
    }
}
