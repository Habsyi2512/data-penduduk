import {
    agamaType,
    golDarahType,
    jenisKelaminType,
    kewarganegaraanType,
    pekerjaanType,
    statusKawinType,
} from '../interface';
// export type statusKawinType = { id: string; status: string };
// export type pekerjaanType = { id: string; pekerjaan: string };
// export type kewarganegaraanType = { id: string; kewarganegaraan: string };

export interface AddPendudukProps {
    agama: agamaType[];
    dataKelamin: jenisKelaminType[];
    dataGolDarah: golDarahType[];
    dataStatusKawin: statusKawinType[];
    dataPekerjaan: pekerjaanType[];
    dataKewarganegaraan: kewarganegaraanType[];
}

// gol_darahs: Yup.object({
//     gol_darah: Yup.string().required('Golongan darah wajib diisi'),
// }).required('Golongan darah wajib diisi'),
// agama: Yup.object({
//     agama: Yup.string().required('Agama wajib diisi'),
// }).required('Agama wajib diisi'),
// status_kawin: Yup.object({
//     status: Yup.string().required('Status kawin wajib diisi'),
// }).required('Status kawin wajib diisi'),
// pekerjaan: Yup.object({
//     pekerjaan: Yup.string().required('Pekerjaan wajib diisi'),
// }).required('Pekerjaan wajib diisi'),
// kewarganegaraan: Yup.object({
//     kewarganegaraan: Yup.string().required(
//         'Kewarganegaraan wajib diisi',
//     ),
// }).required('Kewarganegaraan wajib diisi'),
// alamat: Yup.object({
//     alamat: Yup.string().required('Alamat wajib diisi'),
//     kelurahan_id: Yup.string().required('Kelurahan wajib diisi'),
// }).required('Alamat wajib diisi'),
