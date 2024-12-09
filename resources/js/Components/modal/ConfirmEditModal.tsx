import { InputPendudukProps } from '@/interface/interface';
import { FormikProps } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { SetStateAction } from 'react';

export default function ConfirmEditModal({
    index,
    isOpenSubmitModal,
    setIsOpenSubmitModal,
    formik,
}: {
    setIsOpenSubmitModal: React.Dispatch<SetStateAction<boolean>>;
    isOpenSubmitModal: boolean;
    index: number;
    formik: FormikProps<{
        forms: InputPendudukProps[];
    }>;
}) {
    return (
        <AnimatePresence>
            {isOpenSubmitModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: {
                            duration: 0.2,
                        },
                    }}
                    className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/30 backdrop-blur"
                >
                    <motion.div className="w-full max-w-xl rounded-xl bg-gray-200 shadow">
                        <h2 className="p-5 font-inter text-2xl font-bold text-gray-600">
                            Simpan Perubahan Form Edit {index + 1} ?
                        </h2>
                        {/* Mengatur warna hr */}
                        <hr className="border-t-1 border-gray-600/50" />
                        <p className="px-5 pb-2 pt-5 font-inter font-medium text-gray-600">
                            Silahkan periksa kembali data inputan jika anda ragu{' '}
                            <span className="text-lg font-bold text-gray-700">
                                Form Edit {index + 1}
                            </span>
                        </p>
                        <div className="flex justify-end space-x-3 p-5 font-inter font-medium">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpenSubmitModal(false)
                                    formik.handleSubmit();
                                }}
                                className="rounded-md bg-green-500 px-3 py-2 text-white hover:bg-green-600 active:bg-green-500"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={() => setIsOpenSubmitModal(false)}
                                className="border-1 rounded-md border-gray-300 bg-gray-300 px-3 py-2 hover:bg-gray-400"
                            >
                                Batal
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
