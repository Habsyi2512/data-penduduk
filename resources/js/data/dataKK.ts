import { DataKKProps } from "@/interface/pageprops/tabel-kk-props/interface";

export const dataKK: DataKKProps = {
    no_kk: '',
    rt: '',
    rw: '',
    alamat: '',
    kelurahan_id: '',
    created_at: '',
    village: {
        id: '',
        name: '',
        district: {
            id: '',
            name: '',
            regency: {
                id: '',
                name: '',
            },
        },
    },

    data_penduduk: [], // Nilai awal array
};
