import {
    DataKKPageProps,
    DataKKProps,
} from '@/interface/pageprops/tabel-kk-props/interface';

export default function Debug({ data }: DataKKPageProps) {
    return (
        <div>
            <h1 className="text-center text-3xl font-semibold text-gray-700">
                Data KK
            </h1>
            {data.map((item: DataKKProps) => {
                return (
                    <ul key={item.no_kk}>
                        <li>no. KK: {item.no_kk}</li>
                        <li>
                            alamat: {item.alamat}, {item.village.name},{' '}
                            {item.village.district.name}
                        </li>
                        <li>da sis</li>
                        {item.data_penduduk.map((item, index) => {
                            return (
                                <div key={item.nik}>
                                    <ul>
                                        <li>
                                            no.{index + 1} {item.nik},{' '}
                                            {item.nama}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </ul>
                );
            })}
        </div>
    );
}
