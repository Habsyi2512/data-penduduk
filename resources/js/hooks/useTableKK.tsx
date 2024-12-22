import { dataKK } from "@/data/dataKK";
import { DataKKProps } from "@/interface/pageprops/tabel-kk-props/interface";
import { useState } from "react";

export default function useTableKK() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dataSelectedModal, setDataSelectedModal] = useState<DataKKProps>(dataKK);
    const [openModalDetailKK, setOpenModalDetailKK] = useState(false);

    const openModal = (data: DataKKProps) => {
        setOpenModalDetailKK(true);
        setDataSelectedModal(data);
    };

    const closeModal = () => {
        setOpenModalDetailKK(false);
        setDataSelectedModal(dataKK);
    };

    // Fungsi untuk menangani perubahan seleksi
    const handleSelect = (id: string) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id); // Menghapus ID jika sudah terpilih
            } else {
                return [...prevSelectedIds, id]; // Menambahkan ID jika belum terpilih
            }
        });
    };
    return {
        selectedIds,
        setSelectedIds,
        dataSelectedModal,
        setDataSelectedModal,
        openModalDetailKK,
        setOpenModalDetailKK,
        openModal,
        closeModal,
        handleSelect
    };
}
