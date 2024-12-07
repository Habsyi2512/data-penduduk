// const [openByIdx, setOpenByIdx] = useState<boolean[]>([true]);
//     const [idx, setIdx] = useState<number>(0);
//     const [openConfirmDiscardModal, setOpenConfirmDiscardModal] =
//         useState<boolean>(false);

//     // Skema validasi dengan Yup
//     const validationSchema = Yup.object({
//         forms: Yup.array().of(
//             Yup.object({
//                 nik: Yup.string()
//                     .required('NIK wajib diisi')
//                     .length(16, 'NIK harus terdiri dari 16 karakter'),
//                 name: Yup.string().required('Nama wajib diisi'),
//             }),
//         ),
//     });

//     // Inisialisasi formik untuk menangani banyak form
//     const formik = useFormik({
//         initialValues: {
//             forms: [{ nik: '', name: '' }], // Inisialisasi form pertama
//         },
//         validationSchema, // Menambahkan validasi schema
//         onSubmit: (values) => {
//             console.log('Form values:', values);
//             // Tambahkan logika pengiriman data di sini, misalnya menggunakan Inertia atau API lainnya
//         },
//     });

//     React.useEffect(() => {
//         console.log('formik.values.forms = ', formik.values.forms);
//     }, [formik.values.forms]);

//     // Fungsi untuk menambah item
//     const handleAddItem = () => {
//         formik.setFieldValue('forms', [
//             ...formik.values.forms,
//             { nik: '', name: '' },
//         ]);
//         setOpenByIdx((prevState) => [...prevState, true]);
//         formik.setFieldTouched('forms', true, false);
//     };

//     // Fungsi untuk menghapus item
//     const handleRemoveItem = (index: number) => {
//         const newForms = formik.values.forms.filter((_, i) => i !== index);
//         formik.setFieldValue('forms', newForms);
//         setOpenByIdx((prevState) => prevState.filter((_, i) => i !== index)); // Menyesuaikan state `openByIdx` saat item dihapus
//     };



//     // Fungsi untuk konfirmasi penghapusan
//     const handleConfirmModal = (index: number) => {
//         setIdx(index);
//         const formValues = formik.values.forms[index];
//         const isValid = Object.values(formValues).some((value) => value !== '');
//         if (isValid) {
//             setOpenConfirmDiscardModal(true);
//         } else {
//             handleRemoveItem(index);
//         }
//     };