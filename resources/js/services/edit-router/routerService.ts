import { router } from '@inertiajs/react';

export const handleSubmit = (values: any) => {
    router.put(route('penduduk.update'), values);
};
