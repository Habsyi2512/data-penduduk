import { TypeFormFieldBuatKK } from '@/interface/interface';
import { router } from '@inertiajs/react';
import { FormikHelpers } from 'formik';

export const handleSubmitFormBuatKK = (values: TypeFormFieldBuatKK, { setSubmitting, resetForm }: FormikHelpers<TypeFormFieldBuatKK>) => {
    console.log('values', values);
    router.post(
        route('kk.store.form'),
        {
            no_kk_semula: values.no_kk_semula,
            kepala_keluarga_nik: values.kepala_keluarga_nik,
            alamat: values.alamat,
            rt: values.rt || '-',
            rw: values.rw || '-',
            kelurahan_id: values.kelurahan.id,
            kecamatan_id: values.kecamatan.id.toString().slice(-2),
            kabupaten_id: values.kabupaten.id.toString().slice(-2),
        },
        {
            onStart: () => setSubmitting(true),
            onSuccess: () => {
                resetForm();
            },
            onError: (errors) => {
                console.error('Terjadi kesalahan:', errors);
            },
            onFinish: () => setSubmitting(false),
        }
    );
};
