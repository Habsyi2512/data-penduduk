import { DataKKProps } from '@/interface/pageprops/tabel-kk-props/interface';
import { XMarkIcon } from '../icons/XMarkIcon';

export default function DetailKKModal({
    data,
    onClose,
}: {
    data: DataKKProps;
    onClose: () => void;
}) {
    const sortedData = data.data_penduduk.sort((a, b) => Number(a.status_hubungan_keluarga.id) - Number(b.status_hubungan_keluarga.id));
    return (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-white/20 px-5 font-inter shadow backdrop-blur-sm">
            <div className="w-full max-w-5xl rounded-lg border bg-white text-gray-700">
                <div className="flex items-center justify-between p-5">
                    <h1 className="text-xl font-bold text-blue-500">
                        DETAIL KARTU KELUARGA
                    </h1>
                    <button
                        onClick={onClose}
                        className="rounded p-2 transition-colors duration-150 hover:bg-gray-100 hover:text-red-500"
                    >
                        <XMarkIcon className="w-5" />
                    </button>
                </div>
                <hr />
                <div className="p-5">
                    <div className="mb-3 text-gray-500">
                        <p>
                            <span className="inline-block w-[190px] font-semibold text-blue-500">
                                No. Kartu Keluarga
                            </span>
                            <span className="pr-2">:</span>
                            <span className="font-medium">{data.no_kk}</span>
                        </p>
                        <p>
                            <span className="inline-block w-[190px] font-semibold text-blue-500">
                                Alamat
                            </span>
                            <span className="pr-2">:</span>
                            <span className="font-medium">
                                {data.alamat.alamat}
                            </span>
                        </p>
                        <p>
                            <span className="inline-block w-[190px] font-semibold text-blue-500">
                                Desa/kelurahan
                            </span>
                            <span className="pr-2">:</span>
                            <span className="font-medium">
                                {data.alamat.village.name}
                            </span>
                        </p>
                        <p>
                            <span className="inline-block w-[190px] font-semibold text-blue-500">
                                Kecamatan
                            </span>
                            <span className="pr-2">:</span>
                            <span className="font-medium">
                                {data.alamat.village.district.name}
                            </span>
                        </p>
                        <p>
                            <span className="inline-block w-[190px] font-semibold text-blue-500">
                                Kabupaten
                            </span>
                            <span className="pr-2">:</span>
                            <span className="font-medium">
                                {data.alamat.village.district.regency.name}
                            </span>
                        </p>
                    </div>
                </div>
                <hr />
                <div className="p-5">
                    <h1 className="mb-5 text-xl font-bold text-blue-500">
                        Anggota Keluarga
                    </h1>
                    <ul className="grid max-h-[300px] grid-cols-2 gap-3 overflow-y-auto">
                        {
                        sortedData.map((item) => {
                            let backgroundColor = 'bg-gray-100';
                            if (item.status_hubungan_keluarga.id == '1') {
                                backgroundColor = 'bg-gray-300';
                            }
                            return (
                                <li
                                    key={item.nik}
                                    className="font-inter font-medium"
                                >
                                    <div
                                        className={`rounded border ${backgroundColor} px-3 py-2 text-sm`}
                                    >
                                        <p>
                                            <span className="inline-block w-[100px] font-medium text-blue-500">
                                                Nik
                                            </span>
                                            <span className="pr-2">:</span>
                                            <span className="">{item.nik}</span>
                                        </p>
                                        <p>
                                            <span className="inline-block w-[100px] font-medium text-blue-500">
                                                Nama
                                            </span>
                                            <span className="pr-2">:</span>
                                            <span className="">
                                                {item.nama}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="inline-block w-[100px] font-medium text-blue-500">
                                                Status Hubungan
                                            </span>
                                            <span className="pr-2">:</span>
                                            <span className="">
                                                {
                                                    item
                                                        .status_hubungan_keluarga
                                                        .nama_status
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
