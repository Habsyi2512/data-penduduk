import PindahKKForm from '@/Components/form/PindahKKForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function PindahKK() {
    return (
        <Authenticated>
            <PindahKKForm />
        </Authenticated>
    );
}
