import { TypeFormFieldBuatKK, TypeFormFieldPindahKK } from '@/interface/interface';
import { router } from '@inertiajs/react';
import { FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
interface HandleSubmitOptions {
    onLoading?: () => void;
    onSuccess?: () => void;
}

export const handleSubmitFormBuatKK = (values: TypeFormFieldBuatKK, { setSubmitting, resetForm }: FormikHelpers<TypeFormFieldBuatKK>) => {
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

export const handleSubmitTambahPenduduk = async (values: any, { onLoading, onSuccess }: HandleSubmitOptions) => {
    onLoading && onLoading();
    setTimeout(() => {
        try {
            router.post(
                route('penduduk.store'),
                { forms: values.forms },
                {
                    onSuccess: (message) => {
                        const successMessage = message.props.flash.success;
                        toast.success(successMessage);
                        onSuccess && onSuccess();
                        router.get(route('population_data'));
                        // resetForm();
                    },
                    onError: (errors) => {
                        console.error('Error submitting form:', errors);
                    },
                }
            );
        } catch (error) {
            console.error('Form submit error:', error);
        }
    }, 400);
};

export const handleSubmitPindahKK = async (values: TypeFormFieldPindahKK, { onLoading, onSuccess }: HandleSubmitOptions) => {
    console.log('values oi', values);
    // onLoading && onLoading();
    // setTimeout(() => {
    //     try {
    //         router.post(
    //             route('kk.pindah.form'),
    //             {
    //                 nikPemohon: values.nikPemohon,
    //                 noKKLama: values.noKKLama,
    //                 noKKBaru: values.noKKBaru,
    //             },
    //             {
    //                 onSuccess: (message) => {
    //                     console.log('Success submitting form:', message);
    //                     const successMessage = message.props.flash.success;
    //                     toast.success(successMessage);
    //                     onSuccess && onSuccess();
    //                     router.get(route('population_data'));
    //                     // resetForm();
    //                 },
    //                 onError: (errors) => {
    //                     console.error('Error submitting form:', errors);
    //                 },
    //             }
    //         );
    //     } catch (error) {
    //         console.error('Form submit error:', error);
    //     }
    // }, 400);
};
