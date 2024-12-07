import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Agama {
id: number;
agama: string;
}

export default function Agama({ agamas }: { agamas: Agama[] }) {
return (
<AuthenticatedLayout>
    <h1>Agama</h1>
    <ul>
        {agamas.map((agama) => (
        <li key={agama.id}>{agama.agama}</li>
        ))}
    </ul>
</AuthenticatedLayout>
);
}
