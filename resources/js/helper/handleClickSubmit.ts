import { FormikProps } from 'formik';

export const handleClickSubmitFormik = async <T = any>(formik: FormikProps<T>, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Validasi form terlebih dahulu
    const error = await formik.validateForm(formik.values);

    // Jika ada error, set errors dan tampilkan pesan error di UI
    if (Object.keys(error).length > 0) {
        console.log(error);
        formik.handleSubmit();
    } else {
        // Jika tidak ada error, buka modal konfirmasi
        setState(true);
    }
};
