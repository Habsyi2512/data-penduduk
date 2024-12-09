import { AddPendudukProps } from '@/interface/pageprops/interface';
import { DataPendudukProps } from '@/interface/pagination/interface';
import React from 'react';

interface EditPendudukProps extends AddPendudukProps {
    data_penduduk: DataPendudukProps;
}

export default function EditPenduduk({
    agama,
    dataKelamin,
    dataGolDarah,
    dataKewarganegaraan,
    dataPekerjaan,
    dataStatusKawin,
    data_penduduk,
}: EditPendudukProps) {
    React.useEffect(() => {
        console.log('halaman edit', data_penduduk);
    }, []);
    return <div>EditPenduduk</div>;
}
