import { AnimatePresence, motion } from 'framer-motion';
import React, { SetStateAction } from 'react';

export default function ConfirmDiscardModal({
    index,
    isOpenConfirmModal,
    setIsOpenConfirmModal,
    remove,
}: {
    setIsOpenConfirmModal?: React.Dispatch<SetStateAction<boolean>>;
    isOpenConfirmModal?: boolean;
    index: number;
    remove: <X = any>(index: number) => X | undefined;
}) {
    return (
        <AnimatePresence>
            {isOpenConfirmModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: {
                            duration: 0.2,
                        },
                    }}
                    className="fixed left-0 top-0 z-[999999] flex h-screen w-full items-center justify-center bg-black/30 backdrop-blur"
                >
                    <motion.div className="w-full max-w-xl rounded-xl bg-gray-200 shadow">
                        <h2 className="p-5 font-inter text-2xl font-bold text-gray-600">Hapus Form {index + 1} ?</h2>
                        {/* Mengatur warna hr */}
                        <hr className="border-t-1 border-gray-600/50" />
                        <p className="px-5 pb-2 pt-5 font-inter font-medium text-gray-600">
                            Ini akan menghapus semua perubahan yang ada didalam <span className="text-lg font-bold text-gray-700">form {index + 1}</span>
                        </p>
                        <p className="p-2 px-5 font-inter font-medium text-gray-600">Periksa Kembali inputan anda sebelum menghapus</p>
                        <div className="flex justify-end space-x-3 p-5 font-inter font-medium">
                            <button
                                onClick={() => {
                                    remove(index); // Remove form at the current index
                                    setIsOpenConfirmModal && setIsOpenConfirmModal(false);
                                }}
                                className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 active:bg-red-50"
                            >
                                Hapus
                            </button>
                            <button onClick={() => setIsOpenConfirmModal && setIsOpenConfirmModal(false)} className="border-1 rounded-md border-gray-300 bg-gray-300 px-3 py-2 hover:bg-gray-400">
                                Batal
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
