// import React from 'react';

// export default function Form() {
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             {formik.values.forms.map((item, index) => (
//                 <Box className="mb-3" key={index}>
//                     <div className="flex items-center justify-between p-5">
//                         <h2 className="font-inter text-xl font-bold text-blue-600 dark:text-gray-400">
//                             Form {index + 1}
//                         </h2>
//                         <button
//                             type="button"
//                             onClick={() => toggleAccordion(index)}
//                             className="w-20 rounded-md border border-blue-300/50 bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:border-gray-500/50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
//                         >
//                             {openByIdx[index] ? 'Tutup' : 'Buka'}
//                         </button>
//                     </div>
//                     {openByIdx[index] && (
//                         <hr className="border-t-1 border-blue-400/50 dark:border-gray-500" />
//                     )}

//                     <div
//                         className={`grid transition-all ${
//                             openByIdx[index]
//                                 ? 'grid-rows-[1fr] opacity-100'
//                                 : 'grid-rows-[0fr] opacity-0'
//                         }`}
//                     >
//                         <div className="overflow-hidden">
//                             <div className="p-5">
//                                 <div className="mb-4">
//                                     <Label htmlFor={`name-${index}`}>
//                                         Nama:
//                                     </Label>
//                                     <Input
//                                         type="text"
//                                         id={`name-${index}`}
//                                         name={`forms.${index}.name`} // Update name untuk formik
//                                         value={
//                                             formik.values.forms[index]?.name ||
//                                             ''
//                                         } // Menggunakan value dari formik
//                                         onChange={(
//                                             e: React.ChangeEvent<HTMLInputElement>,
//                                         ) => {
//                                             formik.handleChange(e);
//                                             formik.setFieldTouched(
//                                                 `forms.${index}.name`,
//                                                 true,
//                                             ); // Menandai sebagai sudah disentuh
//                                         }}
//                                     />
//                                     {/* Error message for name */}
//                                 </div>
//                                 <div className="mb-4">
//                                     <Label htmlFor={`nik-${index}`}>NIK:</Label>
//                                     <Input
//                                         type="text"
//                                         id={`nik-${index}`}
//                                         name={`forms.${index}.nik`} // Update name untuk formik
//                                         value={
//                                             formik.values.forms[index]?.nik ||
//                                             ''
//                                         } // Menggunakan value dari formik
//                                         onChange={(
//                                             e: React.ChangeEvent<HTMLInputElement>,
//                                         ) => {
//                                             formik.handleChange(e);
//                                             formik.setFieldTouched(
//                                                 `forms.${index}.nik`,
//                                                 true,
//                                             ); // Menandai sebagai sudah disentuh
//                                         }}
//                                     />
//                                     {/* Error message for nik */}
//                                 </div>
//                                 <button
//                                     type="button"
//                                 //     onClick={() => handleConfirmModal(index)}
//                                     className="mt-2 rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 active:bg-red-50 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-600"
//                                 >
//                                     Hapus
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </Box>
//             ))}

//             <div className="flex justify-between">
//                 <button
//                     type="button"
//                     onClick={handleAddItem}
//                     className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
//                 >
//                     Tambah Data
//                 </button>
//                 <button
//                     type="submit"
//                     className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
//                 >
//                     Simpan Data
//                 </button>
//             </div>
//         </form>
//     );
// }
