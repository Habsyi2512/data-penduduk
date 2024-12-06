import Box from '@/Components/box/Box';
import AddPendudukForm from '@/Components/form/AddPendudukForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function AddPenduduk() {
    return (
        <Authenticated>
            <Box>
                <AddPendudukForm  />
            </Box>
        </Authenticated>
    );
}
