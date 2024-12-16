import AddKartuKeluargaForm from '@/Components/form/AddKartuKeluargaForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function AddKartuKeluarga() {


    return (
        <Authenticated>
            <AddKartuKeluargaForm />
        </Authenticated>
    );
}
