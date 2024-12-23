import { AnimatePresence, motion } from 'framer-motion';
import React, { SetStateAction } from 'react';

interface ConfirmDiscardModalProps {
    setState: React.Dispatch<SetStateAction<boolean>>;
    state: boolean;
    onClick: () => void;
    title?: string;
}

export default function ConfirmRestoreModal({ state, setState, title = 'Pulihkan Data?', onClick }: ConfirmDiscardModalProps) {
    return (
        <AnimatePresence>
            {state && (
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
                        <h2 className="p-5 font-inter text-2xl font-bold text-gray-600">{title}</h2>
                        {/* Mengatur warna hr */}
                        <hr className="border-t-1 border-gray-600/50" />
                        <p className="px-5 pb-2 pt-5 font-inter font-medium text-gray-600">Yakin Ingin Memulihkan?</p>
                        {/* <p className="p-2 px-5 font-inter font-medium text-gray-600">Periksa Kembali data anda sebelum menghapus</p> */}
                        <div className="flex justify-end space-x-3 p-5 font-inter font-medium">
                            <button
                                onClick={() => {
                                    onClick();
                                    setState && setState(false);
                                }}
                                className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 active:bg-blue-500"
                            >
                                Pulihkan
                            </button>
                            <button onClick={() => setState(false)} className="border-1 rounded-md border-gray-300 bg-gray-300 px-3 py-2 hover:bg-gray-400">
                                Batal
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
