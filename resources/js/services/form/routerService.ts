import { TypeFormFieldBuatKK } from "@/interface/interface";
import { router } from "@inertiajs/react";
import { FormikHelpers } from "formik";

export const handleSubmitFormBuatKK = (
        values: TypeFormFieldBuatKK,
        { setSubmitting, resetForm }: FormikHelpers<TypeFormFieldBuatKK>,
    ) => {
        router.post(
            route('kk.store.form'),
            {
                noKK: '',
                kepala_keluarga_nik: values.kepala_keluarga_nik,
                alamat: values.alamat,
                kelurahan_id: values.kelurahan.id,
                kecamatan_id: values.kecamatan.id.toString().slice(-2),
                kabupaten_id: values.kabupaten.id.toString().slice(-2),
            },
            {
                onStart: () => setSubmitting(true),
                onSuccess: () => {
                    alert('Data berhasil disimpan!');
                    resetForm();
                },
                onError: (errors) => {
                    console.error('Terjadi kesalahan:', errors);
                },
                onFinish: () => setSubmitting(false),
            },
        );
    };